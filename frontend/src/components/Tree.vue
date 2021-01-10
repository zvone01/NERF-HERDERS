<template>
  <div class="tree">
    <svg />
    <info-box
      v-if="showModal"
      @close="unselectNode"
      :info="selectedNode.node.data"
    />
  </div>
</template>

<script>
// API
import service from "@/service";

// D3
import * as d3 from "d3";

// InfoBox for info on click
import InfoBox from "@/components/InfoBox";

// Utilities to draw tree
import drawTree from "@/utils/drawTree";

export default {
  name: "Tree",
  components: {
    InfoBox,
  },
  data() {
    return {
      data: {},
      hierarchy: {},
      selectedNode: {},
      showModal: false,
    };
  },
  async mounted() {
    this.data = await this.loadNodes();
    this.dataTree = d3
      .select("svg")
      .attr("width", "100%")
      .attr("viewBox", "0 -120 1500 900")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("position", "relative")
      .append("g");
    this.createTree();
  },
  methods: {
    unselectNode() {
      if (d3.select(this.selectedNode.element).classed("selected")) {
        d3.select(this.selectedNode.element).classed("selected", false);
      }
      this.showModal = false;
    },
    selectNode(element, node) {
      const svgElement = d3.select(element);
      this.selectedNode = { node, element };
      if (svgElement.classed("selected")) {
        svgElement.classed("selected", false);
      } else {
        svgElement.classed("selected", true);
      }
      this.showModal = true;
    },
    async loadNodes() {
      const data = await service.fetchData();
      const hierarchy = d3
        .stratify()
        .id((d) => d.name)
        .parentId((d) => d.parent)(data);
      const treeLayout = d3.tree().size([1500, 200]);
      this.hierarchy = treeLayout(hierarchy);
      return data;
    },
    createTree() {
      const links = this.hierarchy.links();
      const nodes = this.hierarchy.descendants();
      const _this = this;

      drawTree.drawNodes(this.dataTree, nodes);
      drawTree.drawLinks(this.dataTree, links);

      // Make nodes clickable
      this.dataTree
        .data(links)
        .selectAll("g.node")
        .style("cursor", "pointer")
        .on("click", function (d, i) {
          _this.selectNode(this, i);
        });
    },
  },
};
</script>

<style lang="scss">
$box-fill: rgb(255, 255, 255);
$box-stroke: rgb(180, 180, 180);
$line-stroke: rgb(100, 100, 100);

.tree {
  margin: 40px 20px;
}
.node {
  .box {
    fill: $box-fill;
    stroke: $box-stroke;
    stroke-width: 2px;
    &:hover {
      stroke: $line-stroke;
    }
  }
  &.selected {
    .box {
      fill: $box-stroke;
    }
  }
  .text {
    font-size: 26px;
  }
}
.line {
  stroke: $line-stroke;
}
</style>
