const Koa = require('koa');
let app = new Koa();
let koaViews = require('koa-views');





/**
 *  错误
 * */
const Error = require('koa-onerror');
Error(app);





/**
 *  解析formData
 * */
const Bodyparser = require('koa-bodyparser');
app.use(Bodyparser());





/**
 *  日志记录
 * */
const Logger = require('koa-logger');
app.use(Logger());
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    let ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});






/**
 *  模板
 * */
const path = require('path');
const ChoFnTemplate = require('./lib/chofnTemplate');
app.use(
    ChoFnTemplate( path.resolve(__dirname, 'views/') )
);
// app.use(koaViews(path.join(__dirname, './views/'), {
//     extension: 'ejs'
// }));





/**
 *  路由
 * */
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
const Controller = require('./controller/controller');
app.use(Controller());




/**
 *  静态服务
 * */
const Static = require('koa-static');
app.use(Static(__dirname + '/static'));




app.listen('3000');