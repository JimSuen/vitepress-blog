// type Post = {
//   frontMatter: {
//       date: string
//       title: string
//       tags: string[]
//       description: string
//   }
//   regularPath: string
// }

export function initCategories(post) {
  const tagStore = {};
  for (let index = 0; index < post.length; index++) {
    const element = post[index];
    const categories = element.frontMatter.categories;
    if (categories) {
      categories.forEach((item) => {
        if (tagStore[item]) {
          tagStore[item].push(element);
        } else {
          tagStore[item] = [];
          tagStore[item].push(element);
        }
      });
    }
  }
  return tagStore;
}
