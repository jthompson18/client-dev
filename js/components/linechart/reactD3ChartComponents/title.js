const React = require('react');

var Title = React.createClass({

	render:function() {
    var _props = this.props;
    var titleClassName = _props.titleClassName;
    var title = _props.title;
    var width = _props.width;

    var titleStyle = {
      width: width,
      textAlign: 'center',
      fontSize: '2em',
      paddingBottom: '1.3em'
    };

    return React.createElement(
      'div',
      {
        style: titleStyle,
        className: titleClassName
      },
      title
    );
  },

  getDefaultProps: function (){
   return {
      titleClassName: 'react-d3__container_title',
      title: 'Chart Title'
    };
  }
  // propTypes: function (){
  //   width: React.PropTypes.number.isRequired,
  //   title: React.PropTypes.string,
  //   titleClassName: React.PropTypes.string
  //  },
});
module.exports = Title;