var $ = require('jquery');
var _ = require('underscore');
var ItemCollection = require('./itemCollection');
var ItemModel = require('./itemModel');


$(document).ready(function(){
  page.init();

});
var page = {
init:function(){
page.actions();
page.frameworks();
},

frameworks:function(){
  var item = new ItemModel();

    item.fetch().then(function (collectionData) {

      _.each(item.attributes,function(el){
        if(typeof(el) === "object"){
          $('#posts').append("<div id ="+el._id+" class='picture-posts'>"+
              "<img src='"+ el.url+"'/>"+
              "<button type='button' class='btn btn-default btn-lg'>"+
              "<span class='glyphicon glyphicon-star' aria-hidden='true'></span>"+
              "<span id = 'number-likes'>"+ el.numLikes+"</span>"+
              "</button>"+
            "</div>");
        }
      })
  });

  $('#submit-picture').on("click",function(el){
    el.preventDefault();
    var hello = $('input[name="text-input"]').val();
    item.set({url:hello});
    item.save();
    $('input[name="text-input"]').val('');
  });


},
actions:function(){
  $('.full-page-picture').on('mousemove',function(){
      $('.on-move-mouse').fadeIn('slow');
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > 500) {
      $('.on-move-mouse').removeClass('position-fixed');
    }
    if ($(window).scrollTop() < 550) {
      $('.on-move-mouse').addClass('position-fixed');
    }
  });

  $('#posts').on('click','button',function(el){
    el.preventDefault();
    var buttonId = this.closest('div').id;
    console.log(buttonId);
    page.iterateData(buttonId);
  });
},

iterateData: function(localId) {
    var item = new ItemModel();
    item.fetch().then(function (collectionData) {
      var items = new ItemCollection(collectionData);
      // console.log(items);
      // console.log(items.get(localId));
      var actualItem = items.get(localId);
      var numLikes = actualItem.get(numLikes);
      var addedLikes  = numLikes +1;
      actualItem.set({'numLikes': addedLikes});
      console.log(actualItem);
      actualItem.save();
      console.log(actualItem);
    });

  }
};
