/* draw states on id #statesvg */
Country.draw("#countrysvg");
var data;

var clk = function(id){
  var width = 400,
      height = 400,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d[6]; });

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    data.forEach(function(d) {
      d[6] = +d[6];
    });

    var g = svg.selectAll(".arc")
        .data(pie(data[6]))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data[6]); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data[2]; });



}
d3.json("newdata.json", function(json) {

  data = json;
  var firstname = "Afghanistan";
	var amount = 0;

	data.forEach(function(d){
		if(d[2] === firstname) {
			amount = amount + d[6];
			//console.log(amount);
			//console.log(firstname);
		}
		else {
		var countries = "#"+firstname;
		d3.selectAll(countries)
		.style("fill", "blue")
		.style("opacity", amount)
		.on("click",function(){
		return clk(this);
		});
		firstname = d[2];
		amount = d[6];
}
});
});
