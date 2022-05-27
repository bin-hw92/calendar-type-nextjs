export const checkLoggedIn = (ctx, next) => {
    if(!ctx.state.user){
        ctx.status = 401; // Unauthorized
        return;
    }
    return next();
};

 export const checkTableIn = (ctx, next) => {
    if(!ctx.state.table){
        ctx.status = 401; // Unauthorized
        return;
    }
    return next();
};
