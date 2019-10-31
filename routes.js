const routes = require('express').Router();


routes.get('/qa/:product_id', () => {});

routes.get('/qa/:question_id/answers', () => {});

routes.get('/:product_id/related', () => {});

routes.post('/qa/:product_id', () => {});

routes.post('/qa/:product_id/answers', () => {});

routes.put('/qa/question/:question_id/helpful', () => {});

routes.put('/qa/question/:question_id/report', () => {});

routes.put('/qa/answer/:answer_id/helpful', () => {});

routes.put('/qa/question/:answer_id/report', () => {});