const express = require("express");
const http = require("http");
const config = require("./config");
//const createDb = require("./createDb")();
const articles = require("./models/article").Article;

const app = express();

http.createServer(app).listen(config.get("port"), function() {
  console.log("Сервак запущен на " + config.get("port") + " порту");
});

app.engine("ejs", require("ejs-locals"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/frontend"));

app.get("/", function(req, res, next) {
  res.render("index", {
    title: "Фотограф Павел Хмелёв"
  });
});

app.get("/blog", function(req, res, next) {
  res.redirect("/blog/page/1");
});

app.get("/blog/page/:number", function(req, res, next) {

  let pagesCount = articles.count()
    .then(function(pagesCount) {
      pagesCount = Math.ceil(pagesCount / 5);

      let pageNumber = parseInt(req.params.number),
          paginator = [],
          pageIndex = 1;

      if(pageNumber === 1) {
        while(pageIndex <= pagesCount && pageIndex <= 3) {
          paginator.push(pageIndex++);
        }
      } else if(pageNumber === pagesCount) {
        pageIndex = pagesCount;
        while(pageIndex > 0 && pageIndex >= pagesCount - 3) {
          paginator.unshift(pageIndex--);
        }
      } else {
        pageIndex = pageNumber;
        for (let i = pageNumber - 1; i <= pageNumber + 1; i++) {
          paginator.push(i);
        }
      }

      articles.find().skip((pageNumber - 1) * 5).limit(5)
        .then(function(docs) {
          res.render("blog", {
            articles: docs,
            title: "Блог",
            pageNumber: pageNumber,
            pagesCount: pagesCount,
            paginator: paginator
          });
        });
    });
});
