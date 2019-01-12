// let dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];

// let svg = d3.select('body').append('svg')
//           .attr('height','100%')
//           .attr('width','100%');

// svg.selectAll('rect')
//    .data(dataArray)
//    .enter().append('rect')
//    .attr('class','bar')
//    .attr('height', function(d, i) {return (d * 10)})
//    .attr('width','40')
//    .attr('x', function(d, i) {return (i * 60) + 25})
//    .attr('y', function(d, i) {return 400 - (d * 10)})

// svg.selectAll('text')
//    .data(dataArray)
//    .enter().append('text')
//    .text(function(d, i) {return d})
//       .attr('x', function(d, i) {return (i * 60) + 36})
//       .attr('y', function(d, i) {return 390 - (d * 10)})


// d3.json("median_1_bedroom.json", function(data) {
//   data.forEach(function(d){
//     if (d.RegionName === 'San Francisco'){
//       let rental1 = Object.values(d).slice(4)
//       console.log(rental1)

//       let svg = d3.select('body').append('svg')
//           .attr('height','100%')
//           .attr('width','100%');

//       svg.selectAll('rect')
//         .data(rental1)
//         .enter().append('rect')
//         .attr('class','bar')
//         .attr('height', function(d, i) {return (d / 10000)})
//         .attr('width','3')
//         .attr('x', function(d, i) {return (i * 5) + 25})
//         .attr('y', function(d, i) {return 200 - (d / 10000)})

//       svg.selectAll('text')
//         .data(rental1)
//         .enter().append('text')
//         .text(function(d, i) {return d})
//             .attr('x', function(d, i) {return (i * 60) + 36})
//             .attr('y', function(d, i) {return 390 - (d * 10)})

//     }
//   })
d3.csv("City_MedianRentalPrice_2Bedroom.csv", function(data) {
  data.forEach(function(d){

    if (d.RegionName === 'San Francisco'){
      console.log(d)
      let rental1 = Object.values(d).slice(12)
      console.log(rental1)

      let width = 1050;
      let height = 700;
      let barPadding = 1;

      let svg = d3.select('#chart').append('svg')
          .attr('height', height)
          .attr('width', width);

      svg.selectAll('rect')
        .data(rental1)
        .enter().append('rect')
        .attr('class','bar')
        .attr('height', function(d, i) {return (d / 10) - 140})
        .attr('width','5')
        .attr('fill', function(d) {return "rgb(0, 0, " + (d / 20) + ")"})
        .attr('x', function(d, i) {return ((width / rental1.length - barPadding) * i) + 50})
        .attr('y', function(d, i) {return 500 - (d / 10)})

      // const path = svg.append("e")
      //   .attr("fill", "none")
      //   .attr("stroke", "steelblue")
      //   .attr("stroke-width", 1.5)
      //   .attr("stroke-linejoin", "round")
      //   .attr("stroke-linecap", "round")
      //   .selectAll("path")
      //   .data(rental1)
      //   .enter().append("path")
      //   .style("mix-blend-mode", "multiply")
      //   // .attr("d", d => line(d));
      //   .attr(function(d) { return line(d) });

      svg.selectAll('text')
        .data(rental1)
        .enter().append('text')
        .text(function(d, i) {return d})
            .attr('class', 'text')
            .attr('x', function(d, i) {return ((width / rental1.length - barPadding) * i) + 50})
            .attr('y', function(d, i) {return 500 - (d / 10)})
      
      var scale = d3.scaleLinear()
                  .domain([d3.min(rental1), d3.max(rental1)])
                  // .domain([0, 5000])
                  // .range([0, width - 100]);
                  .range([0, width]);

      var x_axis = d3.axisBottom()
                  .scale(scale);

      // svg.append("g").call(x_axis);

      var yscale = d3.scaleLinear()
        .domain([0, d3.max(rental1)])
        .range([height/2, 0]);

      var y_axis = d3.axisLeft(yscale)
      .scale(yscale);

      svg.append("g")
      .attr('class','y-axis')
      .attr("transform", "translate(50, 10)")
      .call(y_axis);

      var xAxisTranslate = height/2 + 10;

      svg.append("g")
           .attr("transform", "translate(50, " + xAxisTranslate  +")")
           .call(x_axis)

    }

  })

  // define the x axis and its class, append it to svg 

      // .scale(x)
      // .orient("bottom")
      // svg.append("svg:g")
      // .attr("class", "x axis");

  // define the y axis and its class, append it to svg
  // let yAxis = d3.svg.axis()
  //     .scale(y)
  //     .orient("left")
  //     svg.append("svg:g")
  //     .attr("class", "y axis");
});