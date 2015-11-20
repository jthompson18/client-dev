const $ = require('jquery'),
      React = require('react'),
      SectionHeading = require('./sectionheading.js'),
      HelpText = require('./helptext.js'),
      SingleSelect = require('./singleselect.js');

global.jQuery = $;

var singleSelectOptions = [
    {value:6 , label: "2013"},
    {value:5 , label: "2012"},
    {value:4 , label: "2011"},
    {value:3 , label: "2010"},
    {value:2 , label: "2008"},
    {value:1 , label: "2005"},
    {value:0 , label: "2000"}
];

var PrimaryContent = React.createClass({
    // TODO load data here as an event triggered by its children and pass the data as property ???
    getInitialState: function () {
        return {
            data: [],
            selectedCountries: [],
            yearSelected: singleSelectOptions[0]
        };
    },

    handleSelectDataChange: function (data, fieldName) {
        // for fieldName = select1 or select2, data = json filename
        // for fieldName = select3, data = year selected
        if (fieldName == 'select1' || fieldName == 'select2') {

        } else if (fieldName == 'select3') {
            // this.setState({yearSelected: data});
        }

        console.log(data, fieldName);
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
        // TODO print help text according to data selected
        var hdiHelpText2 = "The Human Development Index (HDI) is a composite index measuring average of the three basic metrics of human development: life expectancy, education rate, and average standard of living.";
        var hdiInfoLink = "http://hdr.undp.org/en";

        return (
            <section id="content">
                <SectionHeading
                    onSelectDataChange={this.handleSelectDataChange}
                    onMultiSelectChange={this.handleMultiSelectChange} />

                <HelpText
                    helpText={hdiHelpText2}
                    externalLink={hdiInfoLink}  />

                <section className="selector-left">
                    <SingleSelect
                        label="Select a year for a more in depth look: "
                        options={singleSelectOptions}
                        value={singleSelectOptions[0]}
                        name="select3"
                        onSelectChange={this.handleSelectDataChange} />
                </section>
            </section>
        );
    },
});

module.exports = PrimaryContent;
