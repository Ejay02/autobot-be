const request = require("supertest");
const { server } = require("../src/index");
W;
const Comment = require("../src/models/comment");

describe("Comment API Endpoints", () => {
  beforeAll(async () => {
    await new Promise((resolve) => {
      server.listen(5001, resolve);
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });

  test("GET /api/posts/:postId/comments should return comments for a specific post with pagination", async () => {
    const postId = 1;
    const limit = 5;
    const offset = 0;

    const response = await request(server).get(
      `/api/posts/${postId}/comments?limit=${limit}&offset=${offset}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(limit);
  });

  test("GET /api/comments should return 404 for non-existent Comment ID", async () => {
    const nonExistentCommentId = 99993029209;

    const response = await request(server).get(
      `/api/comments/${nonExistentCommentId}`
    );

    expect(response.statusCode).toBe(404);
  });
});
