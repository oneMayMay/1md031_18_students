'use strict';
var socket = io();

var vm = new Vue({
  el: "#myProj",
  data: {
    burgers: food,
    Name: "",
    Email: "",
    // Street: "",
    // House: "",
    payway: "",
    Fe: "",
    Ma: "",
    Ordered: [], // array with the burgers that are "clicked"
    orders: {},
    details: {x:0, y:0},
    isOrdered: false,
},
created: function () {
  socket.on('initialize', function (data) {
    this.orders = data.orders;
  }.bind(this));

  socket.on('currentQueue', function (data) {
    this.orders = data.orders;
  }.bind(this));
},


  methods: {
      getNext: function () {
        var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
          return Math.max(last, next);
        }, 0);
        return lastOrder + 1;
      },

      addOrder: function (event) {
        console.log("button clicked!" + this.Name)
        this.isOrdered = true;

        socket.emit("addOrder", { orderId: this.getNext(),
                                  details: this.details,
                                  orderItems: this.Ordered,
                  // For some reason it didn´t work if it was an array
                                  customerName: this.Name,
                                  customerEmail: this.Email,
                                  customerGenderFe: this.Fe,
                                  customerGenderMa: this.Ma,
                                  customerPayway: this.payway
                                });
      },

      /*



      addOrder: function (event) {
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};
        socket.emit("addOrder", { orderId: this.getNext(),
                                  details: { x: event.clientX - 10 - offset.x,
                                             y: event.clientY - 10 - offset.y },
                                             ,
                                  orderItems: ["Beans", "Curry"]
                                });

      */

      /* "displayOrder" finns i html och är där kopplad till kartan.
      Denna funktion reagerar alltså när någon klickar på kartan*/
      displayOrder: function() {
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};
        this.details = { x: event.clientX - 10 - offset.x,
                   y: event.clientY - 10 - offset.y }
      }
}


})
