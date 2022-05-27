import axios from "axios";

const baseUrl = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';
const key = 'lmnMzwQlnsZP69lA0Csu%2Fk%2FYOFiMsZnm81VFiPDq8BWc8j5LzW0QYlhOEBn8xsVbSzDRZOwYn7lIXXFdJG%2FBlw%3D%3D';

export const list = async ctx => {
    const year = ctx.query.year || ''+new Date().getFullYear;
    if(year.length < 1){
        ctx.status = 400;
        return;
    }

    try{
        const answer = await axios.get(`${baseUrl}?solYear=${year}&numOfRows=100&_type=json&ServiceKey=${key}`).then(result => result.data.response.body.items.item);
        if(answer === undefined) ctx.body = [];
        else ctx.body = answer;
    }catch(e){
        ctx.throw(500, e);
    }
};