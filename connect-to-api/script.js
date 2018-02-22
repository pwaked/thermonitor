// for testing
var timeValue =  [
{
date_time: '1-May-12',
value: '12'
},
{
date_time: '30-Apr-12',
value: '30'
},
{
date_time: '19-Apr-12',
value: '25'
}
,
{
date_time: '10-Mar-12',
value: '20'
}
,
{
date_time: '10-Feb-12',
value: '60'
}
];

// create a xhttp variable and assign a new XMLHttpRequest object to it.
var xhttp  = new XMLHttpRequest();

// open a new connection, using the GET request on the URL endpoint
xhttp.open("GET", "http://localhost/monitor/api/reading/read.php", true);
xhttp.send();

xhttp.onreadystatechange = function() {
	// action to be performed when the document is ready
    if (this.readyState == 4 && this.status == 200) {     
	   // convert JSON into JavaScript object
	   var arr = JSON.parse(xhttp.responseText);
       plot(arr);
	   display(arr);
    } else {
		console.log('error - request failed');
	}
};

function create_header(table){
    var header = table.createTHead();
	var row = header.insertRow(0); 
	var header_datetime = row.insertCell(0);
	header_datetime.innerHTML = "<b>date-time</b>";
	var header_value = row.insertCell(1);
	header_value.innerHTML = "<b>value</b>";
}

function display(arr) {
	const app = document.getElementById('root');	
	const container = document.createElement('div');
	container.setAttribute('class', 'container');
	app.appendChild(container);
	var table = document.getElementById("table-temp");		
	create_header(table);	
	// arr['records'].forEach(reading => {	
	timeValue.forEach(reading => {			
		var row = table.insertRow(1);
		var cell_datetime = row.insertCell(0);
		var cell_value = row.insertCell(1);
		// Add values to the new cells:
		cell_datetime.innerHTML = reading.date_time;
		cell_value.innerHTML = reading.value;
	}); 
}

function plot(arr) {

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date_time); })
    .y(function(d) { return y(d.value); });

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
		  

// get the data	
d3.select(".chart") // we first select the chart container 
    .selectAll("div") // we initiate the data join by defining the selection to which we will join data
	//.data(arr['records']) // join the data to the selection
	.data(timeValue) // join the data to the selection
    .enter().append("div")
	.style("width", function(d) { return d.value * 10 + "px"; })
    .text(function(d) { return d.date_time + ',  ' + d.value;}
	,function(error, data) {
		if (error) throw error;
	 }
    );
	// uncomment below to parse remote data
	//arr['records'].forEach(function(d) {  
    //  d.date_time = parseTime(d.date_time);
    //  d.value = +d.value;
    //});
	
	timeValue.forEach(function(d) {
      d.date_time = parseTime(d.date_time);
      d.value = +d.value;
    });
	
	// Scale the range of the data
	x.domain(d3.extent(timeValue, function(d) { return d.date_time; }));
	y.domain([0, d3.max(timeValue, function(d) { return d.value; })]);

	// Add the valueline path.
    svg.append("path")
      //.data(arr['records'])
	  .data([timeValue])
      .attr("class", "line")
      .attr("d", valueline);

	// Add the scatterplot
	svg.selectAll("dot")
      //.data(arr['records'])
	  .data(timeValue)
    .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.date_time); })
      .attr("cy", function(d) { return y(d.value); });

	  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
	  
}
