import Calendar from "../../models/calendar";
import mongoose from "mongoose";
import Joi from "joi";
import sanitizeHtml from "sanitize-html";

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
    allowedTags: [
        'h1',
        'h2',
        'b',
        'i',
        'u',
        's',
        'p',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a',
        'img',
    ],
    allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src'],
        li: ['class'],
    },
    allowedSchemes: ['data', 'http'],
};

export const getCalendarById = async(ctx, next) => {
    const { id } = ctx.params;
    if(!ObjectId.isValid(id)){
        ctx.status = 400; //Bad Request
        return;
    }

    try{
        const calendar = await Calendar.findById(id);
        if(!calendar){
            ctx.status = 404; // Not Found
            return;
        }
        ctx.state.calendar = calendar;
        return next();                    
    }catch (e){
        ctx.throw(500, e);
    }
}

export const getCalendarDay = async(ctx, next) => {
    const { checkDate } = ctx.params;
    if(typeof checkDate !== 'string'){
        ctx.status = 400; //Bad Request
        return;
    }

    //$or, $and는 다들 아는 것
    //$gte:해당 값보다 크거나 같은 컬럼 값, 이상, $gt:해당 값보다 큰 컬럼 값, 초과 
    //$lte:해당 값보다 작거나 같은 컬럼 값, 이하, $lt:해당 값보다 작은 컬럼 값, 미만
    const query = {
        ...(checkDate ? {$or:[
            {$and :[
                {'startDay' : {'$lte': checkDate}},
                {'endDay' : {'$gte' : checkDate}},
                ]
            },
            {$or : [{'startDay' : checkDate},
                    {'endDay' : checkDate},
                ]
            }
        ]
    } : {}),
    };

    try{
        const calendar = await Calendar.find(query)
                                        .sort({ _id: -1})
                                        .lean()  // 해당 데이터를 JSON형태로 조회
                                        .exec();
        if(!calendar){
            ctx.status = 404; // Not Found
            return;
        }
        ctx.state.calendar = calendar;
        return next();                    
    }catch (e){
        ctx.throw(500, e);
    }
}

export const write = async ctx => {
    const schema = Joi.object().keys({
        // 객체가 다음 필드를 가지고 있음을 검증
        title: Joi.string().required(), // required()가 있으면 필수 항목
        startDay: Joi.string().required(),
        startDate: {
            year: Joi.string().required(),
            month: Joi.string().required(),
            date: Joi.string().required(),
            hour: Joi.string().required(),
            min: Joi.string().required(),
        },
        endDay: Joi.string().required(),
        endDate: {
            year: Joi.string().required(),
            month: Joi.string().required(),
            date: Joi.string().required(),
            hour: Joi.string().required(),
            min: Joi.string().required(),
        },
        label: {
            style: Joi.string().required(),
            text: Joi.string().required(),
        }
    });
    // 검증하고 나서 검증 실패인 경우 에러 처리 (body를 뺌, 필수 아님)
    const check = {
        title: ctx.request.body.title,
        startDay: ctx.request.body.startDay,
        startDate: {
            year: ctx.request.body.startDate.year,
            month: ctx.request.body.startDate.month,
            date: ctx.request.body.startDate.date,
            hour: ctx.request.body.startDate.hour,
            min: ctx.request.body.startDate.min,
        },
        endDay: ctx.request.body.endDay,
        endDate: {
            year: ctx.request.body.endDate.year,
            month: ctx.request.body.endDate.month,
            date: ctx.request.body.endDate.date,
            hour: ctx.request.body.endDate.hour,
            min: ctx.request.body.endDate.min,
        },
        label: {
            style: ctx.request.body.label.style,
            text: ctx.request.body.label.text,
        }
    }
    const result = schema.validate(check);
    if(result.error){
        ctx.status = 400; // Bad Request
        ctx.body = result.error;
        return;
    }
    const { _id, title:tableTitle, username } = ctx.state.table;
    const { title, body, startDay, startDate, endDay, endDate, label } = ctx.request.body;
    const calendar = new Calendar({
        title,
        body: sanitizeHtml(body, sanitizeOption),
        startDay,
        startDate,
        endDay,
        endDate,
        label,
        user: ctx.state.user,
        table : {
            _id,
            title: tableTitle,
            username,
        },
    });
    
    try{
        await calendar.save();
        ctx.body = calendar;
    }catch(e){
        ctx.throw(500, e);
    }
};

