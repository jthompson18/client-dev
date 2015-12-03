'use strict';

const $ = require('jquery'),
      React = require('react'),
      _ = require('lodash'),
      SectionHeading = require('./sectionheading.js'),
      HelpText = require('./helptext.js'),
      SingleSelect = require('./singleselect.js'),
      Table = require('./table.js'),
      LineChart = require('./linechart/reactD3LineChart.js'),
      Chart = require('./linechart/reactD3BaseChart.js');

global.jQuery = $;

var dataFiles = [
    {"value": "fem_pop.json", "label": "Female Population per 10000"},
    // This does not scale well. Most of this doesn't, but this one is especially bad
    // {"value": "hdiData.json", "label": "Human Development Index"},
    {"value": "life_expect.json", "label": "Avg Life expectancy"},
    {"value": "mal_pop.json", "label": "Male Population per 10000"},
    {"value": "mean_schooling_female.json", "label": "Mean Years of Schooling-Female"},
    {"value": "mean_schooling_male.json", "label": "Mean Years of Schooling-Male"}
    // not enough data for this to be usable
    // {"value": "prison_pop_per_100000.json", "label": "prison_pop_per_100000.json"}
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
        var defaultItem = {value:"UnitedStates", label:"United States"};
        return {
            dataS1: [], // data from the select 1 - should it be state or prop?
            dataS2: [], // data from the select 2
            selectedCountries: [defaultItem],
            indexSelected: singleSelectOptions[0],
            multiSelectOptions: [defaultItem]
        };
    },

    updateChartState: function(dataS1, dataS2, selectedCountries) {
        var chartData = this.updateChartData(dataS1, dataS2, selectedCountries),
            chartSeries = this.getChartSeries(selectedCountries);
        this.setState({
            selectedCountries: selectedCountries,
            dataS1: dataS1,
            dataS2: dataS2,
            chartSeries: chartSeries,
            chartData: chartData,
        });
    },

    handleSelectDataChange: function (data, fieldName) {
        // for fieldName = select1 or select2, data = json filename
        // for fieldName = select3, data = year selected
        if (fieldName == 'select1') {
            // load data and set state dataS1
            loadJSONData('data/'+data, function (data) {
                this.updateChartState(data, this.state.dataS2, this.state.selectedCountries)
            }.bind(this));
        } else if (fieldName == 'select2') {
            loadJSONData('data/'+data, function (data) {
                this.updateChartState(this.state.dataS1, data, this.state.selectedCountries)
            }.bind(this));
        } else if (fieldName == 'select3') {
            this.setState({indexSelected: data});
        }
    },

    updateChartData: function(dataS1, dataS2, selectedCountries) {
        var selectedCountriesLen = selectedCountries.length;

        if(dataS1.length > 0 && dataS2.length > 0) {

            //pre sorting data based on country name
            dataS1 = _.sortBy(dataS1, 'name');
            dataS2 = _.sortBy(dataS2, 'name');

            if (dataS1.length > dataS2.length) {
                var dataLength = dataS1.length;
            }
            else {
               var dataLength = dataS2.length ;
            }
            var chartData = [];
            for(let i = 0; i<dataLength; i++) {
                var d1 = dataS1[i],
                    d2 = dataS2[i],
                    dataKeys = _.keys(dataS1[i]),
                    numOfKeys = dataKeys.length;

                for(let j = 0; j<numOfKeys; j++){
                    if (dataKeys[j] != 'name') {
                        var dataObj = {
                            'xVal': dataKeys[j]
                        };
                        for (let k = 0; k < selectedCountriesLen; k++){
                            if (d1['name'] == selectedCountries[k]['label']) {
                                for(let l = 0; l <chartData.length; l++) {
                                    var cData = chartData[l]
                                    if (_.has(cData, 'd1series0') && cData['xVal'] == dataKeys[j]){
                                        dataObj = cData;
                                    }
                                }
                                
                                var seriesLabel1 = "d1series" + k,
                                    seriesLabel2 = "d2series" + k,
                                    d1Data = d1[dataKeys[j]],
                                    d2Data = d2[dataKeys[j]];

                                // Not a real solution for mismatch data years, but good enough for final project
                                if (typeof d1Data === 'undefined') {
                                    d1Data = d1[dataKeys[j - 1]];
                                }
                                if (typeof d2Data === 'undefined') {
                                    d2Data = d2[dataKeys[j - 1]];
                                    if (typeof d2Data === 'undefined') {
                                        d2Data = d2[dataKeys[0]];
                                    }
                                }

                                if (d1Data.indexOf(',') > 0) {
                                    d1Data = d1Data.replace(',', '');
                                }
                                if(d2Data.indexOf(',') > 0){
                                    d2Data = d2Data.replace(',', '');
                                }
                                dataObj[seriesLabel1] = _.parseInt(d1Data);
                                dataObj[seriesLabel2] = _.parseInt(d2Data);

                            }
                        }
                        chartData.push(dataObj);
                    }
                }
            }
            _.remove(chartData, function(n) {
              if (!_.has(n, 'd1series0')){
                    return n;
                }
            });
            chartData = _.uniq(chartData, function (n) {
                return n['xVal'];
            });
            
            return chartData;
        }
    },

    getChartSeries: function(selectedCountries) {
        var selectedCountriesLen = selectedCountries.length,
            chartSeries = [];
        for (let i = 0; i < selectedCountriesLen; i++){
            var field1 = "d1series" + i,
                field2 = "d2series" + i,
                series1 = {
                    'name': selectedCountries[i]['label'],
                    'field': field1
                },
                series2 = {
                    'name': selectedCountries[i]['label'],
                    'field': field2
                };
            chartSeries.push(series1);
            chartSeries.push(series2);
        }
        
        return chartSeries;
    },

    handleMultiSelectChange: function(selectedCountries) {
        this.updateChartState(this.state.dataS1, this.state.dataS2, selectedCountries);
    },

    getKeysFromData: function (data) {
        var keys = [];
        for (let i = 0; i < data.length; i++) {
            // regex: http://stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string-having-trouble-with-the-char
            let key = data[i].name.replace(/\W/g, ''); // Removing non-alphanumeric chars
            keys[i] = {
                value: key,
                label: data[i].name
            };
        }
        if (keys.length > 0) {
            // this.setState({multiSelectOptions: keys});
            return keys;
        }
    },

    componentDidMount: function () {
        // TODO call it with a default file
        loadJSONData('data/mean_schooling_female.json', function (data) {
            var dataS1 = data;
            loadJSONData('data/mean_schooling_male.json', function(data) {
                var multiSelectOptions = this.getKeysFromData(data),
                    chartData = this.updateChartData(dataS1, data, this.state.selectedCountries),
                    chartSeries = this.getChartSeries(this.state.selectedCountries);
                this.setState({
                    dataS1: dataS1,
                    dataS2: data,
                    multiSelectOptions: multiSelectOptions,
                    chartSeries: chartSeries,
                    chartData: chartData,
                });
            }.bind(this));
        }.bind(this));
    },

    render: function () {
        // TODO print help text according to data selected
        var hdiHelpText2 = "The Human Development Report is published each year by The United Nations Development Programme. The report details various statistics and trend for over 190 countries. The following are a few of the many available datasets. Please select two you would like to compare. ";
        var hdiInfoLink = "http://hdr.undp.org/en";

        if (typeof this.state.chartData === 'undefined') {
            return null;
            }

        var chartData = this.state.chartData;

        var chartSeries = this.state.chartSeries;

        var parseDate = d3.time.format("%Y").parse;

        var width = 700,
            height = 300,
            margins = {left: 100, right: 100, top: 25, bottom: 60},
            title = "",

            //x accessor; d = chartData[i]
            x = function(d) {
                return parseDate(d.xVal);
            },

            //y accessor; d = chartData[i][field]
            y = function(d) {
                return d;
            },

            xScale = 'time',
            yScale = 'linear';


        return (
            <section id="content">
                <HelpText
                    helpText={hdiHelpText2}
                    externalLink={hdiInfoLink}  />

                <SectionHeading
                    files={dataFiles}
                    multiSelectOptions={this.state.multiSelectOptions}
                    onSelectDataChange={this.handleSelectDataChange}
                    onMultiSelectChange={this.handleMultiSelectChange} />

                <section className="chart-center">
                    <Chart
                      title={title}
                      width={width}
                      height={height}
                      margins= {margins}
                      >
                      <LineChart
                        margins={margins}
                        title={title}
                        data={chartData}
                        width={width}
                        height={height}
                        chartSeries={chartSeries}
                        x={x}
                        y={y}
                        xScale={xScale}
                        yScale={yScale}
                      />
                    </Chart>
                </section>

            </section>
        );
    },
});

module.exports = PrimaryContent;
