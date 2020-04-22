const instructions_router = require("../../endpoints/routers/instructions");
const instructions_model = require("../../endpoints/models/instructions");
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
    user_recipe: (req, res, next) => next(),
  };
});

const request = require("supertest");
const express = require("express");
const server = express();
server.use(express.json());
server.use(instructions_router);

test("We are in the test environment", () => {
  const env = process.env.DB_ENVIRONMENT;
  expect(env).toBe("testing");
});

describe("POST /instructions", () => {
  test("Returns 200 if successful", async () => {
    const newInstruction = {
      recipe_id: 3,
      step_number: 1,
      description: "more........MORE",
    };
    instructions_model.add_one = jest.fn(
      (req_obj) =>
        new Promise((res) => {
          setTimeout(() => res({...req_obj, test: true}), 0);
        }),
    );
    const expected_instructions = {
      ...newInstruction,
      test: true,
    };
    const response = await request(server)
      .post("/instructions")
      .send(newInstruction)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected_instructions);
    expect(instructions_model.add_one).toHaveBeenCalledTimes(1);
    instructions_model.add_one.mockReset();
  });

  test("Returns 500 if unsuccessful", async () => {
    instructions_model.add_one = jest.fn(() => {
      throw {detail: "error"};
    });
    const expected_error = "error";

    const newInstruction = {
      recipe_id: 3,
      step_number: 1,
      description: "more........MORE",
    };

    const response = await request(server)
      .post("/instructions")
      .send(newInstruction)
      .set("Accept", "application/json");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(instructions_model.add_one).toHaveBeenCalledTimes(1);
    instructions_model.add_one.mockReset();
  });
});
