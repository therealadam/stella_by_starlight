jQuery(function() {

  var stellaMetric = function(name) {
    host = "http://localhost:8080"
    return context.metric(function(start, stop, step, callback) {
      path = "/api/metrics"
        + "?start=" + d3.time.format.iso(start)
        + "&stop=" + d3.time.format.iso(stop)
        + "&step" + step;
      d3.json(host + path,
        function(data) {
          if (!data) {
            return callback(new Error("whups!"));
          }

          console.log(data);
          values = data.map(function(d) { return d.value; });
          // values = data.map(function(d) { return d.value }).slice((start - stop) / step);
          callback(null, values);
          console.log("stella", values);
        });
    }, name += "");
  };

  var randomMetric = function(name) {
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

  // var foo = randomMetric("foo"),
  //     bar = randomMetric("bar");
  var foo = randomMetric("random"),
      bar = stellaMetric("stella");

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

