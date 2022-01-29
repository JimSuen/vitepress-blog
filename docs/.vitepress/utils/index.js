export function sortPostsByYear(list) {
  return list.sort((pre, next) => {
    return pre.year - next.year;
  });
}
