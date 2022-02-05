<template>
  <Header></Header>
  <Layout />
</template>
<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import Header from "../components/Header.vue";

const { Layout } = DefaultTheme;
</script>
<style>
body {
  max-width: 680px;
  padding: 0 14px;
  margin: 0 auto;
}
</style>
