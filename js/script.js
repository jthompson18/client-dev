$(function () {
    var chartData = [{
        name: 'United States',
        data: [0.883, 0.897, 0.905, 0.908, 0.911, 0.912, 0.914]
    }, {
        name: 'Cuba',
        data: [0.742, 0.786, 0.830, 0.824, 0.819, 0.813, 0.815]
    }, {
        name: 'Poland',
        data: [0.784, 0.803, 0.817, 0.826, 0.830, 0.833, 0.834]
    }, {
        name: 'Libya',
        data: [0.745, 0.772, 0.789, 0.799, 0.753, 0.789, 0.784]
    },{
        name: 'Malaysia',
        data: [0.717, 0.747, 0.760, 0.766, 0.768, 0.770, 0.773]
    },{
        name: 'Congo',
        data: [0.501, 0.525, 0.548, 0.565, 0.549, 0.561, 0.564]
    }];

    //regional HDO for US calculated as (US+CAN)/2
    //no North American Region defined in data
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

    var countryIds = Object.keys(tableData);
    var numOfCountries = countryIds.length;

    $('#container').highcharts({
        title: {
            text: null,
        },
        chart: {
            backgroundColor: "#FCFCFF",
            borderColor: "#D9DCDF"
        },
        xAxis: {
            categories: [2000, 2005, 2008, 2010, 2011, 2012, 2013]
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
        series: chartData
    });

    // dynamically create table based on data
    var htmlTable = '<table class="table"><tr class="row header-row"><td></td><td class="header">HDI</td><td class="header">Regional HDI</td><td class="header">HDI Rank</td><td class="header">Avg Annual Change</td></tr>';
    // "6" is hard coded for now, update to dynamically get last item in list of metrics
    var dataDefaultIndex = 6;
    var trailingDigitsToBeDisplayed = 3;
    for (var i=0; i<numOfCountries; i++) {
        var ref = countryIds[i];
        var numOfCells = Object.keys(tableData[ref]).length
        var name = tableData[ref].name;
        var dHDI = tableData[ref].hdi[dataDefaultIndex].toFixed(trailingDigitsToBeDisplayed);
        var regionalHDI = tableData[ref].regionalHDI[dataDefaultIndex].toFixed(trailingDigitsToBeDisplayed);
        var rank = tableData[ref].hdiRank;
        var percentChange = tableData[ref].annualPercentChange;
        htmlTable += "<tr><td>"+ name +"</td><td metric-id="+ref+"HDI"+">"+ dHDI +"</td><td metric-id="+ref+"RegionalHDI"+">"+ regionalHDI +"</td><td>"+ rank +"</td><td>"+ percentChange +"</td></tr>";
    }
    htmlTable += "</table>"
    $(htmlTable).appendTo('#dataTable');

    // Set up Select2
    // https://select2.github.io/examples.html
    $('#selector').select2({
        placeholder: "Select an option",
        minimumResultsForSearch: 10
    });
    
    // set event for select
    var $eventLog = $(".example-log");
    var $eventSelect = $("#selector");

    $eventSelect.on("select2:select", function (e) { selectData(e); });  

    function selectData (evt) {
        var id = evt.params.data.id;
        if (id >= 0) {
            for (var i=0; i<numOfCountries; i++){
                var ref = countryIds[i];
                var dHDI = tableData[ref].hdi[id];
                var regionalHDI = tableData[ref].regionalHDI[id];
                var $hdiCell = $("td[metric-id='"+ref+"HDI"+"']");
                var $regionalHDICell = $("td[metric-id='"+ref+"RegionalHDI"+"']");
                updateCellContent($hdiCell, dHDI);
                updateCellContent($regionalHDICell, regionalHDI);
            }
        }
    }
    function updateCellContent($cell, newContent) {
        $cell.html("");
        $cell.html(newContent);
    }

});
