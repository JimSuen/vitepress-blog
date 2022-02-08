const globby = require("globby");
const matter = require("gray-matter");
const fs = require("fs-extra");
const path = require("path");

function convertDate(date = new Date().toString()) {
  const jsonDate = new Date(date).toJSON();
  return jsonDate.split("T")[0];
}

function compareDate(obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

async function getPostMDFilePaths() {
  let paths = await globby(["**.md"], {
    ignore: ["node_modules", "README.md"],
  });
  return paths.filter((item) => item.includes("posts/"));
}

async function getPosts() {
  let paths = await getPostMDFilePaths(); // 获取文章路径字符串
  let posts = await Promise.all(
    paths.map(async (item) => {
      const fileContent = await fs.readFile(item, "utf-8");
      const mat = matter(fileContent);
      debugger;
      const { data: info } = mat;
      info.date = convertDate(info.date);
      return {
        frontMatter: info,
        // regularPath: `/${item.replace(".md", ".html")}`,
        regularPath: `/${item.replace(".md", ".html").split("docs/")[1]}`,
      };
    })
  );
  posts.sort(compareDate);
  return posts;
}

module.exports = { getPosts };
