const React = require('react'),
			_d3 = require('d3'),
			_reactFauxDom = require('react-faux-dom');

var Legend = React.createClass({

    _series: function (props){
      var chartSeries = props.chartSeries;
      var categoricalColors = props.categoricalColors;

      categoricalColors = categoricalColors || _d3.scale.category10();

      var series = chartSeries.map(function (f, i) {
        // set a color if not set
        f.color = f.color || categoricalColors(i);
        // set name if not set
        f.name = f.name || f.field;
        return {
          color: f.color,
          name: f.name,
          field: f.field
        };
      });
      return series;
    },
    _mkLegend: function (dom) {
      var _props = this.props;
      var width = _props.width;
      var margins = _props.margins;
      var chartSeries = _props.chartSeries;
      var legendClassName = _props.legendClassName;
      var legendPosition = _props.legendPosition;
      var legendOffset = _props.legendOffset;

      var legendArea = _d3.select(dom);
      var series = this._series(this.props);

      // make legends
      var legend = legendArea.selectAll('div').data(series).enter().append("div").attr("class", legendClassName + ' legend')
      // .style("width", 120)
      .style("height", 20).style("padding", 5).style("background-color", '#EEE').style("display", "inline-block");

      var rect = legend.append("div").style("width", 18).style("height", 18).style("background-color", function (d) {
        return d.color;
      }).style("float", legendPosition);

      var text = legend.append("div")
      // .style("width", 92)
      .style("padding-left", 5).style("padding-right", 5).text(function (d) {
        return d.name;
      }).style("float", legendPosition);

      return legendArea;
    },
  	render: function() {
      var _props2 = this.props;
      var legendClassName = _props2.legendClassName;
      var width = _props2.width;
      var height = _props2.height;

      var legendGroup = _reactFauxDom.createElement('div');
      var legendClasses = legendClassName + ' legend';

      legendGroup.setAttribute('class', legendClasses);
      legendGroup.style.width = width;
      legendGroup.style.textAlign = 'center';

      var legendDom = this._mkLegend(legendGroup);

      return legendDom.node().toReact();
    }, 
    getDefaultProps:function (){
    	return {
	      legendHeight: 50,
	      legendPosition: 'left',
	      legendOffset: 90,
	      legendClassName: 'react-d3__legend'
	    };
	  }
    // propTypes: function (){
    //   width: React.PropTypes.number.isRequired,
    //   margins: React.PropTypes.object.isRequired,
    //   chartSeries: React.PropTypes.array.isRequired,
    //   legendOffset: React.PropTypes.number.isRequired,
    //   legendClassName: React.PropTypes.string.isRequired,
    //   legendPosition: React.PropTypes.oneOf(['left', 'right']).isRequired
    // },
});

module.exports = Legend;