// Create Preset Chart dimensions
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// Create SVG Wrapper
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create SVG group that will hold the Chart, Shift by Left and Top Margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load Data from CSV
d3.csv("data\data.csv").then( data => {
    // Cast Data as Numbers
    data.forEach(dataline => {
        dataline.poverty = +dataline.poverty
        dataline.povertyMoe = +dataline.povertyMoe
        dataline.age = +dataline.age
        dataline.ageMoe = +dataline.ageMoe
        dataline.income = +dataline.income
        dataline.incomeMoe = +dataline.incomeMoe
        dataline.healthcare = +dataline.healthcare
        dataline.healthcareLow = +dataline.healthcareLow
        dataline.healthcareHigh = +dataline.healthcareHigh
        dataline.obesity = +dataline.obesity
        dataline.obesityLow = +dataline.obesityLow
        dataline.obesityHigh = +dataline.obesityHigh
        dataline.smoking = +dataline.smoking
        dataline.smokingLow = +dataline.smokingLow
        dataline.smokingHigh = +dataline.smokingHigh
    });

    // Create Scale Functions
    var xLinearScale = d3.scaleLinear().domain([]).range([]); //fill with data
    var yLinearScale = d3.scaleLinear().domain([]).range([]); //fill with data

    // Create Axis Functions
    var xaxis = d3.axisBottom(xLinearScale);
    var yaxis = d3.axisLeft(yLinearScale);

    // Append Axis to Chart
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);
    chartGroup.append("g").call(leftAxis);

    // Create Circles
    var circlesGroup =chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.)) //fill with data
    .attr("cy", d => yLinearScale(d.)) //fill with data
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5")
    //add attr to have the abreviation in the circle
    ;

    // Initialize Tooltip --optional

    // Create Tooltip in the chart --optional

    // Create Event Listeners to Display Tooltip --optional

    // Create Axes Labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Hair Metal Band Hair Length (inches)");
  }).catch(error => {
    console.log(error);
  });