// html을 업애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = body => {
    const filtered = sanitizeHtml(body, {
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/*
    GET /api/calendar?year=&month=
*/
export const list = async ctx => {
    const {_id, title} = ctx.state.table;
    const startDay = ctx.query.start;
    const endDay = ctx.query.end;
    if(startDay.length < 1 || endDay.length < 1){
        ctx.status = 400;
        return;
    }

    const startDate = startDay.split('.');
    const endDate = endDay.split('.');

    //$gte:해당 값보다 크거나 같은 컬럼 값, 이상, $gt:해당 값보다 큰 컬럼 값, 초과 
    //$lte:해당 값보다 작거나 같은 컬럼 값, 이하, $lt:해당 값보다 작은 컬럼 값, 미만
    const query = {
        ...(startDay && endDay ? {$and:[
            {'table._id' : _id},
            {$or:[
                {$and : [
                        {'startDate.year' : startDate[0]},
                        {$and : [
                            {'startDate.month' : {'$gte' : startDate[1]}},
                            {'startDate.month' : {'$lte' : endDate[1]}},
                            ]
                        },
                    ]
                },
                {$and : [
                        {'endDate.year' : startDate[0]},
                        {$and : [
                            {'endDate.month' : {'$gte' : startDate[1]}},
                            {'endDate.month' : {'$lte' : endDate[1]}},
                            ]
                        },
                    ]
                },
            ]
        }]
        } : {}),
    };

    try{
        const calendar = await Calendar.find(query)
                        .sort({ _id: -1})
                        .lean()  // 해당 데이터를 JSON형태로 조회
                        .exec();
        const calendarCount = await Calendar.countDocuments(query).exec();
        //ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = calendar.map(calendar => ({
                        ...calendar,
                        body: removeHtmlAndShorten(calendar.body),
                        daysize: calendar.startDay === calendar.endDay? 0 
                        : (new Date(calendar.endDay) - new Date(calendar.startDay)) / 1000 / 60 / 60 / 24, //같은 날짜면 0, 아니면 일 수 차이 반환
                    })); //길이가 200자 이상이면 자르기
    }catch (e){
        ctx.throw(500, e);
    }
};

export const read = async ctx => {
    ctx.body = ctx.state.calendar;
};

export const remove = async ctx => {
    const { id } = ctx.params;
    try{
        await Calendar.findByIdAndRemove(id).exec();
        ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
    }catch (e){
        ctx.throw(500, e);
    }
};

export const update = async ctx => {
    const { id } = ctx.params;
    const schema = Joi.object().keys({
        // 객체가 다음 필드를 가지고 있음을 검증
        title: Joi.string(), // required()가 있으면 필수 항목
        startDay: Joi.string(),
        startDate: {
            year: Joi.string(),
            month: Joi.string(),
            date: Joi.string(),
            hour: Joi.string(),
            min: Joi.string(),
        },
        endDay: Joi.string(),
        endDate: {
            year: Joi.string(),
            month: Joi.string(),
            date: Joi.string(),
            hour: Joi.string(),
            min: Joi.string(),
        },
        label: {
            style: Joi.string(),
            text: Joi.string(),
        }
    });
    const check = {
        title: ctx.request.body.title,
        startDay: ctx.request.body.startDay,
        startDate: {
            year: ctx.request.body.startDate.year,
            month: ctx.request.body.startDate.month,
            date: ctx.request.body.startDate.date,
            hour: ctx.request.body.startDate.hour,
            min: ctx.request.body.startDate.min,
        },
        endDay: ctx.request.body.endDay,
        endDate: {
            year: ctx.request.body.endDate.year,
            month: ctx.request.body.endDate.month,
            date: ctx.request.body.endDate.date,
            hour: ctx.request.body.endDate.hour,
            min: ctx.request.body.endDate.min,
        },
        label: {
            style: ctx.request.body.label.style,
            text: ctx.request.body.label.text,
        }
    }
    // 검증하고 나서 검증 실패인 경우 에러 차리(body를 뺌, 필수 아님)
    const result = schema.validate(check);
    if(result.error){
        ctx.status = 400; // Bad Request
        ctx.body = result.error;
        return;
    }
    
    const nextData = {...ctx.request.body}; // 객체를 복사하고 body 값이 주어졌으면 HTML 필터링
    if(nextData.body){
        nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
    }

    try{
        const calendar = await Calendar.findByIdAndUpdate(id, nextData, 
            {
                new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다. 
                           // false일 때는 업데이트되기 전의 데이터를 반환합니다.
            }).exec();
            if(!calendar){
                ctx.status = 404;
                return;
            }
        ctx.body = calendar;
    }catch (e){
        ctx.throw(500, e);
    }
};

export const checkOwnCalendar = (ctx, next) => {
    const {user, calendar} = ctx.state;
    if(calendar.user._id.toString() !== user._id) { //포스트 등록자와 현재 사용자 동일 여부 체크
        ctx.status = 403;
        return;
    }
    return next();
}
