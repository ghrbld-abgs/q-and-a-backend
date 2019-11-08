const routes = require('express').Router();
const models = require('../models/index');
const db = require('../database');


routes.get('/:product_id', async (req, res) => {

  let questions = await models.getProdQuestions(req.params.product_id)
  console.log('STATUS: 201 CREATED');
  res.status(201).send(questions);
})

routes.get('/:question_id/answers', async (req, res) => {
  // console.log('question_id: ', req.params.question_id, 'page: ', req.params.page, 'count: ', req.params.count);

  let answers = await models.getProdAnswers(req.params.question_id)
  // console.log('ANSWERS: ', answers);
  res.status(201).send(answers);
});

routes.post('/:product_id', async (req, res) => {
  // console.log('req body: ', req.body, 'params: ', req.params);

  let questionsPost = await models.postProdQuestions(req.params.product_id, req.body)
  res.status(201).send(questionsPost);
});

routes.post('/:question_id/answers', async (req, res) => {
  console.log('req body: ', req.body, 'params: ', req.params);
 let answersPost = await models.postProdAnswers(req.params.question_id, req.body)
 res.status(201).send(answersPost);
});

routes.put('/question/:question_id/helpful', async (req, res) => {
  // console.log('req.params put: ', req.params);

  let helpfulPut = await models.putQHelpful(req.params.question_id)
  res.send('204 NO CONTENT');
});

routes.put('/question/:question_id/report', async (req, res) => {

  let reportPut = await models.putQReported(req.params.question_id)

  res.send('204 QUESTION REPORTED')
});

routes.put('/answer/:answer_id/helpful', async (req, res) => {
  console.log('answer id: ', req.params.answer_id);

  let helpfulPut = await models.putAHelpful(req.params.answer_id)

  res.send('204 NO CONTENT');
});

routes.put('/answer/:answer_id/report', async (req, res) => {
  let reportPut = await models.putAReported(req.params.answer_id)

  res.send('204 ANSWER REPORTED ')
});

module.exports = routes;