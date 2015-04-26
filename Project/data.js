/* draw states on id #statesvg */
Country.draw("#countrysvg");
var data;
var CurrentCountry=0;
var clk = function(c){

  var countryarray = [];
  var year = [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014];
  var agency=["DOS","DoD","HHS","IAF","MCC","Peace Corps","Treasury","USADF","USAID","USDA"];
  var category=["Democracy, Human Rights, and Governance","Economic Development","Education and Social Services","Environment","Health","Humanitarian Assistance","Multi-Sector","Peace and Security","Program Management"];

  data.forEach(function(d){
    if(d[7] == c.id){
      countryarray.push(d);
    }
    else{
      //break;
    }
  });


  //console.log(sortedAgencyArray);
  var firstyear = 2005;
  var firstagency="DOS";
  var firstcat="Democracy, Human Rights, and Governance";
  var yearamount = 0;
  var agencyamount=0;
  var catamount =0;
  var yeararray = [];
  var agencyarray=[];
  var catarray = [];
  var i = 0;
  var j =0;
  var formatAmount = d3.format("$,.2f");
//---------------------------------------------------year array-------------------------------
   var sortedYearArray= countryarray.sort(function(a,b){
    return d3.ascending(a[0], b[0]);
  });

  sortedYearArray.forEach(function(d){
    if(d[0] == firstyear)
    {
      yearamount = yearamount + d[6];
    }
    else
    {
      yeararray.push(yearamount);
      firstyear = firstyear + 1;
      while(d[0] !== firstyear)
      {
        yeararray.push(0);
        firstyear = firstyear + 1;
      }
      yearamount = d[6];
    }

  });
  yeararray.push(yearamount);

  //--------------------------------------------agency array------------------------------------------------
    var sortedAgencyArray= countryarray.sort(function(a,b){
    return d3.ascending(a[1], b[1]);

  });
  console.log(sortedAgencyArray);
   sortedAgencyArray.forEach(function(d){
    if(d[1] === firstagency)
    {
      agencyamount = agencyamount + d[6];
    }
    else
    {
      agencyarray.push(agencyamount);
	  i=i+1;
	  console.log(i);
      firstagency = agency[i];
	  console.log(agency[i]);
	  console.log(firstagency);
	  console.log(d[1]);
      while(d[1] !== firstagency)
      {
        agencyarray.push(0);
       // firstyear = firstyear + 1;
	   i=i+1;
	   agency[i];
	   firstagency = agency[i];
      }
	  console.log(agencyarray);
      agencyamount = d[6];
    }

  });
  agencyarray.push(agencyamount);
 //--------------------------------------------category array------------------------------------------------
    var sortedCategoryArray= countryarray.sort(function(a,b){
    return d3.ascending(a[4], b[4]);
  });

   sortedCategoryArray.forEach(function(d){
    if(d[4] === firstcat)
    {
      catamount = catamount + d[6];
    }
    else
    {
      catarray.push(catamount);
	  j=j+1;
      firstcat = category[j];
	 // console.log(category[j]);
	  //console.log(firstcat);
	  //console.log(d[4]);
	  //console.log(i);
      while(d[4] !== firstcat)
      {
        catarray.push(0);
       // firstyear = firstyear + 1;
	   j=j+1;
	   category[j];
	   firstcat = category[j];
      }
	  //console.log(agencyarray);
      catamount = d[6];
    }

  });
  catarray.push(catamount);
  //-------------------------------------------total number--------------------------

   var w = 240;
			var h = 240;
  var svg = d3.select("#info")
						.append("g")
						.attr("width", w)
						.attr("height", h/3);
	 svg.append("text")
			   .attr("x", w/2)
			   .attr("y", 0)
			   .attr("text-anchor", "middle")
			   .style("font-size", "24px")
			   .text("Total Amount: "+formatAmount(d3.sum(yeararray),2))
//----------------------------------agency pie--------------------------------------------------------------------------------------
/*  var w = 240;
			var h = 240;
			var outerRadius = w / 2;
			var innerRadius = 0;
			var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);

			var pie = d3.layout.pie();

			//Easy colors accessible via a 10-step ordinal scale
			var color = d3.scale.category20b();

			//Create SVG element
			var svg = d3.select("#info")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Set up groups
			var arcs = svg.selectAll("g.arc")
						  .data(pie(agencyarray))//*******************************************************************************
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

			//d3.selectAll("svg").exit().remove();
      //Draw arc paths
						arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc)
				.attr("xxx",agency[i])

			.on("mouseover",function(d,z){
				d3.select(this)
				.append("svg:title")
				.style("font-size","30px")
				.text(function(i){

					console.log(z);
					return agency[z]+" "+"amount is "+formatAmount(agencyarray[z]);


				       					});
				})
				.on("mouseout",function(d){});


			//Labels

		/*	arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			   .text(function(d, i) {
			    	return sector[i];//*******************************************************************************************
			   });*/
			//.text(year[i]); //each time creat a piece, add the lable by increasing i?
//--------------------------------------text&border------------------------------------------------------------------------------------
/*var circleData=[];
var svg = d3.select("#info")
						.append("svg")
						.attr("width", w)
						.attr("height", 1.7*h);
var text = svg.selectAll("text")
                       .data(circleData)
                        .enter()
                      .append("text");
var textLabels = text
                 .attr("x", w/2)
                 .attr("y", 1.5*h)
                 .text( "more more more")
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "20px")
                 .attr("fill", "red");
				*/


			//Labels

		/*	arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			   .text(function(d, i) {
			    	return agency[i];//*******************************************************************************************
			   });*/

		/*	   svg.append("text")
			   .attr("x", w/2)
			   .attr("y", 0)
			   .attr("text-anchor", "middle")
			   .style("font-size", "24px")
			   .text("$"+d3.round(d3.sum(yeararray),2))
			//.text(year[i]); //each time creat a piece, add the lable by increasing i?*/

/*//---------------------------------year pie--------------------------------------------------------------------------------------------
  var w = 240;
			var h = 240;
			var outerRadius = w / 2;
			var innerRadius = 0;
			var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);

			var pie = d3.layout.pie();

			//Easy colors accessible via a 10-step ordinal scale
			var color = d3.scale.category20c();

			//Create SVG element
			var svg = d3.select("#info")
						.append("svg")
						.attr("width", w)
						.attr("height", h)
						  .attr("transform","translate(1500,100)");
						// .attr("x", (4*w / 5))
           				// .attr("y",h);

			//Set up groups
			var arcs = svg.selectAll("g.arc")
						  .data(pie(yeararray))//*******************************************************************************
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

			//d3.selectAll("svg").exit().remove();
      //Draw arc paths
			arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc);

			//Labels

			arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			   .text(function(d, i) {
			    	return year[i];//*******************************************************************************************
			   });
			//.text(year[i]); //each time creat a piece, add the lable by increasing i?*/

//-----------------------------category pie--------------------------------------
  var w = 240;
			var h = 240;
			var outerRadius = w / 2;
			var innerRadius = 0;
			var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);

			var pie = d3.layout.pie();

			//Easy colors accessible via a 10-step ordinal scale
			var color = d3.scale.category10();

			//Create SVG element
			var svg = d3.select("#info")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Set up groups
			var arcs = svg.selectAll("g.arc")
						  .data(pie(catarray))//*******************************************************************************
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

			//d3.selectAll("svg").exit().remove();
      //Draw arc paths
						arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc)
				.attr("xxx",category[i])

			.on("mouseover",function(d,z){
				d3.select(this)
				.append("svg:title")
				.style("font-size","30px")
				.text(function(i){

					console.log(z);
					return category[z]+" "+"amount is "+formatAmount(catarray[z]);


				       					});
				})
				.on("mouseout",function(d){});



