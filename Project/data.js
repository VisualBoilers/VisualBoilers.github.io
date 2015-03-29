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



var countries = "#AM, #AU, #AT, #AZ, #BE, #CL, #CN, #CZ, #DK, #GB, #FI, #GE, #DE, #HU, #IR, #IE, #IT, #JP, #KZ, #KP, #KW, #LT, #MA, #NL, #NZ, #NO, #OM, #PL, #PT, #QA, #RO, #RU, #SA, #RS, #SK, #SI, #ES, #SE, #TH, #TN, #TR, #AE, #US, #YE";
d3.selectAll(countries)
.data([0.35, 0.62, 0.27, 0.27, 0.62, 1, 0.59, 0.23, 0.37, 0.55, 0.22, 0.17, 0.37, 0.19, 0.13, 0.35, 0.75, 0.42, 0.22, 0.24, 0.48, 0, 0.68, 0.73, 0.48, 0.29, 0.60, 0.20, 0.50, 0.72, 0.25, 0.02, 0.57, 0.22, 0.23, 0.06, 0.41, 0.35, 0.95, 0.54, 0.43, 0.65, 0.74, 0.31])
.style("fill", "blue")
.style("opacity", function(d){return d;})
.on("click",function(){
  return clk(this);
});
