<template>
  <div class="tags">
    <span
      @click="toggleTag(key)"
      v-for="(item, key) in data"
      :class="['tag', 'hover-underline', { active: selectTag === key }]"
    >
      {{ key }} <small>({{ data[key].length }})</small>
    </span>
  </div>
  <hr v-show="selectTag" />
  <BlogList :posts="data[selectTag]" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useData, withBase } from "vitepress";
import BlogList from "./BlogList.vue";
import { initCategories } from "../../utils/category.js";
const { theme } = useData();
const data = computed(() => initCategories(theme.value.posts));
let selectTag = ref("");
const toggleTag = (tag: string) => {
  selectTag.value = tag;
};
</script>
<style scope>
.tag {
  margin: 0 10px !important;
  transition: all 0.5s ease;
}
.tag.active {
  zoom: 1.2;
  font-weight: bold;
}
hr {
  opacity: 0.5;
}
</style>