//--------------------------------------text&border------------------------------------------------------------------------------------
var circleData=[];
var svg = d3.select("#info")
						.append("svg")
						.attr("width", w)
						.attr("height", 1.6*h);
var text = svg.selectAll("text")
                       .data(circleData)
                        .enter()
                      .append("text");
var textLabels = text
                 .attr("x", w/2)
                 .attr("y", 1.5*h)
                 .text( "more more more")
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "20px")
                 .attr("fill", "red");

			//Labels

		/*	arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			   .text(function(d, i) {
			    	return category[i];//*******************************************************************************************
			   });*/
			//.text(year[i]); //each time creat a piece, add the lable by increasing i?
			var circleData=[];
var svg = d3.select("#info")
						.append("svg")
						.attr("width", w)
						.attr("height", 1.55*h);
var text = svg.selectAll("text")
                       .data(circleData)
                        .enter()
                      .append("text");
var textLabels = text
                 .attr("x", w/2)
                 .attr("y", 1.5*h)
                 .text( "more more more")
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "20px")
                 .attr("fill", "red");



};
			

d3.json("rightdata.json", function(json) {

  data = json;
  var firstname = "AE";
	var amount = 0;

	data.forEach(function(d){
		if(d[7] === firstname) {
			amount = amount + d[6];
			//console.log(amount);
			//console.log(firstname);
		}
		else {
		var countries = "#"+firstname;
		d3.selectAll(countries)
		//.style("stroke", "black")
		.style("fill", "darkblue")
		.style("fill-opacity", amount/1000000000)/*function(amount){
		if(amount > 1000000000){return .5;}
		else {return (amount/950000000);}})*/
		.on("click",function(){
			d3.selectAll("#info").selectAll("svg").remove();
			d3.selectAll("#info").selectAll("g").remove();
		return clk(this);
		});

		firstname = d[7];
		amount = d[6];
}
});
});
