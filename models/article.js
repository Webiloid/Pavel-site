const mongoose = require("../db/mongoose"),
      Schema = mongoose.Schema;

let schema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  title_img: {
    type: String,
    required: true
  }
}, {collection: "articles"});

schema.methods.getFormattedDate = function() {

  let day = this.date.getDate();
  let month = this.date.getMonth() + 1;
  let year = this.date.getFullYear();

  if(day < 10){
      day = "0" + day;
  }

  if(month < 10){
      month = "0" + month;
  }

  return day + "-" + month + "-" + year;
};

schema.methods.getFormattedType = function() {
  if(this.type === "travel") {
    return "Путешествия";
  } else if(this.type === "photoset") {
    return "Фотосессия"
  } else if(this.type === "lifestyle") {
    return "Лайфблог";
  }
};

schema.methods.getIconClass = function() {
  if(this.type === "travel") {
    return "type__icon--travel";
  } else if(this.type === "photoset") {
    return "type__icon--photoset"
  } else if(this.type === "lifestyle") {
    return "type__icon--heart";
  }
};
exports.Article = mongoose.model("Article", schema);
