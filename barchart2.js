d3.csv("City_MedianRentalPrice_2Bedroom.csv", function(data) {

  // let svg = d3.select("#chart2")
  //           .attr("wdith", "1200")
  //           .attr("height", "700")

  data.forEach( function(d1){

    if (d1.RegionName === 'San Francisco'){
      console.log(d1)
      let rental2 = Object.values(d1).slice(12)
      console.log(rental2)
      let rentalTimes = Object.keys(d1).slice(12);
      console.log(rentalTimes)

      let margin = {left: 100, right: 10, top: 10, bottom: 100}

      let height1 = 600 - margin.top - margin.bottom
      let width1 = 900 - margin.left - margin.right
      let barPadding = 1

      let y = d3.scaleLinear()
              .domain([d3.max(rental2), d3.min(rental2) - 200])
              .range([0, height1])
              

      let x = d3.scaleTime()
              .domain([new Date(2010, 0, 1), new Date(2019, 0, 1)])
              .range([0, width1])
      
      // let x2 = d3.scaleBand()
      //         .domain(rentalTimes)
      //         .range([0, width1])

      let svg1 = d3.select("#chart2").append('svg')
                .attr("width", width1 + margin.left + margin.right)
                .attr('height', height1 + margin.top + margin.bottom)

      let g = svg1.append('g')
              .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
      
      // Axis for left and bottom
      let xAxisCall = d3.axisBottom(x);
      g.append('g')
          .attr('class','x-axis')
          .attr('transform', 'translate(0, ' + height1 + ')')
          .call(xAxisCall)

      let yAxisCall = d3.axisLeft(y);
      g.append('g')
          .attr('class','y-axis')
          .call(yAxisCall)

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
    }
  })


})
