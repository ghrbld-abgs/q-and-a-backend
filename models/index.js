const db = require('../database');
const { DateTime } = require("luxon");

const getProdQuestions = async (id) => {

 let response = { product_id: id,
results: []
}

let questions = await db.query(`SELECT * FROM questions WHERE product_id = ${id}`)

for (let i = 0; i < questions.length; i++) {

  let questionInfo =
  {"question_id": questions[i].id,
  "question_body": questions[i].body,
  "question_date": questions[i].date_written,
  "asker_name": questions[i].asker_name,
  "question_helpfulness": questions[i].helpfulness,
  "reported": questions[i].reported,
  "answers": {}
}

let answers = await db.query(`SELECT * FROM answers WHERE id = ${questions[i].id}`)

for (let j = 0; j < answers.length; j++) {

  let answersInfo =
  {"id": answers[j].id,
  "body": answers[j].body,
  "date": answers[j].date_written,
  "answerer_name": answers[j].answerer_name,
  "helpfulness": answers[j].helpfulness,
  "photos": []
}

let photos = await db.query(`SELECT * FROM photos WHERE answer_id = ${answers[j].id}`)

  for (let k = 0; k < photos.length; k++) {
    let photosInfo = {
      "id": photos[k].answer_id,
      "url": photos[k].url
    }
    answersInfo.photos.push(photosInfo);

}
  questionInfo.answers[questions[i].id] = answersInfo

}
response.results.push(questionInfo)

}
return response;

}

const getProdAnswers = async (questionId, page) => {

  let response = {
    "question": questionId,
    "page": page,
    "count": 0,
    "results": []
  }

  let answers = await db.query(`SELECT id, body, date_written, answerer_name, helpfulness FROM answers WHERE question_id = ${questionId}`)
  console.log('answers query: ', answers);


  for (i = 0; i < answers.length; i++) {

    let answersInfo =
    {"answer_id": answers[i].id,
    "body": answers[i].body,
    "date": answers[i].date_written,
    "answerer_name": answers[i].answerer_name,
    "helpfulness": answers[i].helpfulness,
    "photos": []
  }
  response.count += 1;
  // console.log('count: ', response.count);


  let photos = await db.query(`SELECT id, url FROM photos WHERE answer_id = ${answers[i].id}`)
  console.log('photos: ', photos);

  for (j = 0; j < photos.length; j++) {
      // for(let k = 0; k < answers[i].photos.length; k++) {
        let photosInfo = {
            "id": photos[j].id,
            "url": photos[j].url
          }
          answersInfo.photos.push(photosInfo);
          console.log(photosInfo);

      // }
  // }
  }
  response.results.push(answersInfo);
}
return response;
}

const postProdQuestions = async (prodId, qObject) => {

  let date = DateTime.local().toString();

  let postQuestion = {
    "product_id": prodId,
    "body": qObject.body,
    "date_written": date,
    "asker_name": qObject.asker_name,
    "asker_email": qObject.asker_email,
    "reported": 0,
    "helpfulness": 0
  }
  console.log('date: ', postQuestion.date_written);

  let newQuestion = await db.query(`INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpfulness) VALUES (${postQuestion.product_id}, ${postQuestion.body}, ${postQuestion.date_written}, ${postQuestion.asker_name}, ${postQuestion.asker_email}, ${postQuestion.reported}, ${postQuestion.helpfulness})`)

  return newQuestion;
  console.log('log of the new question : ', newQuestion);

}

module.exports = {getProdQuestions, getProdAnswers, postProdQuestions};

