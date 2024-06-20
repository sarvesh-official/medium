import { Hono } from "hono";

const app = new Hono();

app.post("/api/v1/signup", (c) => {
  return c.text("Sign Up Route");
});

app.post("/api/v1/signin", (c) => {
  return c.text("Sign In Route");
});

app.post("/api/v1/blog", (c) => {
  return c.text("blog");
});
app.put("/api/v1/blog", (c) => {
  return c.text("blog");
});
app.get("/api/v1/blog/:id", (c) => {
  return c.text("blog");
});
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("blog");
});
export default app;
