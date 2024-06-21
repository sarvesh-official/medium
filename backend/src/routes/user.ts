import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signInInput, signUpInput } from "@sarveshofficial/medium-common";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const { success } = signUpInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );
    return c.json({ message: "signup successful", token: token });
  } catch (err) {
    c.status(411);
    console.log(err);

    return c.text("User already exists with this email");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const { success } = signInInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(411);
      return c.json({ message: "User not found" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "signin successful",
      token,
    });
  } catch (err) {
    c.status(411);
    console.log(err);

    return c.text("User already exists with this email");
  }
});
