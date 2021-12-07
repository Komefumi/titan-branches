import { join } from "path";
import { writeFileSync } from "fs";
import Router from "@koa/router";

const infoRouter = new Router();
const apiRouter = new Router({ prefix: "/api" });
const fileRouter = new Router();

infoRouter.get("/", async (ctx, _next) => {
  ctx.body = "Test success";
});

fileRouter.get("/", async (ctx, _next) => {
  ctx.body = "File get route";
});

fileRouter.post("/", async (ctx, _next) => {
  ctx.body = "why";
  const { name: filename, contents } = ctx.request.body;
  if (/\.html$/.test(filename)) {
    const filePath = join(
      __dirname,
      "..",
      "..",
      "generated-webpages",
      filename
    );
    writeFileSync(filePath, contents);
    const message = `${filename} created at ${filePath}`;
    ctx.body = { message };
    console.log(message);
    return;
  }
  console.log(ctx.request.body);
});

apiRouter.use("/file", fileRouter.routes(), fileRouter.allowedMethods());

export default [apiRouter, fileRouter];
