import { Router } from "itty-router";
import { v4 as uuid } from "uuid";

const router = Router();

// GET index
router.get("/", () => {
  return new Response("Welcome to Birdie!");
});

// GET posts
router.get("/posts", async () => {
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    const list = await BIRDIE_POSTS.list();
    let values = [];

    for (const key of list.keys) {
      const value = await BIRDIE_POSTS.get(key.name, { type: "json" });
      values = [...values, { id: key.name, ...value }];
    }
    return new Response(JSON.stringify(values), {
      headers: headers,
      status: 200,
    });
  } catch (error) {
    return new Response(error, { status: 404 });
  }
});

// POST posts
router.post("/posts", async (request) => {
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    const key = uuid();
    let value = await request.json();
    value = { ...value, createDate: new Date().toJSON() };

    await BIRDIE_POSTS.put(key, JSON.stringify(value));

    const post = await BIRDIE_POSTS.get(key, { type: "json" });

    return new Response(JSON.stringify(post), {
      headers: headers,
      status: 201,
    });
  } catch (error) {
    return new Response(error, { status: 404 });
  }
});

// 404
router.all("*", () => new Response("404!", { status: 404 }));

addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
