---
page: true
date: 2021-06-30
title: 首页
sidebar: false
navbar: false
---

<script setup>
import BlogList from "./.vitepress/theme/components/BlogList.vue";
import { useData } from "vitepress";
const { theme } = useData();
const { posts } = theme.value;
</script>
<BlogList :posts="posts"/>
