const React = require('react'),
      SingleSelect = require('./singleselect.js'),
      MultiSelect = require('./multiselect.js');

var SectionHeading = React.createClass({
    render: function () {
        // TODO add headers according to data selected
        return (
            <section className="section-title">
                <section className="selector-left">

                    <SingleSelect
                        label="Select data 1: "
                        options={this.props.files}
                        value={this.props.files[1]}
                        name="select1"
                        onSelectChange={this.props.onSelectDataChange} />

                    <SingleSelect
                        label="Select data 2: "
                        options={this.props.files}
                        value={this.props.files[0]}
                        name="select2"
                        onSelectChange={this.props.onSelectDataChange} />

                </section>
                <section className="selector-left">

                    <MultiSelect
                        label="Select the countries you would like to compare:"
                        value={this.props.multiSelectOptions[0]}
                        options={this.props.multiSelectOptions}
                        onMultiSelectChange={this.props.onMultiSelectChange} />

                </section>
            </section>
        );
    }
});

module.exports = SectionHeading;
