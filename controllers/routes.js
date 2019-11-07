const routes = require('express').Router();
const models = require('../models/index');
const db = require('../database');


routes.get('/:product_id', async (req, res) => {

  let questions = await models.getProdQuestions(req.params.product_id)
  console.log('STATUS: 201 CREATED');
  res.status(201).send(questions);
})

routes.get('/:question_id/answers', async (req, res) => {
  console.log('question_id: ', req.params.question_id, 'page: ', req.params.page, 'count: ', req.params.count);

  let answers = await models.getProdAnswers(req.params.question_id)
  console.log('ANSWERS: ', answers);
  res.status(201).send(answers);
});

routes.post('/:product_id', async (req, res) => {
  console.log('req body: ', req.body, 'params: ', req.params);

  let questionsPost = await models.postProdQuestions(req.params.product_id, req.body)
  res.status(201).send(questionsPost);
});

routes.post('/:product_id/answers', () => {});

routes.put('/question/:question_id/helpful', () => {});

routes.put('/question/:question_id/report', () => {});

routes.put('/answer/:answer_id/helpful', () => {});

routes.put('/question/:answer_id/report', () => {});

module.exports = routes;