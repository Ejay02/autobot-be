const request = require("supertest");
const { server, io } = require("../src/index");
const Autobot = require("../src/models/autobot");

describe("Autobot API Endpoints", () => {
  beforeAll(async () => {
    await new Promise((resolve) => {
      server.listen(5501, resolve);
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });

  test("GET /api/autobots should return all Autobots with pagination", async () => {
    const limit = 10;
    const offset = 0;
    const response = await request(server).get(
      `/api/autobots?limit=${limit}&offset=${offset}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(limit);
  });

  test("GET /api/autobots/:id/posts should return posts for a specific Autobot with pagination", async () => {
    const autobotId = 1;
    const limit = 10;
    const offset = 0;
    const response = await request(server).get(
      `/api/autobots/${autobotId}/posts?limit=${limit}&offset=${offset}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(limit);
  });

  test("GET /api/posts/:postId/comments should return comments for a specific post with pagination", async () => {
    const postId = 1;
    const limit = 10;
    const offset = 0;
    const response = await request(server).get(
      `/api/posts/${postId}/comments?limit=${limit}&offset=${offset}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(limit);
  });
});
