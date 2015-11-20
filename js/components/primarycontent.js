const $ = require('jquery'),
      React = require('react'),
      SectionHeading = require('./sectionheading.js'),
      HelpText = require('./helptext.js'),
      SingleSelect = require('./singleselect.js'),
      Table = require('./table.js');

global.jQuery = $;

// TODO Assign a title for label field instead of the filename
var dataFiles = [
    {"value": "fem_pop.json", "label": "fem_pop.json"},
    {"value": "hdiData.json", "label": "hdiData.json"},
    {"value": "life_expect.json", "label": "life_expect.json"},
    {"value": "mal_pop.json", "label": "mal_pop.json"},
    {"value": "mean_schooling_female.json", "label": "mean_schooling_female.json"},
    {"value": "mean_schooling_male.json", "label": "mean_schooling_male.json"},
    {"value": "prison_pop_per_100000.json", "label": "prison_pop_per_100000.json"}
];

// TODO should this be a fixed list of countries or vary according to the json loaded
var multiSelectOptions =  [
    {value:"unitedStates", label:"United States"},
    {value:"cuba", label:"Cuba"},
    {value:"poland", label:"Poland"},
    {value:"libya", label:"Libya"},
    {value:"malaysia", label:"Malaysia"},
    {value:"congo", label:"Congo"}
];

var singleSelectOptions = [
    {value:6 , label: "2013"},
    {value:5 , label: "2012"},
    {value:4 , label: "2011"},
    {value:3 , label: "2010"},
    {value:2 , label: "2008"},
    {value:1 , label: "2005"},
    {value:0 , label: "2000"}
];

// TODO since we are comparing to json data, should we request two files (call the function 2x)
var loadJSONData = function(file, callback) {
    jQuery.ajax({
        url: file,
        dataType: 'json',
        cache: true,
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, err) {
            console.error(file, status, err.toString());
        }
    });
}

var PrimaryContent = React.createClass({

    // TODO load data here as an event triggered by its children and pass the data as property ???
    getInitialState: function () {
        return {
            dataS1: [], // data from the select 1 - should it be state or prop?
            dataS2: [], // data from the select 2
            selectedCountries: [multiSelectOptions[0]], // United States
            indexSelected: singleSelectOptions[0]
        };
    },

    handleSelectDataChange: function (data, fieldName) {
        // for fieldName = select1 or select2, data = json filename
        // for fieldName = select3, data = year selected
        if (fieldName == 'select1') {
            // load data and set state dataS1
        } else if (fieldName == 'select2') {
            // load data and set state dataS2
        } else if (fieldName == 'select3') {
            this.setState({indexSelected: data});
        }

        console.log(data, fieldName);
    },

    handleMultiSelectChange: function(selectedCountries) {
        this.setState({selectedCountries: selectedCountries});
    },

    componentDidMount: function () {
        // TODO call it with a default file
        loadJSONData('data/fem_pop.json', function (data) {
            var dataS1 = data;
            loadJSONData('data/hdiData.json', function(data) {
                this.setState({
                    dataS1: dataS1,
                    dataS2: data
                });
            }.bind(this));
        }.bind(this));
    },

    render: function () {
        // TODO print help text according to data selected
        var hdiHelpText2 = "The Human Development Index (HDI) is a composite index measuring average of the three basic metrics of human development: life expectancy, education rate, and average standard of living.";
        var hdiInfoLink = "http://hdr.undp.org/en";

        return (
            <section id="content">
                <SectionHeading
                    files={dataFiles}
                    multiSelectOptions={multiSelectOptions}
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

                <section className="table-align-left">
                    <Table
                        data={this.state.dataS1}
                        indexSelected={this.state.indexSelected}
                        selectedCountries={this.state.selectedCountries} />
                </section>
            </section>
        );
    },
});

module.exports = PrimaryContent;
