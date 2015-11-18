var $ = require('jquery');
global.jQuery = $
global.jquery = $
var highcharts = require('highcharts-browserify');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactSelect = require('react-select');
var rd3 = require('react-d3');
var rd3Basic = require('react-d3-basic');
var _ = require('lodash');


// $function({
    /*
        Data Set used for website
    */
    /*var rawData = {
        unitedStates: {
            name: "United States",
            hdi: [0.883, 0.897, 0.905, 0.908, 0.911, 0.912, 0.914],
            regionalHDI:[0.875, 0.895, 0.901, 0.902, 0.906, 0.907, 0.908],
            hdiRank: "5",
            annualPercentChange: "+0.26%",
            color: "#0099FF"
        },
        cuba: {
            name: "Cuba",
            hdi: [0.742, 0.786, 0.830, 0.824, 0.819, 0.813, 0.815],
            regionalHDI:[0.683, 0.705, 0.726, 0.734, 0.737, 0.739, 0.740],
            hdiRank: "44",
            annualPercentChange: "+0.73%",
            color: "#33CC33"
        },
        poland: {
            name: "Poland",
            hdi: [0.784, 0.803, 0.817, 0.826, 0.830, 0.833, 0.834],
            regionalHDI:[0.665, 0.700, 0.716, 0.726, 0.733, 0.735, 0.738],
            hdiRank: "34",
            annualPercentChange: "+0.48%",
            color: "#000000"
        },
        libya: {
            name: "Libya",
            hdi: [0.745, 0.772, 0.789, 0.799, 0.753, 0.789, 0.784],
            regionalHDI:[0.611, 0.644, 0.664, 0.675, 0.678, 0.681, 0.682],
            hdiRank: "50",
            annualPercentChange: "+0.40%",
            color: "#FF6600"
        },
        malaysia: {
            name: "Malaysia",
            hdi: [0.717, 0.747, 0.760, 0.766, 0.768, 0.770, 0.773],
            regionalHDI:[0.595, 0.641, 0.671, 0.688, 0.695, 0.699, 0.703],
            hdiRank: "62",
            annualPercentChange: "+0.58%",
            color: "#A319D1"
        },
        congo: {
            name: "Congo",
            hdi: [0.501, 0.525, 0.548, 0.565, 0.549, 0.561, 0.564],
            regionalHDI:[0.421, 0.452, 0.477, 0.488, 0.495, 0.499, 0.502],
            hdiRank: "140",
            annualPercentChange: "+0.92%",
            color: "#33CCCC"
        }
    };

    //Globals

    // Used throughout js to loop through rawData object
    var allCountryIds = Object.keys(rawData);
    var totalNumOfCoutries = allCountryIds.length;*/

    // Used for table display options
    // dataIndex corrisponds to data for a given year, initial is 2013
    // trailingDigitsToBeDisplayed is num of digits after decimal to be displayed
    var dataIndex = 6;
    var trailingDigitsToBeDisplayed = 3;

    // Initial Chart Data
    var chartDisplayData = [{
        name: 'United States',
        data: [0.883, 0.897, 0.905, 0.908, 0.911, 0.912, 0.914],
        color: "#0099FF"
    }];
    var chartCategories = [2000, 2005, 2008, 2010, 2011, 2012, 2013];
    // Initial Table Data
    var tableData = {
        unitedStates: {
            name: "United States",
            hdi: [0.883, 0.897, 0.905, 0.908, 0.911, 0.912, 0.914],
            regionalHDI:[0.875, 0.895, 0.901, 0.902, 0.906, 0.907, 0.908],
            hdiRank: "5",
            annualPercentChange: "+0.26%"
        },
        cuba: {
            name: "Cuba",
            hdi: [0.742, 0.786, 0.830, 0.824, 0.819, 0.813, 0.815],
            regionalHDI:[0.683, 0.705, 0.726, 0.734, 0.737, 0.739, 0.740],
            hdiRank: "44",
            annualPercentChange: "+0.73%"
        },
        poland: {
            name: "Poland",
            hdi: [0.784, 0.803, 0.817, 0.826, 0.830, 0.833, 0.834],
            regionalHDI:[0.665, 0.700, 0.716, 0.726, 0.733, 0.735, 0.738],
            hdiRank: "34",
            annualPercentChange: "+0.48%"
        },
        libya: {
            name: "Libya",
            hdi: [0.745, 0.772, 0.789, 0.799, 0.753, 0.789, 0.784],
            regionalHDI:[0.611, 0.644, 0.664, 0.675, 0.678, 0.681, 0.682],
            hdiRank: "50",
            annualPercentChange: "+0.40%"
        },
        malaysia: {
            name: "Malaysia",
            hdi: [0.717, 0.747, 0.760, 0.766, 0.768, 0.770, 0.773],
            regionalHDI:[0.595, 0.641, 0.671, 0.688, 0.695, 0.699, 0.703],
            hdiRank: "62",
            annualPercentChange: "+0.58%"
        },
        congo: {
            name: "Congo",
            hdi: [0.501, 0.525, 0.548, 0.565, 0.549, 0.561, 0.564],
            regionalHDI:[0.421, 0.452, 0.477, 0.488, 0.495, 0.499, 0.502],
            hdiRank: "140",
            annualPercentChange: "+0.92%"
        }
    };

    // Used throughout js to loop through displayData objects
    var displayCountryIds = Object.keys(tableData);
    var numOfDisplayCountries = displayCountryIds.length;

    // Selector options
    var singleSelectOptions = [
        {value:6 , label: "2013"},
        {value:5 , label: "2012"},
        {value:4 , label: "2011"},
        {value:3 , label: "2010"},
        {value:2 , label: "2008"},
        {value:1 , label: "2005"},
        {value:0 , label: "2000"}
    ];
    var multiSelectOptions =  [
        {value:"unitedStates", label:"United States"},
        {value:"cuba", label:"Cuba"},
        {value:"poland", label:"Poland"},
        {value:"libya", label:"Libya"},
        {value:"malaysia", label:"Malaysia"},
        {value:"congo", label:"Congo"}
    ];
    // Initial selection for multi select
    //var multiSelectDefault = "unitedStates";
    var multiSelectDefault = multiSelectOptions[0]; // United States
    //used to track last selected option
    var lastSelected = multiSelectDefault;
    var selectedCountries = [
        multiSelectOptions[0]
    ];

    /*
        Charting Components, currently just the one, and relevant methods
    */

    // $('#lineChart').highcharts({
    //     title: {
    //         text: null,
    //     },
    //     chart: {
    //         backgroundColor: "#FCFCFF",
    //         renderTo: $('#lineChart')
    //     },
    //     xAxis: {
    //         categories: chartCategories
    //     },
    //     yAxis: {
    //         title: {
    //             text: ''
    //         },
    //         plotLines: [{
    //             value: 0,
    //             width: 1,
    //             color: '#808080'
    //         }]
    //     },
    //     tooltip: {
    //         valueSuffix: ''
    //     },
    //     legend: {
    //         layout: 'vertical',
    //         align: 'right',
    //         verticalAlign: 'middle',
    //         borderWidth: 0
    //     },
    //     series: chartDisplayData
    // });
    // Updates global chart data structure
    // function updateChartData(data){
    //     updatedData = []
    //     for(var i=0; i<numOfDisplayCountries; i++){
    //         var ref = displayCountryIds[i];
    //         updatedData.push(
    //             {name: data[ref].name, data: data[ref].hdi, color: data[ref].color}
    //         );
    //     }
    //     chartDisplayData = updatedData;
    // }
    // // Updates chart and redraws
    // function updateChart() {
    //     var chart = $('#lineChart').highcharts();
    //     clearChart(chart);
    //     for(var i=0; i<numOfDisplayCountries; i++){
    //         var shouldRedraw = false;
    //         if(i === numOfDisplayCountries-1){
    //             shouldRedraw = true
    //         }
    //         var ref = displayCountryIds[i];
    //         chart.addSeries(
    //             chartDisplayData[i],
    //             shouldRedraw);
    //     }
    // }
    // // Removes old chart data
    // function clearChart(chart){
    //     while(chart.series.length > 0){
    //         chart.series[0].remove(true);
    //     }
    // }

    /*
        Content class
    */

    var WrapperComponent = React.createClass({
        render: function () {
            return(
                <section>
                    <PageHeader />
                    <PrimaryContent
                        singleSelectOptions={this.props.singleSelectOptions}
                        multiSelectOptions={this.props.multiSelectOptions}
                        tableData={this.props.tableData}
                        numOfRows={this.props.numOfRows}
                        countryIds={this.props.countryIds}
                        dataIndex={this.props.dataIndex}
                        lastSelected={this.props.lastSelected}
                        multiSelectDefault={this.props.multiSelectDefault}
                        selectedCountries={this.props.selectedCountries} />
                    <Pagefooter />
                </section>
            );
        }

    });

    var PageHeader = React.createClass({
        render: function () {
            var headerLine1 = "Welcome to Team Data\'s Human Development Comparator v 0.5";
            var headerLine2 = "This site is a work in progress, pardon our dust";
            return (
                <header id="header">
                    <h1>{headerLine1}</h1>
                    <SubHeader subHeader={headerLine2} />
                </header>
            );
        }

    });

    var Pagefooter = React.createClass({
        render: function () {
            return (
                <footer id="footer">
                {/* TODO update to be react class versus static content*/}
                    <nav className="bottom-nav">
                      <a href="#top">Home</a>
                      <a href="additionalPages/aboutUsPage.html">About us</a>
                      <a href="additionalPages/citiationPage.html">Citations</a>
                    </nav>
                </footer>
            );
        }
    });

    var PrimaryContent = React.createClass({
        handleChangeYear: function (data) {
            this.setState({dataIndex: data.dataIndex});
        },
        handleMultiSelectChange: function (data) { // data contains the list of selected countries
            this.setState({selectedCountries: data.selectedCountries});
            this.setState({lastSelected: data.lastSelected});
        },
        getInitialState: function () {
            return {
                tableData: this.props.tableData,
                numOfRows: this.props.numOfRows,
                countryIds: this.props.countryIds,
                dataIndex: this.props.dataIndex,
                selectedCountries: this.props.selectedCountries,
                lastSelected: this.props.lastSelected
            };
        },
        render: function () {
            var hdiSubHeader = "Human Development Index Over Time";
            var hdiHelpText1 = "At least one country must be selected at all times";
            var hdiHelpText2 = "The Human Development Index (HDI) is a composite index measuring average of the three basic metrics of human development: life expectancy, education rate, and average standard of living.";
            var hdiInfoLink = "http://hdr.undp.org/en";
            return (
                <section id="content">
                    <HDISectionHeading
                        subHeader={hdiSubHeader}
                        helpText={hdiHelpText1}
                        onMultiSelectChange={this.handleMultiSelectChange}
                        multiSelectOptions={this.props.multiSelectOptions} />
                    {
                        /* TODO
                        <lineChart chartData={this.props.chartData} />
                        */
                    /*
                    <Chart
                      title={title}
                      width={width}
                      height={height}
                      margins= {margins}
                      >
                      <LineChart
                        margins= {margins}
                        title={title}
                        data={chartData}
                        width={width}
                        height={height}
                        chartSeries={chartSeries}
                        x={x}
                        xScale={xScale}
                      />
                    </Chart>
                    */
                    }
                    <HelpText
                        helpText={hdiHelpText2}
                        externalLink={hdiInfoLink} />

                    <section className="selector-left">
                        <SingleSelect
                            singleSelectOptions={this.props.singleSelectOptions}
                            onChangeYear={this.handleChangeYear} />
                    </section>

                    <HDITable
                        tableData={this.state.tableData}
                        numOfRows={this.state.numOfRows}
                        countryIds={this.state.countryIds}
                        dataIndex={this.state.dataIndex}
                        lastSelected={this.state.lastSelected}
                        selectedCountries={this.state.selectedCountries} />
                </section>
            );
        }
    });

    var HDISectionHeading = React.createClass({
        handleMultiSelectChange: function (data) {
            this.props.onMultiSelectChange(data);
        },
        render: function () {
            return (
                <section className="section-title">
                    <SubHeader subHeader={this.props.subHeader} />
                    <HelpText helpText={this.props.helpText} />
                    <section className="selector-left">
                        <MultiSelector
                            multiSelectOptions={this.props.multiSelectOptions}
                            onMultiSelectChange={this.handleMultiSelectChange}
                            label="Select the countries you would like to compare:" />
                    </section>
                </section>
            );
        }

    });

    var SingleSelect = React.createClass({
        displayName: 'SingleSelect',
    	propTypes: {
    		label: React.PropTypes.string,
    	},
    	getDefaultProps () {
    		return {
                label: 'Select a year for a more in depth look:',
    		};
    	},
        getInitialState () {
    		return {
    			disabled: false,
                options: this.props.singleSelectOptions,
                value: this.props.singleSelectOptions[0] // year 2013
    		};
    	},
        updateValue (newValue) {
    		console.log('State changed to ' + newValue);
    		this.setState({
    			value: newValue
    		});
            this.props.onChangeYear({dataIndex: newValue});
    	},
        render () {
            return (
                <div className="section">
    				<h3 className="section-heading">{this.props.label}</h3>
                    <ReactSelect
                        simpleValue
                        disabled={this.state.disabled}
                        name="selected-year"
                        options={this.state.options}
                        value={this.state.value}
                        onChange={this.updateValue} />
                </div>
            );
        }
    });

    var MultiSelector = React.createClass({
        displayName: 'MultiSelector',
        propTypes: {
            label: React.PropTypes.string,
    	},

        getInitialState () {
    		return {
                disabled: false,
                options: this.props.multiSelectOptions,
    			value: [this.props.multiSelectOptions[0]], // United States is default
    		};
    	},

        handleMultiSelectChange (value, values) {
    		// console.log('New value:', value, 'Values:', values);
            if (value.length == 0) {
                // this ensures the field will always have one selected item
                value = this.props.multiSelectOptions[0];
                values.push(value);
            }
    		this.setState({
                value: value
            });
            // changes properties state in the parent (PrimaryContent) to update the table (HDITable)
            this.props.onMultiSelectChange({
                selectedCountries: values,
                lastSelected: values[values.length - 1]
            });
    	},

        render () {
    		return (
                <div className="section">
                    <h3 className="section-heading">{this.props.label}</h3>
                    <ReactSelect
                        multi
                        simpleValue
                        disabled={this.state.disabled}
                        value={this.state.value}
                        placeholder="Select country(s)"
                        options={this.state.options}
                        onChange={this.handleMultiSelectChange} />
                </div>
    		);
    	}
    });

    var SubHeader = React.createClass({
        render: function () {
            return (
                <h2>{this.props.subHeader}</h2>
            );
        }

    });

    var HelpText = React.createClass({
        render: function() {
            var helpText = this.props.helpText;
            if (this.props.externalLink) {
                return(
                    <section className="help-text">
                        <DocumentText text={helpText} />
                        <HelpTextLink href={this.props.externalLink} />
                    </section>
                );
            }
            else{
                return(
                    <section className="help-text">
                        <DocumentText text={helpText} />
                    </section>
                );
            }
        }
    });

    var DocumentText = React.createClass({
        render: function() {
            return (
                <p>
                    {this.props.text}
                </p>
            );
        }
    });

    var HelpTextLink = React.createClass({
        render: function() {
            return (
                <a target={'_blank'} href={this.props.href}>More Detail</a>
                );
        }
    });

    /*
        Table and relevant methods
    */
    var TableCell = React.createClass({
        render: function() {
            var data = this.props.cellData;
            var dataIndex = this.props.dataIndex;
            if (_.isArray(data)){
                var displayData = data[dataIndex];
            }
            else {
                var displayData = data;
            }
            return (
                <td>{displayData}</td>
            );
        }
    });
    var TableRow = React.createClass({
        render: function () {
            var data = this.props.rowData;
            var dataKeys = Object.keys(data);
            var numOfCells = dataKeys.length;
            var cells = [];
            for (var i=0; i<numOfCells; i++){
                var ref = dataKeys[i];
                var cellID = data['name']+"-"+data[ref];
                cells.push(<TableCell key={cellID} dataIndex={this.props.dataIndex} cellData={data[ref]} />);
            }
            return(
                <tr>{cells}</tr>
            );
        }
    });
    var TableHeaderRow = React.createClass({
        render: function() {
            return (
                <tr className="row header-row"><td></td><td className="header">HDI</td><td className="header">Regional HDI</td><td className="header">HDI Rank</td><td className="header">Avg Annual Change</td></tr>
            );
        }
    });
    var HDITable = React.createClass({
        render: function () {
            var data = this.props.tableData;
            var numOfRows = this.props.numOfRows;
            var countryIds = this.props.countryIds;
            var dataIndex = this.props.dataIndex;
            var numSelectedCountries = this.props.selectedCountries.length;
            var rows = [];

            rows.push(<TableHeaderRow key={"Header"} />);
            /*for (var i=0; i<numOfRows; i++) {
                var rowID=countryIds[i];
                rows.push(<TableRow key={rowID} rowData={data[rowID]} dataIndex={dataIndex} />);
            }*/
            for (var i=0; i<numSelectedCountries; i++) {
                var rowID = this.props.selectedCountries[i].value;
                if (data[rowID] !== undefined) { // if the selected item exists in the list tableData
                    rows.push(<TableRow key={rowID} rowData={data[rowID]} dataIndex={dataIndex} />);
                }
            }

            return(
                <section className="table-align-left">
                    <section className="data-table">
                        <table className="table"><tbody>{rows}</tbody></table>
                    </section>
                </section>
            );
        }
    });

    ReactDOM.render(
        <WrapperComponent
            singleSelectOptions={singleSelectOptions}
            multiSelectOptions={multiSelectOptions}
            tableData={tableData}
            numOfRows={numOfDisplayCountries}
            countryIds={displayCountryIds}
            dataIndex={dataIndex}
            lastSelected={lastSelected}
            multiSelectDefault={multiSelectDefault}
            selectedCountries={selectedCountries} />,
        document.getElementById('wrapper')
    );

    /*
        Selectors
    */
    // Set up Select2
    // https://select2.github.io/examples.html
    // $('#selector').select2({
    //     minimumResultsForSearch: 10,
    //     data: singleSelectOptions
    // });
    // // Eet event for #selector
    // var $eventLog = $(".example-log");
    // var $eventSelect = $("#selector");
    // // Declare what method to call when event is detected
    // $eventSelect.on("select2:select", function (e) { selectData(e); });
    // // When item selected update the data displayed in the table
    // // Done on cell by cell basis
    // function selectData (evt) {
    //     var id = evt.params.data.id;
    //     if (id >= 0) {
    //         // Update global for selected data persistance
    //         dataIndex = id;
    //         for (var i=0; i<numOfDisplayCountries; i++){
    //             var ref = displayCountryIds[i];
    //             var dHDI = tableData[ref].hdi[id].toFixed(trailingDigitsToBeDisplayed);
    //             var regionalHDI = tableData[ref].regionalHDI[id].toFixed(trailingDigitsToBeDisplayed);
    //             var $hdiCell = $("td[metric-id='"+ref+"HDI"+"']");
    //             var $regionalHDICell = $("td[metric-id='"+ref+"RegionalHDI"+"']");
    //             updateCellContent($hdiCell, dHDI);
    //             updateCellContent($regionalHDICell, regionalHDI);
    //         }
    //     }
    // }

    // // Multiple selector
    // $('#multi-selector').select2({
    //     placeholder: "Select Countries to Compare",
    //     minimumResultsForSearch: 10,
    //     multiple: true,
    //     data: multiSelectOptions

    // });
    // // Set initial selection
    // $('#multi-selector').select2().select2('val', multiSelectDefault);
    // // When selection changes determine if valid selection remains
    // // If not go back to previous selection
    // $('#multi-selector').change(function () {
    //     var selected = $('#multi-selector').select2('data')
    //     if(isValidSelection(selected)){
    //         lastSelected = selected[0].id;
    //         updateContent(selected);
    //     }
    //     else {
    //        $('#multi-selector').select2().select2('val', lastSelected);
    //     }
    // });
    // // Checks if at least one item is selected
    // function isValidSelection(selected){
    //     var len = selected.length;
    //     if(len > 0){
    //         return true
    //     }
    //     else {
    //         return false;
    //     }
    // }
    // // Updates page content based on selected items
    // function updateContent (selected) {
    //     var dataToDisplay = {};
    //     var selectedLength = selected.length;
    //     for(var i=0; i<selectedLength; i++){
    //         dataToDisplay[selected[i].id] = rawData[selected[i].id]
    //     }
    //     // Update globals
    //     displayCountryIds = Object.keys(dataToDisplay);
    //     numOfDisplayCountries = displayCountryIds.length;
    //     // Update data structures
    //     updateChartData(dataToDisplay);
    //     updateTableData(dataToDisplay);
    //     // Update DOM elements
    //     updateChart();
    //     updateTable();
    // }
// });
