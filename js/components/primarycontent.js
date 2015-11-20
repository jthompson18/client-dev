const $ = require('jquery'),
      React = require('react'),
      SectionHeading = require('./sectionheading.js');

global.jQuery = $;

var PrimaryContent = React.createClass({
    // TODO load data here as an event triggered by its children and pass the data as property ???
    getInitialState: function () {
        return {
            data: [],
            selectedCountries: []
        };
    },

    handleSelectDataChange: function (file, fieldName) {
        console.log(file, fieldName);
    },

    handleMultiSelectChange: function(selectedCountries) {
        console.log(selectedCountries);
    },

    // TODO since we are comparing to json data, should we request two files (call the function 2x)
    loadJSONData: function (file) {
        jQuery.ajax({
            url: file,
            dataType: 'json',
            cache: true,
            success: function (data) {
                //this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function () {
        // TODO call it with a default file
        this.loadJSONData('data/hdiData.json');
    },

    render: function () {
        return (
            <section id="content">
                <SectionHeading
                    onSelectDataChange={this.handleSelectDataChange}
                    onMultiSelectChange={this.handleMultiSelectChange} />
            </section>
        );
    },
});

module.exports = PrimaryContent;
