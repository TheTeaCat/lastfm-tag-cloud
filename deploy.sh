npm run build
cd dist
git init
git add -A
git commit -m "deploy"
git push -f git@github.com:theteacat/lastfm-tag-cloud.git master:gh-pages
cd ..