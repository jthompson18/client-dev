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
    var tableData = [{
        name: 'United States',
        HDI: [0.883, 0.897, 0.905, 0.908, 0.911, 0.912, 0.914],
        regionalHDI:[0.875, 0.895, 0.901, 0.902, 0.906, 0.907, 0.908]
    }, {
        name: 'Cuba',
        data: [0.742, 0.786, 0.830, 0.824, 0.819, 0.813, 0.815],
        regionalHDI:[0.683, 0.705, 0.726, 0.734, 0.737, 0.739, 0.740]
    }, {
        name: 'Poland',
        data: [0.784, 0.803, 0.817, 0.826, 0.830, 0.833, 0.834],
        regionalHDI:[0.665, 0.700, 0.716, 0.726, 0.733, 0.735, 0.738]
    }, {
        name: 'Libya',
        data: [0.745, 0.772, 0.789, 0.799, 0.753, 0.789, 0.784],
        regionalHDI:[0.611, 0.644, 0.664, 0.675, 0.678, 0.681, 0.682]
    },{
        name: 'Malaysia',
        data: [0.717, 0.747, 0.760, 0.766, 0.768, 0.770, 0.773],
        regionalHDI:[0.595, 0.641, 0.671, 0.688, 0.695, 0.699, 0.703]
    },{
        name: 'Congo',
        data: [0.501, 0.525, 0.548, 0.565, 0.549, 0.561, 0.564],
        regionalHDI:[0.421, 0.452, 0.477, 0.488, 0.495, 0.499, 0.502]
    }];

    $('#container').highcharts({
        title: {
            text: null,
        },
        // subtitle: {
        //     text: 'Source: http://hdr.undp.org/en/content/table-2-human-development-index-trends-1980-2013',
        //     x: -20
        // },
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

    // Set up Select2
    // https://select2.github.io/examples.html
    $('#selector').select2({
        placeholder: "Select an option",
    });
    
    // set event for select
    var $eventLog = $(".example-log");
    var $eventSelect = $("#selector");

    $eventSelect.on("select2:select", function (e) { selectData(e); });    

    function selectData (evt) {
        var id = evt.params.data.id;
        if (id >= 0) {
            var $e = $("<li>" + JSON.stringify(chartData[id]) + "</li>");
            $eventLog.append($e);
            $e.animate({ opacity: 1 }, 2000, 'linear', function () {
                $e.animate({ opacity: 0 }, 2000, 'linear', function () {
                    $e.remove();
                });
            });
        }
    }

});
