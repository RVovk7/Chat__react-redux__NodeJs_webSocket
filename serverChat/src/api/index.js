const express = require('express');
const {errorHandler} = require('../middleware');
//init model
const {Question} = require('../models/question')
//init controllers
const questions = require('../controllers/questions');

const models = {Question};
const initRouters = config => () => {
const app = express();
console.log('initRouters=>')
app.use('/questions/', questions(models,{config})) 



app.use(errorHandler);
return app
}
module.exports = initRouters;