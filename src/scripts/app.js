

var slice = Array.prototype.slice;

if (!window.on) window.on = on;
if (!document.on) document.on = on;
if (!window.$) window.$ = $;

scroll('#projects--link', '#projects');
scroll('#resume--link', '#resume');




/**
 * calculate offset target section and add
 * an event handler for smooth scrolling
 * @param  {[type]} link   [description]
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */

function scroll(link, target) {

  var link = $(link);
  var target = $(target);

  link.on('click', function(e) {
    e.preventDefault();
    var offset = getOffset(target);
    var opts = { scrollTo: { y: offset } }
    TweenMax.to(window, 0.5, opts);
    return false;
  })

}


/**
 * Alias function for adding event handlers
 * @param  {String} event   event type
 * @param  {function} handler event handler
 * @param  {Boolean} bubble  bubble state
 */

function on(event, handler, bubble) {
  this.addEventListener(event, handler, bubble);
}


/**
 * Alias function for querying documents
 * @param  {String} node CSS selector
 * @param  {Boolean} all  whether to get all or one node matching
 * @return {HTMLElement}      matching node(s)
 */

function $(node, all) {
  if (all) {
    var nodes = slice.call(document.querySelectorAll(node));
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].on = on;
    }
  }

  var node =  document.querySelector(node);
  node.on = on;
  return node;
}

function getOffset(node) {
  return node.offsetTop;
}
