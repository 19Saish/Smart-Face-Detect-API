const Clarifai = require('clarifai');
const { response } = require('express');

const app = new Clarifai.App({
  apiKey: "fa7ab1dd8e5d4e2aaf8a7066c7c3067e",
});

const handleApiCall = (req ,res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0].entries);
      })
      .catch((err) => res.status(400).json("unable to get entries"));
  }

module.exports = {
    handleImage,
    handleApiCall
}  