const React = require('react'),
      SingleSelect = require('./singleselect.js');

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

var SectionHeading = React.createClass({
    render: function () {
        return (
            <section className="section-title">
                <section className="selector-left">

                    <SingleSelect
                        label="Select data 1: "
                        options={dataFiles}
                        value={dataFiles[0]} />

                    <SingleSelect
                        label="Select data 2: "
                        options={dataFiles}
                        value={dataFiles[1]} />

                </section>
                <section className="selector-left">
                    <h2>MultiSelector</h2>
                </section>
            </section>
        );
    }
});

module.exports = SectionHeading;
