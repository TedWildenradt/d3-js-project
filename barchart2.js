let dataHash = {};
let domainHash = {}

let margin = {left: 100, right: 10, top: 10, bottom: 100}
let height1 = 600 - margin.top - margin.bottom
let width1 = 900 - margin.left - margin.right
let barPadding = 1

// let flag = true;

let svg1 = d3.select("#chart2").append('svg')
.attr("width", width1 + margin.left + margin.right)
.attr('height', height1 + margin.top + margin.bottom)

let g = svg1.append('g')
.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

let xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height1 +")");

let yAxisGroup = g.append("g")
    .attr("class", "y axis");

let y = d3.scaleLinear()
    .range([0, height1])
    
let x = d3.scaleTime()
    .range([0, width1])

const addToDataHash = function(price, month, name) {
  let tempHash = {}
  for (let i = 0; i < price.length; i++){
    tempHash[month[i]] = price[i]
  }
  dataHash[name] = tempHash;
}

d3.csv("data/City_MedianRentalPrice_1Bedroom.csv", function(data) {
  let sfData1 = data.filter( x => x.RegionName === 'San Francisco')[0]
  let prices1 = Object.values(sfData1).slice(17)
  let months1 = Object.keys(sfData1).slice(17)
  
  domainHash['oneBed'] = [new Date(2010, 8, 1), new Date(2018, 11, 1)]
  
  addToDataHash(prices1, months1, 'oneBed')

  // update('oneBed')
})


d3.csv("data/City_MedianRentalPrice_2Bedroom.csv", function(data) {
  let sfData = data.filter( x => x.RegionName === 'San Francisco')[0]
  let prices = Object.values(sfData).slice(12)
  let months = Object.keys(sfData).slice(12);
  
  domainHash['twoBed'] = [new Date(2010, 1, 1), new Date(2019, 2, 1)]
  
  addToDataHash(prices, months, 'twoBed')

  // update('twoBed')

})

d3.csv("data/City_MedianRentalPrice_3Bedroom.csv", function(data) {
  let sfData3 = data.filter( x => x.RegionName === 'San Francisco')[0]
  let prices3 = Object.values(sfData3).slice(60)
  let months3 = Object.keys(sfData3).slice(60)

  domainHash['threeBed'] = [new Date(2014, 2, 1), new Date(2019, 2, 1)]

  addToDataHash(prices3, months3, 'threeBed')

  // update('threeBed');
})

d3.csv("data/City_MedianRentalPrice_4Bedroom.csv", function(data) {
  let sfData4 = data.filter( x => x.RegionName === 'San Francisco')[0]
  let prices4 = Object.values(sfData4).slice(86)
  let months4 = Object.keys(sfData4).slice(86)

  domainHash['fourBed'] = [new Date(2016,11, 1), new Date(2018, 11, 1)]

  addToDataHash(prices4, months4, 'fourBed')

  update('fourBed')
})

d3.csv("data/City_MedianRentalPrice_5BedroomOrMore.csv", function(data) {
  let sfData5 = data.filter( x => x.RegionName === 'San Francisco')[0]
  let prices5 = Object.values(sfData5).slice(85)
  let months5 = Object.keys(sfData5).slice(85)

  addToDataHash(prices5, months5, 'fiveBed')
})

console.log(dataHash);
console.log(domainHash);

function update(category) {

  let prices = Object.values(dataHash[category])

  y.domain([d3.max(prices), d3.min(prices) - 200])
  // x.domain([new Date(2010, 1, 1), new Date(2019, 2, 1)])
  x.domain(domainHash[category])

  let xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall);;

  let yAxisCall = d3.axisLeft(y)
  yAxisGroup.call(yAxisCall);

  let rects = g.selectAll('rect')
  .data(prices)

  rects.exit().remove()

  rects 
      .attr('height', function(d, i) { return height1 - y(d)})
      .attr('width','5')
      .attr('x', function(d, i) {return ((width1 / prices.length - barPadding) * i) + 50})
      .attr('y', function(d, i) {return y(d)})

  rects.enter()
       .append('rect')
       .attr('class','bar')
       .attr('height', y(0))
       .attr('width','5')
       .attr('fill', 'steelblue')
       .attr('x', function(d, i) {return ((width1 / prices.length - barPadding) * i) + 50})
       .attr('fill-opacity', 0)
       .attr('y', y(0))
       .transition(d3.transition().duration(1000))
          .attr('y', function(d, i) {return y(d)})
          .attr('height', function(d, i) { return height1 - y(d)})
          .attr('fill-opacity', 1)

  // var valueline = d3.line()
  //      .x(function(d, i) {return ((width1 / prices.length - barPadding) * i) + 50})
  //      .y(function(d) { return y(d); });

  // g.append("path")
  //      .attr("class", "line")
  //      .attr("d", valueline(prices));
}