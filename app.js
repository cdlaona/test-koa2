const Koa = require('koa');
let app = new Koa();





/**
 *  错误
 * */
const Error = require('koa-onerror');
Error(app);





/**
 *  解析formData
 * */
const Bodyparser = require('koa-bodyparser');
app.use(Bodyparser({
    enableTypes : ['json', 'form', 'text']
}));





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
 *  静态服务
 * */
const Static = require('koa-static');
app.use(Static(__dirname + '/static'));





/**
 *  模板
 * */
const path = require('path');
const ChoFnTemplate = require('./lib/chofnTemplate');
app.use(
    ChoFnTemplate( path.resolve(__dirname, 'views/') )
);





/**
 *  路由
 * */
const Controller = require('./controller/controller');
app.use(Controller());





app.listen('3000');