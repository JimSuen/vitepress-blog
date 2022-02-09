export function sortPostsByYear(posts) {
  const data = {};
  for (let index = 0; index < posts.length; index++) {
    const post = posts[index];
    if (post.frontMatter.date) {
      const year = post.frontMatter.date.split("-")[0];
      if (year) {
        if (!data[year] || !data[year].length) {
          data[year] = [post];
        } else {
          data[year].push(post);
        }
      }
    }
  }
  return data;
}
