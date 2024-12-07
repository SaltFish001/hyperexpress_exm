import { Server, Router } from "hyper-express";

const test_server = new Server({});
test_server.set_error_handler((req, res, e) => {
  console.error(e);
  return res.send("Opoos");
});
const test_router = new Router();

test_router.get(
  "/test",
  [
    async () => {
      // should tigger global error handler
      return new Error("Opoos");
    },
  ],
  async (_req, res) => {
    return res.send("OK");
  }
);

test_server.use(test_router);

await test_server.listen("3000");

const res = await fetch("http://localhost:3000/test");
const text_data = await res.text();
console.log(text_data);
