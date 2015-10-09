$(function () {
    $('#container').highcharts({
        title: {
            text: 'Annual Average Rates',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: http://hdr.undp.org/en/content/table-2-human-development-index-trends-1980-2013',
            x: -20
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
        series: [{
            name: 'United States',
            data: [0.883, 0.897, 0.905, 0.908, 0.911, 0.912, 0.914]
        }, {
            name: 'Cuba',
            data: [0.742, 0.786, 0.830, 0.824, 0.819, 0.813, 0.815]
        }, {
            name: 'Poland',
            data: [0.784, 0.803, 0.817,	0.826, 0.830, 0.833, 0.834]
        }, {
            name: 'Libya',
            data: [0.745, 0.772, 0.789, 0.799, 0.753, 0.789, 0.784]
        },{
            name: 'Malaysia',
            data: [0.717, 0.747, 0.760, 0.766, 0.768, 0.770, 0.773]
        },{
            name: 'Congo',
            data: [0.501, 0.525, 0.548, 0.565, 0.549, 0.561, 0.564]
        }]
    });
});
