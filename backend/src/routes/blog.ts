import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  createBlogInput,
  updateBlogInput,
} from "@sarveshofficial/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    authorId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const token = c.req.header("authorization") || "";
    const author = await verify(token, c.env.JWT_SECRET);

    if (author) {
      //   @ts-ignore
      c.set("authorId", author.id);
      await next();
    } else {
      c.status(403);
      c.json({
        message: "You are not logged in",
      });
    }
  } catch (error) {
    c.status(403);
    c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }
  const authorId = c.get("authorId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId),
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  try {
    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        message: "Inputs are not correct",
      });
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
      data: {
        title: body.title,
        content: body.content,
      },
      where: {
        id: body.id,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    c.json({ message: "Update Failed" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany();

  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
    });

    return c.json({
      id: blog,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    c.json({
      message: "Get Failed",
    });
  }
});
