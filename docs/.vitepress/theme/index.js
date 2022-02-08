import DefaultTheme from "vitepress/theme";
import Default from "./Layout/Default.vue";
import BlogList from "./components/BlogList.vue";
import Categories from "./components/Categories.vue";
import "./styles/common.css";
import "./styles/rewrite.css";
// import "./styles/post.css";

const theme = {
  ...DefaultTheme,
  Layout: Default,
  async enhanceApp({ app, router, siteData }) {
    // const isDark = usePreferredDark();
    // app.provide(
    //   "theme",
    //   useStorage("theme", { type: isDark.value ? "theme-dark" : "theme-light" })
    // );
    // register global compoment
    app.component("BlogList", BlogList);
    app.component("Categories", Categories);
    // app.component("Archives", Archives);
    // app.component("Page", Page);
    // app.component("Comment", Comment);
  },
};
export default theme;
