import DefaultTheme from "vitepress/theme";
import Default from "./Layout/Default.vue";
import BlogList from "./components/BlogList.vue";
import "./styles/common.css";

const theme = {
  ...DefaultTheme,
  Layout: Default,
  async enhanceApp({ app, router, siteData }) {
    // const isDark = usePreferredDark();
    // app.provide(
    //   "theme",
    //   useStorage("theme", { type: isDark.value ? "theme-dark" : "theme-light" })
    // );
    app.component("BlogList", BlogList);
  },
};
export default theme;
