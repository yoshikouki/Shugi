import { Hono } from "hono";
import { createRoute } from "honox/factory";

const app = new Hono();

export default createRoute((c) => {
  console.log(c);
  const success = c.env.upgrade(c.req.raw);
  return;
});
