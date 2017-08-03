let request = require('koa2-request');
let fn_hello = async(ctx, next) => {
    //ctx.response.body = '123';
    let res = {};
    try{
        res['a'] = await request({
            url: `http://localhost/a.php`,
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'charset': 'UTF-8'
            },
            json: true,
            body: {
                username: 123, pwd: 123
            }
        });
    }catch (e){
        console.log(e);
    }

    res['age'] = '123';

    console.log('===============');
    console.log(res.a.body.a);
    console.log('===============');

    res['list'] = [];

    let title = 123;
    ctx.body = ctx.render('show', res);
};

let fn_post_hello = async(ctx, next) => {
    let name = ctx.request.body.name;
    ctx.body = ctx.render('show',{'tit' : name});
};

module.exports = {
    'GET /': fn_hello,
    'GET /a': fn_post_hello
};