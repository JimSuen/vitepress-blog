<template>
  <header>
    <img
      src="https://cdn.jsdelivr.net/gh/JimSuen/picture-library@master/logo.jpg"
      alt="logo"
    />
    <nav>
      <a v-for="menu in menus" :key="menu.name" class="hover-underline">
        {{ menu.name }}
      </a>
    </nav>
  </header>
</template>
<script setup lang="ts">
const menus = [
  { name: "首页" },
  { name: "归类" },
  { name: "搜索" },
  { name: "关于" },
];
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
