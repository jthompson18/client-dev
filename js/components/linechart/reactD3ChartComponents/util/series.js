function series(props) {
  var data = props.data;
  var chartSeries = props.chartSeries;
  var x = props.x;
  var y = props.y;
  var categoricalColors = props.categoricalColors;

  categoricalColors = categoricalColors || d3.scale.category10();

  var chartSeriesData = chartSeries.map(function (f, i) {

    // set a color if not set
    f.color = f.color || categoricalColors(i);

    // set name if not set
    f.name = f.name || f.field;

    // mapping throught data set x, y data
    var mapping = data.map(function (d) {
      return {
        x: x(d),
        y: y(d[f.field]),
        color: f.color,
        name: f.name,
        field: f.field
      };
    });

    return Object.assign(f, { data: mapping });
  });

  return chartSeriesData;
}

exports.series = series;