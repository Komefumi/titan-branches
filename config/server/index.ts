import Koa from "koa";
import { addRoutes } from "./utils";
import routes from "./routes";

const app = new Koa();

addRoutes(app, ...routes);

app.listen(4545, () => {
  console.log("Server running on port 4545");
});
