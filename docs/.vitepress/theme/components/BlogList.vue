<template>
  <div>
    <div v-for="year in Object.keys(data).sort((a, b) => b - a)">
      <div class="year">
        {{ data[year][0].frontMatter.date.split("-")[0] }}
      </div>
      <ul>
        <li v-for="post in data[year]" :key="post.title">
          <span class="date">{{
            post.frontMatter.date.replaceAll("-", "/")
          }}</span>
          <div class="title-content">
            <a class="hover-underline" :href="withBase(post.regularPath)">{{
              post.frontMatter.title
            }}</a>
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from "vue";
import { withBase } from "vitepress";
import { sortPostsByYear } from "../../utils/index.js";

const props = defineProps({
  posts: Array,
});
const { posts } = toRefs(props);
const data = computed(() => sortPostsByYear(posts.value ?? []));
</script>
<style scope>
.year {
  font-size: 15px;
  font-weight: bold;
}
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
  color: rgb(102, 102, 102);
  font-size: 14px;
  flex-shrink: 0;
  margin-right: 10px;
}
.title-content {
  width: 0;
  flex-grow: 1;
  padding: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-content a {
  font-size: 15px !important;
  color: #333333 !important;
  text-decoration: none !important;
  border: none !important;
}
.tags {
  flex-shrink: 0;
  padding: 3px 0;
  margin-left: 10px;
}
.tags a {
  font-size: 12px;
  color: #666666 !important;
  margin-left: 8px;
  border: none !important;
  text-decoration: none !important;
}
</style>
