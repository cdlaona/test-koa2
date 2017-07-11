// 第一种
const fs = require('fs');
function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            let path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            let path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

module.exports = function (dir) {
    let
        controllers_dir = '',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};

/*
// 第二种
const Router = require('koa-router');
let router = new Router();

// 首页
let home = require('./home');
router.use('/', home.routes(), home.allowedMethods());

module.exports = router;
*/



/*
// 第三种
 const List = [
 // 首页
 {
 'router' : require('./home'),
 'prefix' : 'home'
 }
 ];
 function Controller(app) {
 // let middleware = Array.prototype.slice.call(List);
 for( let val of List ){
 app.use( val.router.routes(), val.router.allowedMethods() );
 }
 return List;
 }
 module.exports = Controller;
 */