const React = require('react'),
			_d3 = require('d3'),
			_reactDom = require('react-dom'),
			_utilsScale = require('./util/scale.js');

var ChartSVG = React.createClass({

	componentDidMount: function () {
    var _this = this;
    var _props = this.props;
    var width = _props.width;
    var margins = _props.margins;
    var xScale = _props.xScale;
    var xDomain = _props.xDomain;
    var xRange = _props.xRange;
    var xScaleSet = _props.xScaleSet;
    var yScaleSet = _props.yScaleSet;
    var onZoom = _props.onZoom;

    // implement zoom if xscale and y scale is set!
    if (xScaleSet && yScaleSet) {
      if (xScale === 'ordinal') {
        // if ordinal tramsform to linear
        xScaleSet = (0, _utilsScale.scale)({
          scale: 'linear',
          domain: [0, width - margins.left - margins.right],
          range: [0, width - margins.left - margins.right]
        });
      }

      var zoom = _d3.behavior.zoom().x(xScaleSet).y(yScaleSet).scaleExtent([1, 10]).on("zoom", function () {
        onZoom.call(_this, xScaleSet, yScaleSet);
      });

      _d3.select(_reactDom.findDOMNode(this.refs.svgContainer)).call(zoom);
    }
	},

	render: function () {
    var _props2 = this.props;
    var height = _props2.height;
    var width = _props2.width;
    var margins = _props2.margins;
    var svgClassName = _props2.svgClassName;
    var id = _props2.id;
    var children = _props2.children;

    var t = 'translate(' + margins.left + ', ' + margins.top + ')';

    return React.createElement(
      'svg',
      {
        height: height,
        width: width,
        className: svgClassName,
        id: id,
        ref: 'svgContainer'
      },
      React.createElement(
        'g',
        {
          transform: t
        },
        children
      )
    );
  },

  getDefaultProps: function () { 
  	return {
	    svgClassName: 'react-d3__container_svg',
	    id: 'react-d3__container_svg__' + Math.floor(Math.random() * 100000),
	    onZoom: function onZoom() {}
	  };
	},

  // propTypes: function () {
  //     id: React.PropTypes.string,
  //     width: React.PropTypes.number.isRequired,
  //     height: React.PropTypes.number.isRequired,
  //     margins: React.PropTypes.object.isRequired,
  //     svgClassName: React.PropTypes.string.isRequired
  //   };
	});
	
module.exports = ChartSVG;
