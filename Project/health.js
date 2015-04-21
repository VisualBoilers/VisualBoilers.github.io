/* draw states on id #statesvg */
Country.draw("#countrysvg");
var data;
var CurrentCountry=0;
var clk = function(c){

  var countryarray = [];
  var year = [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014];
  var agency=["DOS","DoD","HHS","IAF","MCC","Peace Corps","Treasury","USADF","USAID","USDA"];
  var category=["Democracy, Human Rights, and Governance","Economic Development","Education and Social Services","Environment","Health","Humanitarian Assistance","Multi-Sector","Peace and Security","Program Management"];
  var sector=["Family Planning and Reproductive Health","Health - General","HIV/AIDS","Malaria","Maternal and Child Health","Nutrition","Other Public Health Threats","Pandemic Influenza and Other Emerging Threats ","Tuberculosis","Water Supply and Sanitation"]; 

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
  var firstsector="Family Planning and Reproductive Health";   //***********************************************************
  var yearamount = 0;
  var agencyamount =0;
  var catamount =0;
  var sectoramount =0;    //*********************************************************************
  var yeararray = [];
  var agencyarray=[];
  var catarray = [];
  var sectorarray=[];     //************************************************************************

  var i = 0;
  var j =0;
  var k =0;
  var formatAmount = d3.format("$,.2f");
  
  //--------------------------------------------sector array noah------------------------------------------------
    var sortedSectorArray = countryarray.sort(function(a,b){
    return d3.ascending(a[5], b[5]);
	
  });
  //console.log(sortedAgencyArray);
   sortedSectorArray.forEach(function(d){
    if(d[5] === firstsector)
    {
      sectoramount = sectoramount + d[6];
    }
    else
    {
      sectorarray.push(sectoramount);
	  i=i+1;
	  console.log(i);
      firstsector = sector[i];
	  console.log(agency[i]);
	  console.log(firstagency);
	  console.log(d[1]);
      while(d[5] !== firstsector)
      {
        sectorarray.push(0);
	   i=i+1;
	   sector[i];
	   firstsector = sector[i];
      }
	  //console.log(agencyarray);
      sectoramount = d[6];
    }

  });
  sectorarray.push(sectoramount);

 ///------------------------------------------try sector-----------------------------
 /*
     var sortedCategoryArray= countryarray.sort(function(a,b){
    return d3.ascending(a[4], b[4]);
  });
 
 
 var extractCata=[];									//restore********************************************************************************
 extractCata=sortedCategoryArray;
 console.log(extractCata[1]);
  var extractCataNew=[];
   var q=0;
   for(p=0;p<extractCata.length;p++){
   if(extractCata[p][4]===category[4]){   
	   extractCataNew[q]=extractCata[p];
	   q++;
	   }
   else{q=q;}
   }
   console.log(extractCataNew);
   
 var sortedSectorArray= extractCataNew.sort(function(a,b){
    return d3.ascending(a[5], b[5]);
  });
  console.log(sortedSectorArray);
   sortedSectorArray.forEach(function(d){
    if(d[5] === firstsector)
    {
      sectoramount = sectoramount + d[6];
    }
    else
    {
      sectorarray.push(sectoramount);
	  k=k+1;
      firstsector = sector[k];
	  console.log(sector[k]);
	  console.log(firstsector);
	  console.log(d[5]);
	  console.log(k);
      while(d[5] !== firstsector)
      {
       sectorarray.push(0);
	   k=k+1;
	   sector[k];
	   firstsector = sector[k];
      }
	  //console.log(agencyarray);
      sectoramount = d[6];
    }

  });
  sectorarray.push(sectoramount);*/
   
   
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
			   .text("The total amount is "+formatAmount(d3.sum(sectorarray),2))
			   
//-----------------------------sector pie--------------------------------------
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
						.attr("height", h);

			//Set up groups
			var arcs = svg.selectAll("g.arc")
						  .data(pie(sectorarray))   //*******************************************************************************
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
			    	return sector[i];//*******************************************************************************************
			   });
			//.text(year[i]); //each time creat a piece, add the lable by increasing i?

//----------------------------------agency pie--------------------------------------------------------------------------------------
  /*var w = 240;
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
			    .attr("d", arc);

			//Labels

			arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			   .text(function(d, i) {
			    	return agency[i];//*******************************************************************************************
			   });
			   
		/*	   svg.append("text")
			   .attr("x", w/2)
			   .attr("y", 0)
			   .attr("text-anchor", "middle")
			   .style("font-size", "24px")
			   .text("$"+d3.round(d3.sum(yeararray),2))
			//.text(year[i]); //each time creat a piece, add the lable by increasing i?*/

//---------------------------------year pie--------------------------------------------------------------------------------------------
  /*var w = 240;
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
			    	return year[i]; 
			   });*/
			//.text(year[i]); //each time creat a piece, add the lable by increasing i?
	
			

};

d3.json("rightdata.json", function(json) {

  data = json;
  var firstname = "AE";
  var firstcat="Health";
  var amount = 0;
  
  data.sort( function(a,b) {
		if (a[7] == b[7])
			return a[4] < b[4] ? -1 : 1;
			return a[7] > b[7] ? 1 : -1;
	});

	data.forEach(function(d){
		if(d[7] === firstname) {
			if(d[4] === firstcat) {
				amount = amount + d[6];
				//console.log(amount);
			//console.log(firstname);
			}
		
			else {
				console.log(amount); //Noah need to move else (the one below this) so that it can look for diff categories for each country
			}
		}
		else {
			if(amount === 0){
				amount = null
				firstname = null;
				}
			else {
				var countries = "#"+firstname;
		d3.selectAll(countries)
		//.style("stroke", "black")
		.style("fill", "orange")
		.style("fill-opacity", amount/100000000)/*function(amount){
		if(amount > 1000000000){return .5;}
		else {return (amount/950000000);}})*/
		.on("click",function(){
			d3.selectAll("#info").selectAll("svg").remove();
			d3.selectAll("#info").selectAll("g").remove();
		return clk(this);
		});

		firstname = d[7];
		amount = 0;
		if(d[4] === firstcat) {
			amount = amount + d[6];
			//console.log(amount);
			//console.log(firstname);
			}
			else {
				amount = 0; 
				}
			}
		}
});
});