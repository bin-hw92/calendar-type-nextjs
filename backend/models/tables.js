import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const TablesSchema = new Schema({
    title: String,
    body: String,
    password: String,
    users: [String], // 문자열로 이루어진 배열
    publishedDate: {
        type: Date,
        default: Date.now, // 현재 날짜를 기본값으로 지정
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

TablesSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10);
    this.password = hash;
};

TablesSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.password);
    return result; // true, false
};

TablesSchema.statics.findByUsername = function(id) {
    return this.findOne({ _id: id });
};

TablesSchema.methods.serialize = function(){
    const data = this.toJSON();
    delete data.password;
    return data;
}

TablesSchema.methods.generateToken = function(){
    const token = jwt.sign(
        //첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣습니다.
        {
            _id: this.id,
            title: this.title,
            username: this.user.username,
        },
        process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣습니다.
        {
            expiresIn: '7d', // 7일 동안 유요함
        },
    );
    return token;
}

const Tables = mongoose.model('Tables', TablesSchema);
export default Tables;