import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.post("/api/v1/signup", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
  } catch (err) {
    c.status(411);
    console.log(err);

    return c.text("User already exists with this email");
  }

  return c.text("signup successful");
});

app.post("/api/v1/signin", async (c) => {
  return c.text("signin route");
});

app.get("/api/v1/blog/:id", async (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog route");
});

app.post("/api/v1/blog", async (c) => {
  return c.text("signin route");
});

app.put("/api/v1/blog", async (c) => {
  return c.text("signin route");
});

export default app;
