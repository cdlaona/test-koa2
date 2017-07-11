let template = require('art-template/node/template-native');

function templating(dir, ext = '.html') {
    template.config('base', dir);
    template.config('extname', ext);
    template.config('encoding', 'utf-8');
    return function views(ctx, next) {
        if( ctx.render ){
            return next();
        }
        ctx.render = function (view, model) {
            return template(view, Object.assign({}, ctx.state || {}, model || {}));
        };
        return next();
    }
}

module.exports = templating;