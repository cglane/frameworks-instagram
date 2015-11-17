var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'http://tiny-tiny.herokuapp.com/collections/ctest2',
  idAttribute: '_id',
  defaults: {
    task: "Generic Task",
    isComplete: false,
    numLikes: 0,
  },

  initialize: function () {
    console.log("hello charles");
    this.render();
  },
  render:function(){
  }
});
