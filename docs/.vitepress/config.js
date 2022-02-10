const postUtil = require("./utils/post");

const BASE = "/vitepress-blog/";

async function config() {
  return {
    lang: "zh-CN",
    title: "Jim Suen 's blog",
    description: "Just playing around.",
    base: BASE,
    themeConfig: {
      sidebar: "",
      posts: await postUtil.getPosts(),
      nav: [
        { text: "首页", link: `${BASE}` },
        { text: "标签", link: `${BASE}pages/categories` },
        { text: "关于我", link: `${BASE}pages/about` },
      ],
    },
  };
}
module.exports = config();
