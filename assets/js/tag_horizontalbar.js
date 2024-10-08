const jsonData = document.getElementById("tag-data").textContent.replace('\n','').replace(' ','');
const dataset = JSON.parse(jsonData).tags;

console.log(dataset);

const xAcessor = (d) => d.size;
const yAcessor = (d) => d.tag;

let dimensions = {
  width : 800,
  height : 1200,
  margin : {
    top:25,
    bottom: 25,
    left: 80,
    right: 25
  }
};

dimensions.ctrWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.ctrHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

// const barheight = 

const svg = d3.select('#bar_chart')
  .append('svg')
  // .attr('width', dimensions.width)
  // .attr('height', dimensions.height)
  .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

const x = d3.scaleLinear()
  .domain([0, d3.max(dataset, d=> xAcessor(d))])
  .range([dimensions.margin.left, dimensions.width - dimensions.margin.right]);

const y = d3.scaleBand()
  .domain(d3.sort(dataset, d=> -d.size).map(d=>d.tag))
  .rangeRound([dimensions.margin.top, dimensions.height -dimensions.margin.bottom])
  .padding(0.1);

const ctr = svg.append('g')
  .attr('fill', 'white');

// 왜 안됨?
const colorgradient = ["#0F76BC","#00AEC4","#0FB189","#34AD22","#B4BB22","#D36903","#FE3D23","#FE133B","#CE1A67"];
let colorScale;

colorScale = d3.scaleQuantile()
  .domain(dataset)
  .range(["white","blue"]);

ctr.selectAll('rect')
  .data(dataset)
  .join('rect')
  .attr('x', x(0)) // x범위 최솟값
  .attr('y', (d)=> y(d.tag))
  .attr('width', (d) => x(d.size) - x(0))
  .attr('height', y.bandwidth())
  .attr('stoke', 'black')
  .attr('fill', "#0FB189")
  // .on("click", (event, d) => {window.open(`${d.link}`)}) //event 인수 처리해야 함. 새 탭으로 연다.
  // .on("click", (event, d) => {window.location.href = `${d.link}`}) //얘는 지금 페이지가 다음페이지로 이동
  .on('click', (event,d)=> {
    if(event.ctrlKey || event.metaKey) {
      window.open(d.link, '_blank'); // 새 탭에서 열기
    } else {
      window.location.href = d.link;
    }
  });
  

const value = svg.append('g')
  .attr('fill', 'white')
  .attr('text-anchor', 'end')
  .selectAll("text")
  .data(dataset)
  .join("text")
    .attr("x", (d) => x(d.size))
    .attr("y", (d) => y(d.tag) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -10)
    // .text((d) => format(d.size))
    .text(d => d.size)
    .attr('color', '#aeaeae')
    .attr('rx', '5')
    .attr('storke', '#7d90aa')
    .attr('stroke-width', '3');

  // value.call((text) => text.filter(d=> (x(d.size) - x(0)) < 2)) // for short bars
  //   .attr("dx", +4)
  //   .attr("fill", "black")
  //   .attr("text-anchor", "start")

// Create the axes.
// svg.append("g")
//   .attr("transform", `translate(0,${dimensions.margin.top})`)
//   .call(d3.axisTop(x))
//   // .call(g => g.select('.domain').remove())
//   .style("font-size", "0.85em")
//   .classed("tag", true);

svg.append("g")
  .attr("transform", `translate(${dimensions.margin.left}, 0)`)
  .call(d3.axisLeft(y).tickSizeOuter(0))
  .style("font-size", "1rem");