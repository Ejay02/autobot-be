const request = require("supertest");
const app = require("../src/index");
const Autobot = require("../src/models/autobot");

describe("Autobot API Endpoints", () => {
  beforeAll(async () => {
    // Optionally, set up your database or seed data here
  });

  afterAll(async () => {
    // Clean up your database or close connections here
  });

  test("GET /api/autobots should return all Autobots", async () => {
    const response = await request(app).get("/api/autobots");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Expect an array of Autobots
  });

  test("POST /api/autobots should create a new Autobot", async () => {
    const newAutobot = {
      name: "Test Autobot",
      username: "testautobot",
      email: "testautobot@example.com",
      address: JSON.stringify({ street: "123 Test St", city: "Test City" }),
      phone: "123-456-7890",
      website: "testautobot.com",
      company: JSON.stringify({ name: "Test Company" }),
    };

    const response = await request(app).post("/api/autobots").send(newAutobot);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("autobotId"); // Check if the response has an autobotId
  });

  test("GET /api/autobots/:id should return a specific Autobot", async () => {
    const autobotId = 1; // Replace with a valid ID from your database
    const response = await request(app).get(`/api/autobots/${autobotId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", autobotId); // Check if the response contains the correct ID
  });

  test("GET /api/posts/:postId/comments should return comments for a specific post", async () => {
    const postId = 1; // Replace with a valid post ID from your database
    const response = await request(app).get(`/api/posts/${postId}/comments`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Expect an array of comments
  });

  // Add more tests as needed
});
