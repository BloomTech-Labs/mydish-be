const recipe_ingredients_router = require("../../endpoints/routers/recipe_ingredients");
const recipe_ingredients_model = require("../../endpoints/models/recipe_ingredients");
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
server.use(recipe_ingredients_router);

test("We are in the test environment", () => {
  const env = process.env.DB_ENVIRONMENT;
  expect(env).toBe("testing");
});

describe('POST "/recipe_ingredients"', () => {
  test("Returns 200 if successful", async () => {
    recipe_ingredients_model.add_one = jest.fn(
      req_obj =>
        new Promise(res => {
          setTimeout(() => res({ ...req_obj, test: true }), 0);
        })
    );
    const new_recipe_ingredient = {
      recipe_id: 1,
      ingredient_id: 2,
      unit_id: 6,
      quantity: 0.25,
    };
    const expected_recipe_ingredient = {
      ...new_recipe_ingredient,
      test: true
    };

    const response = await request(server)
      .post("/recipe_ingredients")
      .send(new_recipe_ingredient)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected_recipe_ingredient);
    expect(recipe_ingredients_model.add_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.add_one.mockReset();
  });

  test("Returns 500 if unsuccessful", async () => {
    recipe_ingredients_model.add_one = jest.fn(() => {
      throw { message: "error" };
    });
    const expected_error = { message: "error" };
    const new_recipe_ingredient = {
      recipe_id: 1,
      ingredient_id: 2,
      unit_id: 6,
      quantity: 0.25,
    };

    const response = await request(server)
      .post("/recipe_ingredients")
      .send(new_recipe_ingredient)
      .set("Accept", "application/json");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(recipe_ingredients_model.add_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.add_one.mockReset();
  });
});

describe('GET "/recipe_ingredients/:id"', () => {
  test("Returns 200 if successful", async () => {
    recipe_ingredients_model.get_one = jest.fn(
      id_obj =>
        new Promise(res => {
          setTimeout(() => res({ id: Number(id_obj.id), test: true }), 0);
        })
    );
    const expected_recipe = {
      id: 1, // We will test for recipe_ingredient id 1
      test: true
    };

    const response = await request(server).get("/recipe_ingredients/1");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected_recipe);
    expect(recipe_ingredients_model.get_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.get_one.mockReset();
  });

  test("Returns 404 if the model returns nothing", async () => {
    recipe_ingredients_model.get_one = jest.fn(() => null);
    const expected_error = /no recipe/i;

    const response = await request(server).get("/recipe_ingredients/1");

    expect(response.status).toEqual(404);
    expect(response.body).toMatch(expected_error);
    expect(recipe_ingredients_model.get_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.get_one.mockReset();
  });

  test("returns 500 if unsuccessful", async () => {
    recipe_ingredients_model.get_one = jest.fn(() => {
      throw { message: "error" };
    });
    const expected_error = { message: "error" };

    const response = await request(server).get("/recipe_ingredients/1");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(recipe_ingredients_model.get_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.get_one.mockReset();
  });
});

describe('GET "/recipe_ingredients"', () => {
  // We will use this fake_db in our tests
  const fake_db = [
    { test_id: 1, test: true },
    { test_id: 2, test: true },
    { test_id: 22, test: true },
    { test_id: 3, test: true }
  ];
  test("returns 200 if no search is given", async () => {
    recipe_ingredients_model.get_all = jest.fn(
      () =>
        new Promise(res => {
          setTimeout(
            // Resolve with the fake_db to emulate a call
            () => res(fake_db),
            0
          );
        })
    );
    // We should return all of our database on a get_all
    const expected_recipes = fake_db;

    const response = await request(server).get("/recipe_ingredients");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected_recipes);
    expect(recipe_ingredients_model.get_all).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.get_all.mockReset();
  });

  test("Returns 404 if the model returns an empty array", async () => {
    recipe_ingredients_model.get_all = jest.fn(() => []);
    const expected_error = /no recipe/i;

    const response = await request(server).get("/recipe_ingredients");

    expect(response.status).toEqual(404);
    expect(response.body).toMatch(expected_error);
    expect(recipe_ingredients_model.get_all).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.get_all.mockReset();
  });

  test("returns 500 if unsuccessful", async () => {
    recipe_ingredients_model.get_all = jest.fn(() => {
      throw { message: "error" };
    });
    const expected_error = { message: "error" };

    const response = await request(server).get("/recipe_ingredients");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(recipe_ingredients_model.get_all).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.get_all.mockReset();
  });
});

describe("PUT /recipe_ingredients/:id", () => {
  test("Returns 200 if successful", async () => {
    recipe_ingredients_model.update_one = jest.fn(
      () => new Promise(res => setTimeout(() => res(1)), 0)
    );

    const expected_response = 1; // success = 1

    const response = await request(server)
      .put("/recipe_ingredients/2")
      .send({ body: "updates", test: true })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toBe(expected_response);
    expect(recipe_ingredients_model.update_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.update_one.mockReset();
  });

  test("Returns 404 with a falsey return value", async () => {
    recipe_ingredients_model.update_one = jest.fn(
      () => new Promise(res => setTimeout(() => res(false)), 0)
    );

    const expected_error = /couldn't update/i; // success = 1

    const response = await request(server)
      .put("/recipe_ingredients/25")
      .send({ body: "updates", test: true })
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    expect(response.body).toMatch(expected_error);
    expect(recipe_ingredients_model.update_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.update_one.mockReset();
  });

  test("Returns 500 if an error is thrown", async () => {
    recipe_ingredients_model.update_one = jest.fn(() => {
      throw { message: "error" };
    });
    const expected_error = { message: "error" };

    const response = await request(server)
      .put("/recipe_ingredients/2")
      .send({ body: "updates", test: true })
      .set("Accept", "application/json");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(recipe_ingredients_model.update_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.update_one.mockReset();
  });
});

describe('DELETE "/recipe_ingredients"', () => {
  test("Returns 200 if successful", async () => {
    recipe_ingredients_model.remove_one = jest.fn(
      () =>
        new Promise(res => {
          setTimeout(() => res([{ title: "test_title" }]), 0);
        })
    );
    const expected_response = /id 1.*terminated/i;

    const response = await request(server).delete("/recipe_ingredients/1");

    expect(response.status).toEqual(200);
    expect(response.body).toMatch(expected_response);
    expect(recipe_ingredients_model.remove_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.remove_one.mockReset();
  });

  test("returns 500 if unsuccessful", async () => {
    recipe_ingredients_model.remove_one = jest.fn(() => {
      throw { message: "error" };
    });
    const expected_error = { message: "error" };

    const response = await request(server).delete("/recipe_ingredients/1");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(recipe_ingredients_model.remove_one).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.remove_one.mockReset();
  });
});

describe('DELETE "/recipe_ingredients/:id"', () => {
  test("Returns 200 if successful", async () => {
    recipe_ingredients_model.remove_all = jest.fn(
      () =>
        new Promise(res => {
          setTimeout(() => res(true), 0);
        })
    );
    const expected_response = /all recipe_ingredients/i;

    const response = await request(server).delete("/recipe_ingredients");

    expect(response.status).toEqual(200);
    expect(response.body).toMatch(expected_response);
    expect(recipe_ingredients_model.remove_all).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.remove_all.mockReset();
  });

  test("returns 500 if unsuccessful", async () => {
    recipe_ingredients_model.remove_all = jest.fn(() => {
      throw { message: "error" };
    });
    const expected_error = { message: "error" };

    const response = await request(server).delete("/recipe_ingredients");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(recipe_ingredients_model.remove_all).toHaveBeenCalledTimes(1);
    recipe_ingredients_model.remove_all.mockReset();
  });
});
