import Router from "koa-router";
import {checkLoggedIn} from "../../lib/checkLoggedIn";
import * as tablesCtrl from "./tables.ctrl";

const tables = new Router();

tables.post('/check', tablesCtrl.check); //게시판 비밀번호 확인
tables.get('/', tablesCtrl.list);
tables.post('/', checkLoggedIn, tablesCtrl.write); //로그인 여부 확인
tables.post('/tableout', tablesCtrl.tableout); //캘린더에서 나가기 시 게시판 정보 지움

const table = new Router(); // /api/posts/:id
table.get('/', tablesCtrl.read);
table.delete('/', checkLoggedIn, tablesCtrl.checkOwnTables, tablesCtrl.remove); //로그인과 등록자 동일여부 확인
table.patch('/', checkLoggedIn, tablesCtrl.checkOwnTables, tablesCtrl.update); //로그인과 등록자 동일여부 확인

tables.use('/:id', tablesCtrl.getTableById, table.routes());

export default tables;