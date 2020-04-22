const users_router = require("../../endpoints/routers/users");
const users_model = require("../../endpoints/models/users");

const validate = require("../../endpoints/middleware/validate");

jest.mock("../../endpoints/middleware/validate", () => {
  return {
    user: (req, res, next) => next(),
    token: (req, res, next) => {
      req.user = {id: 1};
      next();
    },
    admin: (req, res, next) => next(),
    recipe: (req, res, next) => {
      res.locals.recipe = req.body;
      next();
    },
    users: (req, res, next) => next(),
  };
});

// Set up our test server
const request = require("supertest");
const express = require("express");
const server = express();
server.use(express.json());
server.use(users_router);

test("We are in the test environment", () => {
  const env = process.env.DB_ENVIRONMENT;
  expect(env).toBe("testing");
});

describe('GET "/login/users/:id"', () => {
  const fake_db = [
    {
      username: "user",
      pasword: "password",
    },
  ];

  test("Responds with 200 if successful", async () => {
    users_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });
    const expected_users = fake_db;

    const response = await request(server).get("/users/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_users);
    expect(users_model.get_all).toHaveBeenCalledTimes(1);
    users_model.get_all.mockReset();
  });

  test("Responsds with 404 if no users", async () => {
    users_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res([]), 0));
    });

    const expected_message = "No users found.";

    const response = await request(server).get("/users/");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(users_model.get_all).toHaveBeenCalledTimes(1);
    users_model.get_all.mockReset();
  });
  test("Responds with 500 if unsuccessful", async () => {
    users_model.get_all = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).get("/users/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(users_model.get_all).toHaveBeenCalledTimes(1);
    users_model.get_all.mockReset();
  });
});

// describe("POST /users/login", () => {
//   const logginIn = {
//     user: {
//       username: "user",
//       password: "password",
//     },
//     token: "work you bastard",
//   };

//   test("Responds with 200 if successful", async () => {
//     validate.user = jest.fn((req, res, next) => {
//       req.user = {username: name};
//       req.token = "token";
//       next();
//     });

//     const expected_users = {
//       username: "user",
//       password: "password",
//     };

//     const response = await request(server).post("/users/login").send(logginIn);

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(expected_users);
//     expect(users_model.get_one).toHaveBeenCalledTimes(1);
//     users_model.get_one.mockReset();
//   });

//   test("Responds with 500 if unsuccessful", async () => {
//     users_model.add_one = jest.fn(() => {
//       throw {detail: "error"};
//     });

//     const expected_error = "error";

//     const response = await request(server).post("/users/login");

//     expect(response.status).toBe(404);
//     expect(response.body).toEqual(expected_error);
//     expect(users_model.add_one).toHaveBeenCalledTimes(1);
//     users_model.add_one.mockReset();
//   });
// });
