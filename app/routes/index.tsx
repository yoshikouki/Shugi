import { css } from "hono/css";
import { createRoute } from "honox/factory";
import Discussion from "../islands/discussion";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  return c.render(
    <div className={className}>
      <Discussion />
    </div>,
    { title: name },
  );
});
