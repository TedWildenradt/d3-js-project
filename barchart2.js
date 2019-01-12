d3.csv("City_MedianRentalPrice_2Bedroom.csv", function(data) {

  // let svg = d3.select("#chart2")
  //           .attr("wdith", "1200")
  //           .attr("height", "700")

  data.forEach( function(d1){

    if (d1.RegionName === 'San Francisco'){
      console.log(d1)
      let rental2 = Object.values(d1).slice(12)

      let height1 = 500
      let width1 = 700
      let barPadding = 1

      let y = d3.scaleLinear()
              .domain([d3.min(rental2) - 200, d3.max(rental2)])
              .range([0, height1])

      let x = d3.scaleTime()
              .domain([new Date(2010, 0, 1), new Date(2019, 0, 1)])
              .range([0, width1])
    
      let svg1 = d3.select("#chart2").append('svg')
                .attr("width", width1)
                .attr('height', height1)
    
      let rects = svg1.selectAll('rect')
                    .data(rental2)
    
      rects.enter()
            .append('rect')
            .attr('class','bar')
            .attr('height', function(d, i) { return y(d)})
            .attr('width','5')
            .attr('fill', function(d) {return "rgb(0, 0, " + (d / 20) + ")"})
            .attr('x', function(d, i) {return ((width1 / rental2.length - barPadding) * i) + 50})
            .attr('y', function(d, i) {return height1 - y(d)})
    }
  })


})
