const slice = Array.prototype.slice

export function $(node, all = false) {

  if (all) {
    let nodes = slice.call(document.querySelectorAll(node))
    nodes.forEach(node => node.on = on)
    return nodes
  }

  let target = document.querySelector(node)
  target.on = on
  return target
}

/**
 * Alias function for querying documents
 * @param  {String} node CSS selector
 * @param  {Boolean} all  whether to get all or one node matching
 * @return {HTMLElement}      matching node(s)
 */

export function getOffset(node) {
  return node.offsetTop
}



/**
 * Alias function for adding event handlers
 * @param  {String} event   event type
 * @param  {function} handler event handler
 * @param  {Boolean} bubble  bubble state
 */

function on(event, handler, bubble) {
  this.addEventListener(event, handler, bubble)
}
