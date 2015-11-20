const React = require('react'),
      SingleSelect = require('./singleselect.js'),
      MultiSelect = require('./multiselect.js');

// TODO move this data the parent (PrimaryContent) which controls the state
// Assign a title for label field instead of the filename
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

var SectionHeading = React.createClass({
    render: function () {
        // TODO add headers according to data selected
        return (
            <section className="section-title">
                <section className="selector-left">

                    <SingleSelect
                        label="Select data 1: "
                        options={dataFiles}
                        value={dataFiles[0]}
                        name="select1"
                        onSelectChange={this.props.onSelectDataChange} />

                    <SingleSelect
                        label="Select data 2: "
                        options={dataFiles}
                        value={dataFiles[1]}
                        name="select2"
                        onSelectChange={this.props.onSelectDataChange} />

                </section>
                <section className="selector-left">

                    <MultiSelect
                        label="Select the countries you would like to compare:"
                        value={multiSelectOptions[0]}
                        options={multiSelectOptions}
                        onMultiSelectChange={this.props.onMultiSelectChange} />

                </section>
            </section>
        );
    }
});

module.exports = SectionHeading;
