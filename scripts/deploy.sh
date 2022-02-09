#!/usr/bin/env sh
yarn run build
cd docs/.vitepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/JimSuen/vitepress-blog.git master:gh-pages
cd -