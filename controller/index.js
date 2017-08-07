let request = require('koa2-request');
let fn_hello = async(ctx, next) => {
    //ctx.response.body = '123';
    let res = {};
    var c = "id=哇哈哈";
    try{
        res['a'] = await request({
            url: `http://localhost/a.php`,
            method: 'post',
            headers: {
                // "Content-Type": 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'charset': 'UTF-8'
            },
            json : true,
            body: "id=哇哈哈"
        });
    }catch (e){
        console.log(e);
    }

    res['age'] = '123';

    console.log('===============');
    console.log(res.a.body);
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