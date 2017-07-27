let _request = require('async-request');
let fn_hello = async(ctx, next) => {
    console.log(1111111111);
    //ctx.response.body = '123';
    let res = {};
    try{
        res['a'] = await _request('http://localhost/a.php',{
            method : 'POST',
            data : {
                'username' : 123,
                'password' : 123,
                'nickname' : 'aa'
            }
        });
        res['a1'] = await _request('http://localhost/aa.php',{
            method : 'POST',
            data : {
                'username' : 123,
                'password' : 123,
                'nickname' : 'aa'
            }
        });
    }catch (e){
        console.log(e);
    }

    res['age'] = '123';

    res['list'] = [];


    ctx.body = ctx.render('user', res);
};

let fn_post_hello = async(ctx, next) => {
    let name = ctx.request.body.name;
    ctx.body = ctx.render('show',{'tit' : name});
};

module.exports = {
    'GET /': fn_hello,
    'GET /a': fn_post_hello
};