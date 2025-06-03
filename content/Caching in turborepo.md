Ref - [https://turbo.build/repo/docs/getting-started/create-new#using-the-cache](https://turbo.build/repo/docs/getting-started/create-new#using-the-cache)

One of the big things that make turborepo fast and efficient is caching

It watches your files across builds and returns the cached response of builds if no files have changed.

Try running `npm run build` more than once and you’ll see the second times it happens extremely fast.

You can also explore the `node_modules/.cache/turbo` folder to see the zipped cache files and unzip them using

```javascript
 tar --use-compress-program=unzstd -xvf name.tar.zst
```