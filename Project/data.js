/* draw states on id #statesvg */
Country.draw("#countrysvg");


var clk = function(id){
  var width = 400;
  var height = 400;
  var radius = Math.min(width,height) / 2;

  var color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d; });

  var svg = d3.select("#info").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var vdata = [1, 2, 3, 4, 5]

    var g = svg.selectAll(".arc")
        .data(pie(vdata))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
            .style("fill", function(d) { return color(d); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.vdata; });

}

var data1 = d3.csv(data/v1data.csv);
