const recipes_router = require("../../endpoints/routers/recipes");
const recipes_model = require("../../endpoints/models/recipes");
const validate = require("../../endpoints/middleware/validate");
// This test does not care about middleware.
// Anytime we call a middleware function, just call next()
jest.mock("../../endpoints/middleware/validate", () => {
  return {
    user: (req, res, next) => next(),
    token: (req, res, next) => {
      req.user = { id: 1 };
      next();
    },
    admin: (req, res, next) => next(),
    recipe: (req, res, next) => {
      res.locals.recipe = req.body;
      next();
    },
    user_recipe: (req, res, next) => next()
  };
});

// Set up our test server
const request = require("supertest");
const express = require("express");
const server = express();
server.use(express.json());
server.use(recipes_router);

test("We are in the test environment", () => {
  const env = process.env.DB_ENVIRONMENT;
  expect(env).toBe("testing");
});

describe('POST "/recipes"', () => {
  test("Returns 200 if successful", async () => {
    recipes_model.add_one = jest.fn(
      req_obj =>
        new Promise(res => {
          setTimeout(() => res({ ...req_obj, test: true }), 50);
        })
    );
    const new_recipe = {
      title: "John",
      prep_time: 45,
      ingredients: ["matcha"],
      instructions: ["cook"]
    };
    const expected_recipe = {
      ...new_recipe,
      owner_id: 1, // From our mocked middleware token()
      test: true
    };

    const response = await request(server)
      .post("/recipes")
      .send(new_recipe)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected_recipe);
    expect(recipes_model.add_one).toHaveBeenCalledTimes(1);
    recipes_model.add_one.mockReset();
  });

  test("Returns 500 if unsuccessful", async () => {
    recipes_model.add_one = jest.fn(() => {
      throw { message: "error" };
    });
    const expected_error = { message: "error" };
    const new_recipe = {
      title: "John",
      prep_time: 45,
      ingredients: ["matcha"],
      instructions: ["cook"]
    };

    const response = await request(server)
      .post("/recipes")
      .send(new_recipe)
      .set("Accept", "application/json");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(recipes_model.add_one).toHaveBeenCalledTimes(1);
    recipes_model.add_one.mockReset();
  });

  test("returns 400 if there's a custom error", async () => {
    recipes_model.add_one = jest.fn(() => {
      throw { userError: true, message: "error" };
    });
    const expected_error = { userError: true, message: "error" };
    const new_recipe = {
      title: "John",
      prep_time: 45,
      ingredients: ["matcha"],
      instructions: ["cook"]
    };

    const response = await request(server)
      .post("/recipes")
      .send(new_recipe)
      .set("Accept", "application/json");

    expect(response.status).toEqual(400);
    expect(response.body).toEqual(expected_error);
    expect(recipes_model.add_one).toHaveBeenCalledTimes(1);
    recipes_model.add_one.mockReset();
  });
});
