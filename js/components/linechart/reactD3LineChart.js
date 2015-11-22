const React = require('react'),
      _reactD3Core = require('react-d3-core'),
      _utilsSeries = require('./reactD3ChartComponents/util/series.js'),
      _componentsArea = require('./reactD3ChartComponents/area.js'),
			_componentsLine = require('./reactD3ChartComponents/line.js');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
var LineChart = React.createClass({

	getInitialState: function () {
		var width = 700,
        height = 300,
        margins = {left: 100, right: 100, top: 50, bottom: 50};
    return {
      xRange: [0, width - margins.left - margins.right],
    	yRange: [height - margins.top - margins.bottom, 0],
    	xRangeRoundBands: { interval: [0, width - margins.left - margins.right], padding: .1 }
    };
  },

	mkXScale: function () {
    var _props = this.props;
    var data = _props.data;
    var xScale = _props.xScale;
    var _state = this.state;
    var xRange = _state.xRange;
    var xRangeRoundBands = _state.xRangeRoundBands;

    var xDomain = this.props.xDomain || this.setXDomain;

    var newXScale = {
      scale: xScale,
      range: xRange,
      domain: xDomain,
      rangeRoundBands: xRangeRoundBands
    };

    return (0, _reactD3Core.scale)(newXScale);
  },

  mkYScale: function () {
    var _props2 = this.props;
    var data = _props2.data;
    var yScale = _props2.yScale;
    var _state2 = this.state;
    var yRange = _state2.yRange;
    var yRangeRoundBands = _state2.yRangeRoundBands;

    var yDomain = this.props.yDomain || this.setYDomain;

    var newYScale = {
      scale: yScale,
      range: yRange,
      domain: yDomain,
      rangeRoundBands: yRangeRoundBands
    };

    return (0, _reactD3Core.scale)(newYScale);
  },

  mkSeries: function () {
    return (0, _utilsSeries.series)(this.props);
  },

  mkXDomain: function () {
    return this.setXDomain = (0, _reactD3Core.xDomainCount)(this.props);
  },

  mkYDomain: function (stack) {
    return this.setYDomain = (0, _reactD3Core.yDomainCount)(this.props, stack);
  },

	render: function () {
    var _this = this;

    var lines;
    var scatters;

    var _props = this.props;
    var showScatter = _props.showScatter;
    var showXGrid = _props.showXGrid;
    var showYGrid = _props.showYGrid;
    var interpolate = _props.interpolate;
    var chartSeries = _props.chartSeries;

    var xDomain = this.mkXDomain();
    var yDomain = this.mkYDomain();
    var xScaleSet = this.mkXScale();
    var yScaleSet = this.mkYScale();
    var chartSeriesData = this.mkSeries();

    if (showXGrid) {
      var xgrid = React.createElement(_reactD3Core.Grid, _extends({ type: 'x', key: 'xgrid', xDomain: xDomain }, this.props, this.state));
    }

    if (showYGrid) {
      var ygrid = React.createElement(_reactD3Core.Grid, _extends({ type: 'y', key: 'ygrid', yDomain: yDomain }, this.props, this.state));
    }

    if (chartSeries) {
      var lines = chartSeriesData.map(function (d, i) {
        if (d.area) {
          // area chart
          return React.createElement(_componentsArea, _extends({ dataset: d, key: i }, _this.props, _this.state, { xScaleSet: xScaleSet, yScaleSet: yScaleSet, chartSeriesData: chartSeriesData }));
        } else {
          // simple line chart
          return React.createElement(_componentsLine, _extends({ dataset: d, key: i }, _this.props, _this.state, { xScaleSet: xScaleSet, yScaleSet: yScaleSet, chartSeriesData: chartSeriesData }));
        }
      });
    }

    // if (showScatter && !interpolate) {
    //   // show scatters in line chart
    //   var scatters = chartSeriesData.map(function (d, i) {
    //     return React.createElement(_componentsScatter, _extends({ dataset: d, key: i }, _this.props, _this.state, { xScaleSet: xScaleSet, yScaleSet: yScaleSet, chartSeriesData: chartSeriesData }));
    //   });
    // }

    return React.createElement(
      'g',
      null,
      React.createElement(
        'g',
        { ref: 'plotGroup' },
        lines,
        scatters
      ),
      xgrid,
      ygrid,
      React.createElement(_reactD3Core.Xaxis, _extends({ xDomain: xDomain }, this.props, this.state)),
      React.createElement(_reactD3Core.Yaxis, _extends({ yDomain: yDomain }, this.props, this.state))
    );
  },
});

module.exports = LineChart;