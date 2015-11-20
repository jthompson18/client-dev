const React = require('react'),
      ReactSelect = require('react-select');

var SingleSelect = React.createClass({
    displayName: 'SingleSelect',
    propTypes: {
        label: React.PropTypes.string,
		value: React.PropTypes.object
	},

    onSelectValue (newValue) {
        console.log('Value selected ' + newValue);
    },

    render: function () {
        return (
            <div className="section">
                <h3 className="section-heading">{this.props.label}</h3>
                <ReactSelect
                    simpleValue
                    name={this.props.name}
                    options={this.props.options}
                    value={this.props.value}
                    onChange={this.onSelectValue} />
            </div>
        );
    }
});

module.exports = SingleSelect;
