import { Server } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono<{
  Bindings: {
    server: Server;
  };
}>();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ws", (c) => {
  if (!c.env.server.upgrade(c.req.raw)) {
    console.error("failed to upgrade!");
  }
  return new Response(); // have to return empty response so hono doesn't get mad
});

Bun.serve({
  port: process.env.PORT || "4000",
  fetch: (req: Request, server: Server) => {
    return app.fetch(req, {
      server,
    });
  },
  websocket: {
    message(ws, msg) {
      console.log("websocket message", msg);
      ws.send(JSON.stringify({ message: "Hello from the server!" }));
    },
    open(ws) {
      console.log("websocket opened", ws);
    },
  },
});
