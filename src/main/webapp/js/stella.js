jQuery(function() {
  var stellaMetric = function(name) {
    var value  = 0,
        values = [],
        i      = 0,
        last;

    return context.metric(function(start, stop, step, callback) {
      start = +start, stop = +stop;
      if (isNaN(last)) { last = start; }

      while (last < stop) {
        last += step;
        value = Math.max(-10, Math.min(10, value + .8 * Math.random() - .4 + .2 * Math.cos(i += 2)));
        values.push(value);
      }
      callback(null, values = values.slice((start - stop) / step));
    }, name);
  }

  var context = cubism.context()
      .serverDelay(0)
      .clientDelay(0)
      .step(1e3)
      .size(700);

  var foo = stellaMetric("foo"),
      bar = stellaMetric("bar");

  d3.select("#graph").call(function(div) {
    div.append("div")
      .attr("class", "axis")
      .call(context.axis().orient("top"));

    div.selectAll(".horizon")
      .data([foo, bar, foo.add(bar), foo.subtract(bar)])
      .enter().append("div")
        .attr("class", "horizon")
        .call(context.horizon().extent([-20, 20]));

    div.append("div")
      .attr("class", "rule")
      .call(context.rule());
  });

  context.on("focus", function(i) {
    d3.selectAll(".value").style("right", i == null ? null : context.size() - i + "px");
  });
});

