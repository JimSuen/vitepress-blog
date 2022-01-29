<template>
  <ul>
    <li v-for="post in posts" :key="post.title">
      <span class="date">{{ post.frontMatter.date }}</span>
      <div class="title">
        <a class="hover-underline">{{ post.frontMatter.title }}</a>
      </div>
      <span class="tags">
        <a
          v-for="tag in post.frontMatter.categories"
          :key="tag"
          class="hover-underline"
        >
          {{ tag }}
        </a>
      </span>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useData } from "vitepress";

const { theme } = useData();
const { posts } = theme.value;
</script>
<style scope>
ul {
  box-sizing: border-box;
  padding-left: 15px;
}
li {
  display: flex;
  align-items: center;
  padding: 8px 0;
}
.date {
  color: #666666;
  font-size: 14px;
  flex-shrink: 0;
  margin-right: 10px;
}
.title {
  width: 0;
  flex-grow: 1;
  padding: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title a {
  font-size: 15px;
  /* TODO: 解决text-decoration: none 不起作用 */
  text-decoration: none !important;
}
.tags {
  flex-shrink: 0;
  padding: 3px 0;
  margin-left: 10px;
}
.tags a {
  font-size: 12px;
  color: #666666;
  margin-left: 8px;
  text-decoration: none !important;
}
</style>
