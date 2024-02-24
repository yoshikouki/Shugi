import { Server } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

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

Bun.serve({
  port: process.env.PORT || "3000",
  fetch: (req: Request, server: Server) => {
    return app.fetch(req, {
      server,
    });
  },
});
