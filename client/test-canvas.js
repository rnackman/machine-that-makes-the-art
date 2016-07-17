import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

import './test-canvas.html';

Template.testCanvas.onCreated(function testCanvasOnCreated() {
  console.log('testCanvas created');

  this.canvas = new ReactiveVar;
  this.canvas_specs = new ReactiveDict;
});

Template.testCanvas.onRendered(function testCanvasOnRendered() {
  console.log('testCanvas rendered');

  this.canvas = document.getElementById('canvas');

  this.canvas_specs.width = $('#canvas').outerWidth();
  this.canvas_specs.height = $('#canvas').outerHeight();
});

Template.testCanvas.helpers({
  canvas() {
    return Template.instanc().canvas.get();
  },
  canvas_specs() {
    return Template.instance().canvas_specs.get();
  },
});

Template.testCanvas.events({
  'click #play-button': function(event, instance) {
    var canvas = instance.canvas;
    var canvas_specs = instance.canvas_specs;

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');



      ctx.strokeStyle = '#000';

      var n = 0;
      var space = 8;
      var stop = canvas_specs.width / space;
      var height = canvas_specs.height;

      window.requestAnimationFrame(draw);
      function draw() {
          ctx.moveTo((space*n), 0);
          ctx.lineTo(space*n,height);
          ctx.stroke();

          if (n < stop+1) {
            n += 1;
            window.requestAnimationFrame(draw);
          }
      }
    } else {
      // canvas unsupported code here.
    }
  }
});
