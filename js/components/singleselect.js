const React = require('react'),
      ReactSelect = require('react-select');

var SingleSelect = React.createClass({
    displayName: 'SingleSelect',
    propTypes: {
        label: React.PropTypes.string,
		value: React.PropTypes.object,
        name: React.PropTypes.string
	},

    getInitialState () {
		return {
            value: this.props.value
		};
	},

    onSelectValue (newValue) {
        this.setState({
			value: newValue
		});
        this.props.onSelectChange(newValue, this.props.name);
    },

    render: function () {
        return (
            <div className="section">
                <label className="section-heading">{this.props.label}</label>
                <ReactSelect
                    simpleValue
                    name={this.props.name}
                    options={this.props.options}
                    value={this.state.value}
                    onChange={this.onSelectValue} />
            </div>
        );
    }
});

module.exports = SingleSelect;
