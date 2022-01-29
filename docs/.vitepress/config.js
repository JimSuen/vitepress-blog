const postUtil = require("./utils/post");

async function config() {
  return {
    lang: "zh-CN",
    title: "Jim Suen 's blog",
    description: "Just playing around.",
    themeConfig: {
      posts: await postUtil.getPosts(),
      nav: [
        { text: "首页", link: "/" },
        { text: "归档", link: "/pages/archives" },
        { text: "标签", link: "/pages/tags" },
        { text: "关于", link: "/pages/about" },
      ],
    },
  };
}
module.exports = config();
