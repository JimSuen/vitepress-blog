<template>
  <Header></Header>
  <!-- <Content /> -->
  <BlogList />
</template>
<script setup lang="ts">
import Header from "../components/Header.vue";
import BlogList from "../components/BlogList.vue";
</script>
<style>
body {
  max-width: 680px;
  padding: 0 14px;
  margin: 0 auto;
}
</style>
