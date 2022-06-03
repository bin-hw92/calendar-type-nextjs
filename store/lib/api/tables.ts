import client from "./client";

//글쓰기
export const writeTable = ({title, password, body, users }:tableWirteState) => {
    return client.post('/api/tables', {title, password, body, users});
}

//목록
export const listTable = (page:number) => {
    return client.get('/api/tables', {params: {page}});
}

//비밀번호 체크
export const check = ({id, password}:tableActionState) => {
    return client.post('/api/tables/check', {password, id});
}

//캘린더에서 나가기 시 게시판 정보 삭제
export const tableout = () => client.post('/api/tables/tableout');

//글 삭제
export const deleteTable = (id:string) => {
    return client.delete(`/api/tables/${id}`);
}

export type tableActionState = {
    [key: string] : string,
}

export type tableWirteState = {
    title: string;
    password: string;
    body : string;
    users: string[];
}