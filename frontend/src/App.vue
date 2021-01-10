<template>
  <div id="app">
    <Tree />
  </div>
</template>

<script>
import Tree from "@/components/Tree.vue";

export default {
  name: "App",
  components: {
    Tree,
  },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  background-color: rgb(192, 192, 192);
}
</style>
