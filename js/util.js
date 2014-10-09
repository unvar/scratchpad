if (!String.prototype.prepend) {
  String.prototype.prepend = function(prefix) {
    return (prefix || '') + this;
  };
}

if (!String.prototype.append) {
  String.prototype.append = function(suffix) {
    return this + (suffix || '');
  };
}

var Util = (function() {
    var FORMAT_OPTIONS = {
        sep: ',',
        decSep: '.',
        decSize: 2,
        splitSizes: [3, 2]
    };

    function simpleXtend(o1, o2) {
      for(key in o2) {
        if (!o1[key]) {
          o1[key] = o2[key];
        }
      }

      return o1;
    }

    return {
        formatNumber: function(num, o) {
          // defaults
          o = simpleXtend(o || {}, FORMAT_OPTIONS);

          // split the int and dec part
          var parts = num.toFixed(o.decSize).split('.');
          var decPart = parts[1] ? parts[1].prepend(o.decSep) : '';
          var intPart = parts[0];

          // start splitting
          var numStr = decPart;
          var splitSize = o.splitSizes.shift();
          while(intPart.length > splitSize) {
            // extract necessary digits and prepend with separator
            numStr = numStr.prepend(o.sep + intPart.substr(-splitSize));

            // continue processing the rest of the string
            intPart = intPart.substring(0, intPart.length - splitSize);

            if (o.splitSizes.length) {
              splitSize = o.splitSizes.shift();
            }
          }

          // capture the rest of the string
          numStr = numStr.prepend(intPart);

          return numStr;
        }
    };
})();

