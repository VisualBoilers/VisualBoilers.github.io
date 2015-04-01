/* draw states on id #statesvg */
Country.draw("#countrysvg");
var data;

var clk = function(c){

  var countryarray = [];
  var year = [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014];

  data.forEach(function(d){
    if(d[2] == c.id){
      countryarray.push(d);
    }
    else{
      //break;
    }
  });

  countryarray.sort(function(a,b){
    return d3.ascending(a[0], b[0]); //
  });

  var firstyear = 2005;
  var yearamount = 0;
  var yeararray = [];
  var i = 0;

  countryarray.forEach(function(d){
    if(d[0] == firstyear){
      yearamount = yearamount + d[6];
    //  console.log(yearamount);
    }
    else{
      yeararray.push(yearamount);
      firstyear = firstyear + 1;
      while(d[0] !== firstyear){
        yeararray.push(0);
        firstyear = firstyear + 1;
      }
      yearamount = d[6];
    }

  });
  yeararray.push(yearamount);
console.log(yearamount);
console.log(yeararray);

  var w = 300;
			var h = 300;
			var outerRadius = w / 2;
			var innerRadius = 0;
			var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);

			var pie = d3.layout.pie();

			//Easy colors accessible via a 10-step ordinal scale
			var color = d3.scale.category10();

			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Set up groups
			var arcs = svg.selectAll("g.arc")
						  .data(pie(yeararray))
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

			//Draw arc paths
			arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
					//console.log(i);
			    })
			    .attr("d", arc);

			//Labels
		
			arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			   .text(function(d) {
			    	return d.value;
			   });		
			//.text(year[i]); //each time creat a piece, add the lable by increasing i?
				
		

};


d3.json("newdata.json", function(json) {

  data = json;
  var firstname = "Afghanistan";
  var amount = 0;
  var maxamount = 0
	data.forEach(function(d){
		if(d[2] === firstname) {		//summing amount by country in this if 
			amount = amount + d[6];
			//console.log(amount);
			//console.log(firstname);
		}
		else {
		var countries = "#"+firstname;
		d3.selectAll(countries)
		.style("fill", "blue")
		.style("opacity", amount) //amount
		.on("click",function(){
		return clk(this);
		});
		firstname = d[2];
		amount = d[6];
}
});
});
