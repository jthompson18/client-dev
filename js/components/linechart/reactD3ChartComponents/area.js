const React = require('react'),
			_reactFauxDom = require('react-faux-dom');

var AreaSimple = React.createClass({
	_mkArea: function (dom) {
		var _props = this.props;
    var dataset = _props.dataset;
    var areaClassName = _props.areaClassName;
    var areaOpacity = _props.areaOpacity;
    var showBrush = _props.showBrush;
    var showZoom = _props.showZoom;
    var duration = _props.duration;

    // make area
    var area = d3.select(dom);

    area.datum(dataset.data).attr("class", areaClassName + ' area').style("fill", dataset.color).style("stroke", dataset.color).attr("d", this._setAxes());

    if (dataset.style) {
      for (var key in dataset.style) {
        area.style(key, dataset.style[key]);
      }
    }

    if (showBrush) area.style('clip-path', 'url(#react-d3__brush_focus__clip)');

    if (showZoom) area.style('clip-path', 'url(#react-d3__zoom_focus__clip)');

    return area;
  },
  _setAxes: function () {
  	var _props2 = this.props;
    var height = _props2.height;
    var margins = _props2.margins;
    var x = _props2.x;
    var y = _props2.y;
    var xScaleSet = _props2.xScaleSet;
    var yScaleSet = _props2.yScaleSet;
    var interpolate = _props2.interpolate;

    return d3.svg.area().interpolate(interpolate).x(function (d) {
      return xScaleSet(d.x);
    }).y0(function (d) {
      var domain = yScaleSet.domain();

      if (domain[0] * domain[1] < 0) {
        return yScaleSet(0);
      } else if (domain[0] * domain[1] >= 0 && domain[0] >= 0) {
        return yScaleSet.range()[0];
      } else if (domain[0] * domain[1] >= 0 && domain[0] < 0) {
        return yScaleSet.range()[1];
      }
    }).y1(function (d) {
      return yScaleSet(d.y);
    });
  },
  render: function () {
  	var areaPath = _reactFauxDom.createElement('path');
    var area = this._mkArea(areaPath);

    return area.node().toReact();
  },
  getDefualtProps: function () {
    return {
    	interpolate: null,
      duration: 500,
      areaClassName: 'react-d3__area'
    }
  }
});

module.exports = AreaSimple;