
let margin = {left: 100, right: 10, top: 10, bottom: 100}
let height1 = 600 - margin.top - margin.bottom
let width1 = 900 - margin.left - margin.right
let barPadding = 1

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


d3.csv("data/City_MedianRentalPrice_2Bedroom.csv", function(data) {
  let sfData = data.filter( x => x.RegionName === 'San Francisco')[0]
      
  let rental2 = Object.values(sfData).slice(12)
  console.log(rental2)
  
  let rentalTimes = Object.keys(sfData).slice(12);
  console.log(rentalTimes)
  
  y.domain([d3.max(rental2), d3.min(rental2) - 200])
  x.domain([new Date(2010, 1, 1), new Date(2019, 2, 1)])

  let xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall);;

  let yAxisCall = d3.axisLeft(y)
  yAxisGroup.call(yAxisCall);

  let rects = g.selectAll('rect')
                .data(rental2)

  rects.enter()
        .append('rect')
        .attr('class','bar')
        .attr('height', function(d, i) { return height1 - y(d)})
        .attr('width','5')
        .attr('fill', function(d) {return "rgb(0, 0, " + (d / 20) + ")"})
        .attr('x', function(d, i) {return ((width1 / rental2.length - barPadding) * i) + 50})
        .attr('y', function(d, i) {return y(d)})

})


// function update(data) {

//   let xAxisCall = d3.axisBottom(x);
//   xAxisGroup.call(xAxisCall);;

//   let yAxisCall = d3.axisLeft(y)
//   yAxisGroup.call(yAxisCall);
// }