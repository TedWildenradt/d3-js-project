let dataHash = {};
let domainHash = {}
let count = 1;


let margin = {left: 100, right: 10, top: 10, bottom: 100}
let height1 = 600 - margin.top - margin.bottom
let width1 = 900 - margin.left - margin.right
let barPadding = 1



let svg1 = d3.select("#chart2").append('svg')
.attr("width", width1 + margin.left + margin.right)
.attr('height', height1 + margin.top + margin.bottom)

let g = svg1.append('g')
.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

let tip = d3.tip().attr('class','d3-tip').html(function(d, i) {
  return d3.format("$,.0f")(d)
})
g.call(tip);

let xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height1 +")");

let yAxisGroup = g.append("g")
    .attr("class", "y axis");

let y = d3.scaleLinear()
    .range([0, height1])
    
let x = d3.scaleTime()
    .range([0, width1])

g.append("text")
    .attr("y", height1 + 50)
    .attr("x", width1 / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Year");

// Y Label
var yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height1 / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Rent per Month");

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
  
  domainHash['1 Bedroom'] = [new Date(2011, 1, 1), new Date(2018, 11, 1)]
  
  addToDataHash(prices1, months1, '1 Bedroom')

  // update('1 Bedroom')
})


d3.csv("data/City_MedianRentalPrice_2Bedroom.csv", function(data) {
  let sfData = data.filter( x => x.RegionName === 'San Francisco')[0]
  let prices = Object.values(sfData).slice(12)
  let months = Object.keys(sfData).slice(12);
  
  domainHash['2 Bedroom'] = [new Date(2010, 8, 1), new Date(2018, 11, 1)]
  
  addToDataHash(prices, months, '2 Bedroom')

  update('2 Bedroom')

})

d3.csv("data/City_MedianRentalPrice_3Bedroom.csv", function(data) {
  let sfData3 = data.filter( x => x.RegionName === 'San Francisco')[0]
  let prices3 = Object.values(sfData3).slice(60)
  let months3 = Object.keys(sfData3).slice(60)

  domainHash['3 Bedroom'] = [new Date(2014, 8, 1), new Date(2018, 11, 1)]

  addToDataHash(prices3, months3, '3 Bedroom')

  // update('3 Bedroom');
})

d3.csv("data/City_MedianRentalPrice_4Bedroom.csv", function(data) {
  let sfData4 = data.filter( x => x.RegionName === 'San Francisco')[0]
  let prices4 = Object.values(sfData4).slice(86)
  let months4 = Object.keys(sfData4).slice(86)

  domainHash['4 Bedroom'] = [new Date(2016,10, 1), new Date(2018, 11, 1)]

  addToDataHash(prices4, months4, '4 Bedroom')

  // update('4 Bedroom')
})

d3.csv("data/City_MedianRentalPrice_5BedroomOrMore.csv", function(data) {
  let sfData5 = data.filter( x => x.RegionName === 'San Francisco')[0]
  let prices5 = Object.values(sfData5).slice(85)
  let months5 = Object.keys(sfData5).slice(85)

  domainHash['5+ Bedroom'] = [new Date(2017,8, 1), new Date(2018, 11, 1)]

  addToDataHash(prices5, months5, '5+ Bedroom')

  // update('5+ Bedroom')
})

console.log(dataHash);
console.log(domainHash);

// let t = d3.transition().duration(3000)

function update(category) {
  let t = d3.transition().duration(3000)
  // let selection = document.getElementById('dropdown-selector');
  // let newSelection = selection.options[selection.selectedIndex].value;
  // category = newSelection;

  let prices = Object.values(dataHash[category])

  y.domain([10000, 0])
  // x.domain([new Date(2010, 1, 1), new Date(2019, 2, 1)])
  x.domain(domainHash[category])

  let xAxisCall = d3.axisBottom(x);
  xAxisGroup.transition(t).call(xAxisCall);;

  let yAxisCall = d3.axisLeft(y)
  yAxisGroup.transition(t).call(yAxisCall);

  yLabel.text(`${category} Rent per Month`)

  let rects = g.selectAll('rect')
        .data(prices, function(d) {
          return Object.keys(dataHash[category])
        })

  rects.exit()
      .attr('fill', 'lightblue')
    // .transition(t)
      // .attr('y', y(0))
      // .attr('height', 0)
      .remove()

  rects.transition(t) 
      .attr('x', function(d, i) {return ((width1 / prices.length) * i)})
      .attr('y', function(d, i) {return y(d)})
      .attr('width',(width1 / prices.length - barPadding))
      .attr('height', function(d, i) { return height1 - y(d)})

  // rects.enter()
  //      .append('rect')
  //      .attr('class','bar')
  //      .on('mouseover', tip.show)
  //      .on('mouseout', tip.hide)
  //      .attr('height', 0)
  //      .attr('width',(width1 / prices.length - barPadding))
  //      .attr('fill', '#0177b5')
  //      .attr('x', function(d, i) {return ((width1 / prices.length) * i)})
  //      .attr('fill-opacity', 0)
  //      .attr('y', y(0))
  //      .transition(t)
  //         .attr('y', function(d, i) {return y(d)})
  //         .attr('height', function(d, i) { return height1 - y(d)})
  //         .attr('fill-opacity', 1)

  rects.enter()
       .append('rect')
       .attr('class','bar')
       .on('mouseover', tip.show)
       .on('mouseout', tip.hide)
       .attr('height', 0)
       .attr('width',(width1 / prices.length - barPadding))
       .attr('fill', '#0177b5')
       .attr('x', function(d, i) {return ((width1 / prices.length) * i)})
      //  .attr('fill-opacity', 0)
       .attr('y', y(0))
       .merge(rects)
       .transition(t)
          .attr('y', function(d, i) {return y(d)})
          .attr('height', function(d, i) { return height1 - y(d)})
          // .attr('fill-opacity', 1)

  // const linePath = d3.line()
  //       .x(function(d, i) {return ((width1 / prices.length) * i)})
  //       .y(function(d) {return y(d) })

  // g.append('path')
  //       .attr('class','line')
  //       .attr('fill', 'none')
  //       .attr('stroke','grey')
  //       .attr('stroke-width', '5px')
  //       .attr('d', linePath(prices))
}

// setInterval(function(){
//   choices = Object.keys(domainHash).sort( (a,b) => parseInt(a[0]) - parseInt(b[0]))
//   update( choices[count % 5])
//   count++
// }, 5000)

// let parseTime = d3.timeParse("%Y-%m")
// let example = parseTime('2010-02')
// console.log(example)
// let formatTime = d3.timeFormat("%Y %B")
// console.log(formatTime(example));

const timeFormatter = function(time) {
  const parseTime = d3.timeParse("%Y-%m")
  let formatTime = d3.timeFormat("%Y %B")
  return formatTime(parseTime(time));
}

const changeSelection = document.getElementById('dropdown-selector').onchange = function(){
  let selection = document.getElementById('dropdown-selector');
  let newSelection = selection.options[selection.selectedIndex].value;
  update(newSelection)
}