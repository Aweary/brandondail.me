import { $, getOffset } from './util.js'
import TweenMax from 'gsap'

/**
 * calculate offset target section and add
 * an event handler for smooth scrolling
 * @param  {[type]} link   [description]
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */


export default function scroll(link, target) {

  var link = $(link)
  var target = $(target)

  console.log(link, target)

  link.on('click', function(e) {
    e.preventDefault()
    let offset = getOffset(target)
    let opts = { scrollTo: { y: offset } }
    TweenMax.to(window, 0.5, opts)
    return false
  })

}
