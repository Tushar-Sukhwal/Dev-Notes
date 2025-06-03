A lot of times you need a module that can be shared by both frontend and backend apps

1. Initialize a `packages/common` module

```javascript
cd packages
mkdir common
```

2. Initialize an empty node.js project

```javascript
npm init -y
npx tsc --init
```

3. Change the name to `@repo/common`

4. Export a few things from `src/index.ts`
```javascript
export const NUMBER = 1;
```

5. Add it to the `package.json` of various apps (next app/react app/node app)

```javascript
"@repo/common": "*",
```

6. Import it in there and try to use it

7. Run npm install in root folder and see if it works as expected