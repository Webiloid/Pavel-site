const mongoose = require("./db/mongoose");
const Article = require("./models/article").Article;

module.exports = function() {
  mongoose.connection.on("open", function() {

    let db = mongoose.connection.db;
    db.dropDatabase(function(err) {
      if(err) {
        throw err;
      }

      let testArticles = [
        new Article({
          title: "Прогулка по ночной Москве",
          type: "lifestyle",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          title_img: "/img/articles/1.jpg"
        }).save(),
        new Article({
          title: "Поездка в Питер. Поход по музеям",
          type: "travel",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/2.jpg"
        }).save(),
        new Article({
          title: "Поездка в Питер. Петергоф",
          type: "travel",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/3.jpg"
        }).save(),
        new Article({
          title: "Мама, я в дубае",
          type: "travel",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/4.jpg"
        }).save(),
        new Article({
          title: "Катаемся на мотоцикле",
          type: "lifestyle",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/5.jpg"
        }).save(),
        new Article({
          title: "Весенняя фотосессия",
          type: "photoset",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/6.jpg"
        }).save(),
        new Article({
          title: "США. Лос-анджелес",
          type: "travel",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/7.jpg"
        }).save(),
        new Article({
          title: "США. Гранд-каньон",
          type: "travel",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/8.jpg"
        }).save(),
        new Article({
          title: "Прогулка по ночной Москве",
          type: "lifestyle",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          title_img: "/img/articles/1.jpg"
        }).save(),
        new Article({
          title: "Поездка в Питер. Поход по музеям",
          type: "travel",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/2.jpg"
        }).save(),
        new Article({
          title: "Поездка в Питер. Петергоф",
          type: "travel",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/3.jpg"
        }).save(),
        new Article({
          title: "Мама, я в дубае",
          type: "travel",
          date: new Date(),
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua.",
          title_img: "/img/articles/4.jpg"
        }).save()
      ];

      Promise.all(testArticles).then(function() {
        mongoose.disconnect();
      });

    });

  });

};
