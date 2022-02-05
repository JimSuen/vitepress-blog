<template>
  <header>
    <img src="../../assets/logo.jpeg" alt="logo" />
    <!-- <img
      src="https://cdn.jsdelivr.net/gh/JimSuen/picture-library@master/logo.jpg"
      alt="logo"
    /> -->
    <nav>
      <a
        v-for="menu in menus"
        :key="menu.name"
        class="hover-underline"
        :href="menu.link"
      >
        {{ menu.text }}
      </a>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { initCategories } from "../../utils/category.js";

const { theme } = useData();
const menus = theme.value.nav;
</script>
<style scope>
header {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
img {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  flex-shrink: 0;
  margin-right: 10px;
  user-select: none;
  box-shadow: 0 1px 5px rgb(0 0 0 / 10%);
}
nav {
  margin-right: -9px;
  text-align: right;
  user-select: none;
}
nav a {
  display: inline-block;
  font-size: 16px;
  margin: 4px 15px;
  white-space: nowrap;
  user-select: auto;
  text-decoration: none !important;
}
</style>
