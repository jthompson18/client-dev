define([
    'jquery',
    'select2',
    'Highcharts',
    ], 
    function($, select2, highcharts) {
        /*
            Data Set used for website
        */
        var rawData = {
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

        /*Globals*/

        // Used throughout js to loop through rawData object
        var allCountryIds = Object.keys(rawData);
        var totalNumOfCoutries = allCountryIds.length;

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
        };

        // Used throughout js to loop through displayData objects
        var displayCountryIds = Object.keys(tableData);
        var numOfDisplayCountries = displayCountryIds.length;

        // Selector options
        var singleSelectOptions = [
            {id:6 , text: "2013"},
            {id:5 , text: "2012"},
            {id:4 , text: "2011"},
            {id:3 , text: "2010"},
            {id:2 , text: "2008"},
            {id:1 , text: "2005"},
            {id:0 , text: "2000"}
        ];
        var multiSelectOptions =  [
            {id:"unitedStates", text:"United States"},
            {id:"cuba", text:"Cuba"},
            {id:"poland", text:"Poland"},
            {id:"libya", text:"Libya"},
            {id:"malaysia", text:"Malaysia"},
            {id:"congo", text:"Congo"}
        ];
        // Initial selection for multi select
        var multiSelectDefault = "unitedStates";
        //used to track last selected option
        var lastSelected = multiSelectDefault

        /*
            Charting Components, currently just the one, and relevant methods
        */
        $('#lineChart').highcharts({
            title: {
                text: null,
            },
            chart: {
                backgroundColor: "#FCFCFF"
            },
            xAxis: {
                categories: chartCategories
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: chartDisplayData
        });
        // Updates global chart data structure
        function updateChartData(data){
            updatedData = []
            for(var i=0; i<numOfDisplayCountries; i++){
                var ref = displayCountryIds[i];
                updatedData.push(
                    {name: data[ref].name, data: data[ref].hdi, color: data[ref].color}
                );
            }
            chartDisplayData = updatedData;
        }
        // Updates chart and redraws
        function updateChart() {
            var chart = $('#lineChart').highcharts();
            clearChart(chart);
            for(var i=0; i<numOfDisplayCountries; i++){
                var shouldRedraw = false;
                if(i === numOfDisplayCountries-1){
                    shouldRedraw = true
                }
                var ref = displayCountryIds[i];
                chart.addSeries(
                    chartDisplayData[i],
                    shouldRedraw);
            }
        }
        // Removes old chart data
        function clearChart(chart){
            while(chart.series.length > 0){
                chart.series[0].remove(true);
            }
        }

        /*
            Table and relevant methods
        */
        $(document).ready(function() {
            // Dynamically create table based on data after page load
            updateTable(tableData);
        });
        // Update tableData Global var
        function updateTableData(data){
            tableData = data;
        }
        function updateTable(shouldClearTable){
            var $table = $('#dataTable');
            if ($table.length > 0){
                clearTable($table);
            }
            // Creates table dynamically based on tableData 
            var htmlTable = '<table class="table"><tr class="row header-row"><td></td><td class="header">HDI</td><td class="header">Regional HDI</td><td class="header">HDI Rank</td><td class="header">Avg Annual Change</td></tr>';
            for (var i=0; i<numOfDisplayCountries; i++) {
                var ref = displayCountryIds[i];
                var numOfCells = Object.keys(tableData[ref]).length
                var name = tableData[ref].name;
                var dHDI = tableData[ref].hdi[dataIndex].toFixed(trailingDigitsToBeDisplayed);
                var regionalHDI = tableData[ref].regionalHDI[dataIndex].toFixed(trailingDigitsToBeDisplayed);
                var rank = tableData[ref].hdiRank;
                var percentChange = tableData[ref].annualPercentChange;
                htmlTable += "<tr><td>"+ name +"</td><td metric-id="+ref+"HDI"+">"+ dHDI +"</td><td metric-id="+ref+"RegionalHDI"+">"+ regionalHDI +"</td><td>"+ rank +"</td><td>"+ percentChange +"</td></tr>";
            }
            htmlTable += "</table>"
            $(htmlTable).appendTo($table);
        }
        function clearTable($table){
            //clears table content
            $table.html("");
        }
        function updateCellContent($cell, newContent) {
            $cell.html("");
            $cell.html(newContent);
        }

        /*
            Selectors
        */
        // Set up Select2
        // https://select2.github.io/examples.html
        $('#selector').select2({
            minimumResultsForSearch: 10,
            data: singleSelectOptions
        });
        // Eet event for #selector
        var $eventLog = $(".example-log");
        var $eventSelect = $("#selector");
        // Declare what method to call when event is detected
        $eventSelect.on("select2:select", function (e) { selectData(e); });
        // When item selected update the data displayed in the table
        // Done on cell by cell basis
        function selectData (evt) {
            var id = evt.params.data.id;
            if (id >= 0) {
                // Update global for selected data persistance
                dataIndex = id;
                for (var i=0; i<numOfDisplayCountries; i++){
                    var ref = displayCountryIds[i];
                    var dHDI = tableData[ref].hdi[id].toFixed(trailingDigitsToBeDisplayed);
                    var regionalHDI = tableData[ref].regionalHDI[id].toFixed(trailingDigitsToBeDisplayed);
                    var $hdiCell = $("td[metric-id='"+ref+"HDI"+"']");
                    var $regionalHDICell = $("td[metric-id='"+ref+"RegionalHDI"+"']");
                    updateCellContent($hdiCell, dHDI);
                    updateCellContent($regionalHDICell, regionalHDI);
                }
            }
        }

        // Multiple selector
        $('#multi-selector').select2({
            placeholder: "Select Countries to Compare",
            minimumResultsForSearch: 10,
            multiple: true,
            data: multiSelectOptions

        });
        // Set initial selection
        $('#multi-selector').select2().select2('val', multiSelectDefault);
        // When selection changes determine if valid selection remains
        // If not go back to previous selection
        $('#multi-selector').change(function () {
            var selected = $('#multi-selector').select2('data')
            if(isValidSelection(selected)){
                lastSelected = selected[0].id;
                updateContent(selected);
            }
            else {
               $('#multi-selector').select2().select2('val', lastSelected); 
            }
        });
        // Checks if at least one item is selected
        function isValidSelection(selected){
            var len = selected.length;
            if(len > 0){
                return true
            }
            else {
                return false;
            }
        }
        // Updates page content based on selected items
        function updateContent (selected) {
            var dataToDisplay = {};
            var selectedLength = selected.length;
            for(var i=0; i<selectedLength; i++){
                dataToDisplay[selected[i].id] = rawData[selected[i].id]
            }
            // Update globals
            displayCountryIds = Object.keys(dataToDisplay);
            numOfDisplayCountries = displayCountryIds.length;
            // Update data structures
            updateChartData(dataToDisplay);
            updateTableData(dataToDisplay);
            // Update DOM elements
            updateChart();
            updateTable();
        }
});
