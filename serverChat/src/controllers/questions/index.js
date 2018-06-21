const {
    Router: router
} = require('express');
const {list}= require('./list');

module.exports = (model, {config} ) => {
    const api = router;
    api.get('/', (req, res, next) => {
console.log('get rout')
    });
    return api;
}