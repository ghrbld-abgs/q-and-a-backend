const routes = require('express').Router();
const models = require('../models/index');
const db = require('../database');


routes.get('/:product_id', async (req, res) => {

  let questions = await models.getProdQuestions(req.params.product_id)
  console.log('QUESTIONS: ', questions);
  res.send(questions)
})

routes.get('/:question_id/answers', async (req, res) => {
  console.log('question_id: ', req.params.question_id, 'page: ', req.params.page, 'count: ', req.params.count);

  let answers = await models.getProdAnswers(req.params.question_id)
  console.log('ANSWERS: ', answers);
  res.send(answers);
});

routes.post('/:product_id', () => {});

routes.post('/:product_id/answers', () => {});

routes.put('/question/:question_id/helpful', () => {});

routes.put('/question/:question_id/report', () => {});

routes.put('/answer/:answer_id/helpful', () => {});

routes.put('/question/:answer_id/report', () => {});

module.exports = routes;