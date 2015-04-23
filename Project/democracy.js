/* draw states on id #statesvg */
Country.draw("#countrysvg");
var data;
var CurrentCountry=0;
//var sector=["Civil Society","Good Governance","Political Competition and Consensus-Building","Rule of Law and Human Rights"];
var clk = function(c){

  var countryarray = [];
  var year = [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014];
  var agency=["DOS","DoD","HHS","IAF","MCC","Peace Corps","Treasury","USADF","USAID","USDA"];
  var category=["Democracy, Human Rights, and Governance","Economic Development","Education and Social Services","Environment","Health","Humanitarian Assistance","Multi-Sector","Peace and Security","Program Management"];
  var sector=["Civil Society","Good Governance","Political Competition and Consensus-Building","Rule of Law and Human Rights"];//****************************
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
  
  var firstsector="Civil Society";//***********************************************************
  var yearamount = 0;
  var agencyamount =0;
  var catamount =0;
  var sectoramount =0;//*********************************************************************
  var yeararray = [];
  var agencyarray=[];
  var catarray = [];
  var sectorarray=[];//************************************************************************
 
  var k=0;//*********************************************************************************
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
 // console.log(sortedAgencyArray);
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
	//  console.log(agencyarray);
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
	//  console.log(category[j]);
	//  console.log(firstcat);
	//  console.log(d[4]);
	//  console.log(i);
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
    ///------------------------------------------try sector-----------------------------
 var extractCata=[];//restore********************************************************************************
 extractCata=sortedCategoryArray;
 console.log(extractCata[1]);
  var extractCataNew=[];
   var q=0;
   for(p=0;p<extractCata.length;p++){
   if(extractCata[p][4]===category[0]){//change for each category
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
	  console.log(sector[k]);//
	  console.log(firstsector);
	  console.log(d[5]);
	  console.log(k);
      while(d[5] !== firstsector)
      {
        sectorarray.push(0);
       // firstyear = firstyear + 1;
	   k=k+1;
	   sector[k];
	   firstsector = sector[k];
      }
	  //console.log(agencyarray);
      sectoramount = d[6];
    }

  });
  sectorarray.push(sectoramount);
   
   
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
						.attr("height", h)
						.attr("id","pie");
						
			d3.selectAll("#pie").append("text")
						.attr("id","tool");
			

			//Set up groups
			var arcs = svg.selectAll("g.arc")
						  .data(pie(sectorarray))//*******************************************************************************
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

			//d3.selectAll("svg").exit().remove();
      //Draw arc paths
	  var z=-1;
	  
			arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc)
				.attr("id",sector[i])
				
			.on("mouseover",function(d){
				d3.select(this)
				.append("svg:title")
				.text(function(d){
				
					return d.id;
				       					});
				})
				.on("mouseout",function(d){});
		    
		   
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
//--------------------------------------text&border------------------------------------------------------------------------------------
var circleData=[];
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



};

d3.json("rightdata.json", function(json) {

  data = json;
  var firstname = "AE";
  var firstcat="Democracy, Human Rights, and Governance";
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
////////////////console.log(amount);//******************************************************
			//console.log(firstname);
			}
		
			else {
			//	console.log(amount); //Noah need to move else (the one below this) so that it can look for diff categories for each country
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
		.style("fill", "red")
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
