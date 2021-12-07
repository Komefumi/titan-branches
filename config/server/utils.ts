import Application from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

interface IRouterPacked {
  router: Router;
}

function makeRouterPackedList(...routers: Router[]): IRouterPacked[] {
  const packList: IRouterPacked[] = [];

  for (let router of routers) {
    packList.push({ router });
  }

  return packList;
}

export function addRoutes(
  koaApp: Application,
  ...routes: Router[]
): Application {
  koaApp.use(cors());
  koaApp.use(bodyParser());
  makeRouterPackedList(...routes).forEach(({ router }) => {
    koaApp.use(router.routes()).use(router.allowedMethods());
  });
  return koaApp;
}
