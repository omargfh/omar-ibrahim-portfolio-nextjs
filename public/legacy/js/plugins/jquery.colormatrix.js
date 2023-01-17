
/*!
----------------------------------
jquery.colorMatrix.js
----------------------------------
version:        1.1.3
last update:    June 6th, 2017
author:         Maarten Zilverberg
tested:         Webkit, FF31+, IE8+
----------------------------------
 */
(function($, window, document) {
  var NS, Plugin, defaults, pluginName;
  pluginName = "colorMatrix";
  NS = {
    svg: "http://www.w3.org/2000/svg",
    xlink: "http://www.w3.org/1999/xlink"
  };
  defaults = {
    className: "grayscale",
    type: "saturate",
    ids: ["desaturate", "normal"],
    values: [0, 1]
  };
  Plugin = (function() {
    function Plugin(element, options) {
      this.element = element;
      this.settings = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      this.init();
    }

    Plugin.prototype.cssFiltersSupported = function() {
      var a, b, el, filter, prefixes;
      el = document.createElement("div");
      prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
      el.style.cssText = prefixes.join("filter: blur(2px); ");
      filter = $(this.element).addClass(this.settings.className).css("filter");
      a = !!el.style.length || filter !== "none";
      b = typeof document.documentMode === "undefined" || document.documentMode > 9;
      return a && b;
    };

    Plugin.prototype.svgSupported = function() {
      return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
    };

    Plugin.prototype.isOldIE = function() {
      return document.documentMode <= 9;
    };

    Plugin.prototype.checkImage = function() {
      var isImageLoaded, iterations, t;
      t = this;
      iterations = 0;
      isImageLoaded = function() {
        iterations++;
        if (t.completeImage()) {
          return true;
        } else if (iterations <= 100) {
          window.setTimeout(isImageLoaded, 100);
        } else {
          return true;
        }
      };
      return isImageLoaded();
    };

    Plugin.prototype.completeImage = function() {
      if (!this.element.complete) {
        return false;
      }
      if (typeof this.element.naturalWidth !== "undefined" && this.element.naturalWidth === 0) {
        return false;
      }
      return true;
    };

    Plugin.prototype.createSVG = function(imgId, w, h) {
      var $svg, svg;
      svg = document.createElementNS(NS.svg, "svg");
      svg.setAttribute("width", w);
      svg.setAttribute("height", h);
      $svg = $(svg);
      this.createSVGDefinitions($svg, imgId);
      this.addImage($svg, imgId, w, h);
      return $svg;
    };

    Plugin.prototype.createSVGDefinitions = function($svg, imgId) {
      var defs, filter, i, matrix;
      defs = document.createElementNS(NS.svg, "defs");
      i = 0;
      while (i < 2) {
        filter = document.createElementNS(NS.svg, "filter");
        filter.setAttribute("id", this.settings.ids[i]);
        matrix = document.createElementNS(NS.svg, "feColorMatrix");
        matrix.setAttribute("type", this.settings.type);
        matrix.setAttribute("values", this.settings.values[i]);
        filter.appendChild(matrix);
        defs.appendChild(filter);
        i++;
      }
      $svg[0].appendChild(defs);
    };

    Plugin.prototype.addImage = function($svg, imgId, w, h) {
      var args, attrs, img, isArray, key;
      attrs = {
        "id": imgId,
        "class": this.settings.className,
        "width": w,
        "height": h,
        "x": 0,
        "y": 0,
        "href": [this.element.src, NS.xlink],
        "visibility": "visible"
      };
      isArray = function(val) {
        return Object.prototype.toString.call(val) === "[object Array]";
      };
      img = document.createElementNS(NS.svg, "image");
      for (key in attrs) {
        if (attrs.hasOwnProperty(key)) {
          args = {
            namespace: !isArray(attrs[key]) ? null : attrs[key][1],
            value: !isArray(attrs[key]) ? attrs[key] : attrs[key][0]
          };
          img.setAttributeNS(args.namespace, key, args.value);
        }
      }
      $svg.append(img);
    };

    Plugin.prototype.apply = function() {
      var $svg, h, imgId, w;
      w = this.element.width;
      h = this.element.height;
      imgId = "img_" + (Math.random().toString(36).substr(2, 9));
      if (this.cssFiltersSupported() || this.isOldIE()) {
        $(this.element).addClass(this.settings.className);
        return;
      }
      if (!this.svgSupported()) {
        throw new Error(pluginName + ".js: SVG is not supported by this browser");
        return;
      }
      $svg = this.createSVG(imgId, w, h);
      return $(this.element).hide().after($svg);
    };

    Plugin.prototype.init = function() {
      if (this.checkImage(this.element)) {
        return this.apply();
      }
    };

    return Plugin;

  })();
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
  $(window).on("load", function() {
    return $("." + defaults.className)[pluginName]();
  });
})(jQuery, window, document);
