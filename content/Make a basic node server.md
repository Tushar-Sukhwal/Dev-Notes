```shell
npm init -y
```
```shell
npm i -D ts-node typescript @types/node
```
```shell
npx tsc --init
```
copy this in `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "resolveJsonModule": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*", "src/data/**/*.json", "prisma/**/*"]
}
```
```shell
npm i express body-parser cors dotenv helmet morgan
```
```shell
npm i -D rimraf concurrently nodemon @types/cors @types/express @types/morgan @types/node
```
`src/index.ts`
```ts
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
/* ROUTE IMPORTS */

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ROUTES */
app.get("/", (req, res) => {
  res.send("This is Home route ");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```
add these script in `package.json`
```json
"build": "rimraf dist && npx tsc",
"start": "npm run build && node dist/index.js",
"dev": "npm run build && concurrently \"npx tsc -w\" \"nodemon --exec ts-node src/index.ts\""
```
