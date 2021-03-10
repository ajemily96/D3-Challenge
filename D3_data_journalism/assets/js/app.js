// Create Preset Chart dimensions
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG Wrapper
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create SVG group that will hold the Chart, Shift by Left and Top Margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load Data from CSV
d3.csv("assets/data/data.csv").then(data => {
    console.log(data)
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
    var xLinearScale = d3.scaleLinear().domain(d3.extent(data, item => item.age)).range([0,width]); //fill with data
    var yLinearScale = d3.scaleLinear().domain(d3.extent(data, item => item.obesity)).range([height,0]); //fill with data

    // Create Axis Functions
    var xaxis = d3.axisBottom(xLinearScale);
    var yaxis = d3.axisLeft(yLinearScale);

    // Append Axis to Chart
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xaxis);
    chartGroup.append("g").call(yaxis);
    
    // Create blocks to hold the circles
    var circles = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("g");

    // Create Circles
    circles.append("circle")
    .attr("cx", d => xLinearScale(d.age)) //fill with data
    .attr("cy", d => yLinearScale(d.obesity)) //fill with data
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5")
    .text(d => d.abbr);
    
    /* Create the Text Inside the Circles */
    circles.append("text")
    // .attr("style","color:white;")
    .attr("dx", d => -20)
    .attr("transform", d => "translate(" + (xLinearScale(d.age)+10) + "," + (yLinearScale(d.obesity)+5) + ")") // had to adjust to center text
    .text(d => d.abbr);

    // Create Axes Labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obese (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Age (Yr)");
  }).catch(error => {
    console.log(error);
  });
