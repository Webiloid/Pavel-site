
let blogItems = $(".blog__item");

$.each(blogItems, function(index) {
  blogItems.eq(index).delay(index * 200).animate({
    opacity: 1
  }, 700);
});
