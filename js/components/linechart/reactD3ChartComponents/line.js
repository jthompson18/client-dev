const React = require('react'),
			_reactFauxDom = require('react-faux-dom');

var Line = React.createClass({
	_mkLine: function (dom) {
		var _props = this.props;
    var dataset = _props.dataset;
    var lineClassName = _props.lineClassName;
    var showBrush = _props.showBrush;
    var showZoom = _props.showZoom;
    var duration = _props.duration;

    // make line
    var line = d3.select(dom);

    line.datum(dataset.data).style("stroke", dataset.color).attr("class", lineClassName + ' line').attr("d", this._setAxes());

    if (dataset.style) {
      for (var key in dataset.style) {
        line.style(key, dataset.style[key]);
      }
    }

    if (showBrush) line.style('clip-path', 'url(#react-d3-basic__brush_focus__clip)');

    if (showZoom) line.style('clip-path', 'url(#react-d3-basic__zoom_focus__clip)');

    return line;
},
  _setAxes: function () {
  	var _props2 = this.props;
    var x = _props2.x;
    var y = _props2.y;
    var xScaleSet = _props2.xScaleSet;
    var yScaleSet = _props2.yScaleSet;
    var interpolate = _props2.interpolate;

    return d3.svg.line().interpolate(interpolate).x(function (d) {
      return xScaleSet(d.x);
    }).y(function (d) {
      return yScaleSet(d.y);
    });
  },
  render: function () {
  	var linePath = _reactFauxDom.createElement('path');
    var line = this._mkLine(linePath);

    return line.node().toReact();
  },
  getDefualtProps: function() {
    return {
    	interpolate: null,
      lineClassName: 'react-d3__line'
    };
  }
});

module.exports = Line;