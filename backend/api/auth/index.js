import Router from "koa-router";
import * as authCtrl from "./auth.ctrl";

const auth = new Router();

console.log('auth index 입니다....');

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

export default auth;