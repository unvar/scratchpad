var DOMUtil = {
  hasClass: function(el, class) {
    var classAttr = el.getAttribute('class');

    return classAttr.split(/\s+/).indexOf(class) != -1;
  }
};