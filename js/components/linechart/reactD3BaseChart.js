const React = require('react'),
			_containerSvg = require('./reactD3ChartComponents/containerSVG.js'),
			_containerTitle = require('./reactD3ChartComponents/title.js'),
			_legend = require('./reactD3ChartComponents/legend.js');

var ChartContainer = React.createClass({
	render: function () {
		var _props = this.props;
    var width = _props.width;
    var chartSeries = _props.chartSeries;

    var legend;

    var divStyle = {
      width: width
    };

    if (chartSeries) {
      legend = React.createElement(_legend, _extends({}, this.props, {
        chartSeries: chartSeries
      }));
    }

    return React.createElement(
      'div',
      { style: divStyle },
      React.createElement(_containerTitle, this.props),
      legend,
      React.createElement(_containerSvg, this.props)
    );
	}
});

module.exports = ChartContainer;