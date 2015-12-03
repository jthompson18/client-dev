const React = require('react'),
      ReactSelect = require('react-select');

var MultiSelect = React.createClass({
    displayName: 'MultiSelect',
    propTypes: {
        label: React.PropTypes.string,
        options: React.PropTypes.array,
        value: React.PropTypes.object
	},

    getInitialState () {
		return {
			value: [this.props.value], // United States is default
		};
	},

    onSelectValue (value, values) {
        if (values.length == 0) { // make the field to have a default value always
            // the value param comes as string, but an object {value: "", label: ""} can be set as a value
            value = this.props.value;
            values.push(value);
        }
        // TODO check need to change the state here
        // Is the whole MultiSelect being rerendered whenever a value is selected or removed?
        // find a way to prevent the event to be called in case a user tries to remove the default selected value
        this.setState({
            value: value
        });
        // console.log('New value:', value, 'Values:', values);
        this.props.onMultiSelectChange(values);
    },

    render: function () {
        return (
            <div className="section">
                <label className="section-heading">{this.props.label}</label>
                <ReactSelect
                    multi
                    simpleValue
                    options={this.props.options}
                    value={this.state.value} // TODO should this be state?
                    onChange={this.onSelectValue} />
            </div>
        );
    }
});

module.exports = MultiSelect;
