const boxWidth = 240;
const boxHeight = 120;
const boxBorderRadius = 8;

export default {
  drawNodes(tree, nodes) {
    // draw rectangles
    tree
      .selectAll('rect')
      .data(nodes)
      .enter()
      .append('g')
      .classed('node', true)
      .append('rect')
      .classed('box', true)
      .attr('x', (node) => node.x - boxHeight)
      .attr('y', (node) => node.y - boxHeight + node.depth * boxHeight)
      .attr('rx', boxBorderRadius)
      .attr('width', boxWidth)
      .attr('height', boxHeight);
    // draw text
    tree
      .data(nodes)
      .selectAll('g')
      .append('text')
      .classed('text', true)
      .text((node) => node.id)
      .style('text-anchor', 'middle')
      .attr('x', (node) => node.x)
      .attr('y', (node) => node.y - 80 + node.depth * boxHeight);
  },
  // draw linking lines
  drawLinks(tree, links) {
    links.forEach((line) => {
      const diff = (line.target.y - line.source.y) / 2;
      const margin = line.source.depth * boxHeight;
      tree
        .append('line')
        .classed('line', true)
        .attr('x1', line.source.x)
        .attr('y1', line.target.y - diff + margin)
        .attr('x2', line.target.x)
        .attr('y2', line.target.y - diff + margin);
      tree
        .append('line')
        .classed('line', true)
        .attr('x1', line.source.x)
        .attr('y1', line.source.y + margin)
        .attr('x2', line.source.x)
        .attr('y2', line.target.y - diff + margin);
      tree
        .append('line')
        .classed('line', true)
        .attr('x1', line.target.x)
        .attr('y1', line.target.y - diff + margin)
        .attr('x2', line.target.x)
        .attr('y2', line.target.y + margin);
    });
  },
};
