(function($){

  Backbone.sync = function(method, model, success, error) {
    success();
  };

  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });

  var List = Backbone.Collection.extend({
    model: Item
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li',  // name of tag in this.el

    events: {
      'click .swap': 'swap',
      'click .delete': 'remove'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'unrender', 'swap', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function() {  // added 'swap' and 'delete' buttons here as <spans>
      $(this.el).html(this.model.get('part1') + ' ' + this.model.get('part2') + ' &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
      return this; // for chaining, like render().el or whatevs
    },

    unrender: function() {
      $(this.el).remove();
    },

    swap: function() {
      var swapped = {
        part1: this.model.get('part2'),
        part2: this.model.get('part1')
      }

      this.model.set(swapped);
    },

    remove: function() {
      this.model.destroy();
    }
  });

  var ListView = Backbone.View.extend({
    el: $('body'), // attaches `this.el` to an existing element.

    events: {
      'click #add': 'addItem',
      'click #zero': 'zeroItem'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem', 'zeroItem'); // fixes loss of context for 'this' within methods -- Every item that uses 'this' should be here

      this.collection = new List(); // Collection of items
      this.collection.bind('add', this.appendItem);
      //this.collection.bind('zero', this.zeroItem);

      this.counter = 0; // Total number of items
      this.render(); // not all views are self-rendering. This one is.
    },

    render: function(){
      var that = this;

      $(this.el).append('<button id="add">Add Item</button>');
      $(this.el).append('<button id="zero">Zero Counter</button>');
      $(this.el).append("<ul></ul>");

      _(this.collection.models).each(function(item){  // So if the collection starts with items in it already, those can be added here
        that.appendItem(item);
      }, this);
    },

    addItem: function() {
      this.counter++;
      item = new Item();
      item.set({
        part2: item.get('part2') + this.counter // modify item defaults
      });

      this.collection.add(item);  // add item to collection.  Event binding is above, in initialize
    },

    appendItem: function() {
      var itemView = new ItemView({
        model: item
      });

      $('ul', this.el).append(itemView.render().el);
      //$('ul', this.el).append('<li class="hi-' + this.counter + '">' + item.get('part1') +' ' + item.get('part2') + '</li>');
    },

    zeroItem: function() {
      this.counter = 0;
    }
  });

  var listView = new ListView();
})(jQuery);