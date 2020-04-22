const ingredients_router = require("../../endpoints/routers/ingredients");
const ingredients_model = require("../../endpoints/models/ingredients");

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
server.use(ingredients_router);

test("We are in the test environment", () => {
  const env = process.env.DB_ENVIRONMENT;
  expect(env).toBe("testing");
});

describe("GET /ingredients", () => {
  const fake_db = [
    {id: 1, name: "peas"},
    {id: 2, name: "corn"},
  ];

  test("Responds with 200 if successful", async () => {
    ingredients_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_ingredients = fake_db;

    const response = await request(server).get("/ingredients/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_ingredients);
    expect(ingredients_model.get_all).toHaveBeenCalledTimes(1);
    ingredients_model.get_all.mockReset();
  });

  test("Responsds with 404 if no ingredients", async () => {
    ingredients_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res([]), 0));
    });

    const expected_message = "No ingredients found.";

    const response = await request(server).get("/ingredients/");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(ingredients_model.get_all).toHaveBeenCalledTimes(1);
    ingredients_model.get_all.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    ingredients_model.get_all = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).get("/ingredients/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(ingredients_model.get_all).toHaveBeenCalledTimes(1);
    ingredients_model.get_all.mockReset();
  });
});

describe("POST /ingredients", () => {
  const new_ingredient = {
    name: "artichoke",
  };

  test("Responds with 200 if successful", async () => {
    ingredients_model.add_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(new_ingredient), 0));
    });

    const expected_ingredient = new_ingredient;

    const response = await request(server).post("/ingredients/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_ingredient);
    expect(ingredients_model.add_one).toHaveBeenCalledTimes(1);
    ingredients_model.add_one.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    ingredients_model.add_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).post("/ingredients/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(ingredients_model.add_one).toHaveBeenCalledTimes(1);
    ingredients_model.add_one.mockReset();
  });
});

describe("GET /ingredients/:id", () => {
  const fake_db = [
    {id: 1, name: "peas"},
    {id: 2, name: "corn"},
  ];

  test("Responds with 200 if successful", async () => {
    ingredients_model.get_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_ingredients = fake_db;

    const response = await request(server).get("/ingredients/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_ingredients);
    expect(ingredients_model.get_one).toHaveBeenCalledTimes(1);
    ingredients_model.get_one.mockReset();
  });

  test("Responsds with 404 if no ingredients", async () => {
    ingredients_model.get_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "No ingredient found.";

    const response = await request(server).get("/ingredients/3");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(ingredients_model.get_one).toHaveBeenCalledTimes(1);
    ingredients_model.get_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    ingredients_model.get_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).get("/ingredients/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(ingredients_model.get_one).toHaveBeenCalledTimes(1);
    ingredients_model.get_one.mockReset();
  });
});

describe("PUT /ingredients/:id", () => {
  const fake_db = {id: 1, name: "corn"};

  test("Responds with 200 if successful", async () => {
    ingredients_model.update_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_ingredients = fake_db;

    const response = await request(server).put("/ingredients/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_ingredients);
    expect(ingredients_model.update_one).toHaveBeenCalledTimes(1);
    ingredients_model.update_one.mockReset();
  });

  test("Responsds with 404 if no ingredients", async () => {
    ingredients_model.update_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "Couldn't update ingredient";

    const response = await request(server).put("/ingredients/2");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(ingredients_model.update_one).toHaveBeenCalledTimes(1);
    ingredients_model.update_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    ingredients_model.update_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).put("/ingredients/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(ingredients_model.update_one).toHaveBeenCalledTimes(1);
    ingredients_model.update_one.mockReset();
  });
});

describe("DELETE /ingredients/:id", () => {
  const fake_db = {id: 1, name: "corn"};

  test("Responds with 200 if successful", async () => {
    ingredients_model.remove_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_message = `${fake_db.name} has been terminated.`;

    const response = await request(server).delete("/ingredients/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_message);
    expect(ingredients_model.remove_one).toHaveBeenCalledTimes(1);
    ingredients_model.remove_one.mockReset();
  });

  test("Responsds with 404 if no ingredients", async () => {
    ingredients_model.remove_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "Couldn't find ingredient 2.";

    const response = await request(server).delete("/ingredients/2");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(ingredients_model.remove_one).toHaveBeenCalledTimes(1);
    ingredients_model.remove_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    ingredients_model.remove_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).delete("/ingredients/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(ingredients_model.remove_one).toHaveBeenCalledTimes(1);
    ingredients_model.remove_one.mockReset();
  });
});

describe("DELETE /ingredients", () => {
  test("Responds with 200 if successful", async () => {
    ingredients_model.remove_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "All ingredients have been eliminated.";

    const response = await request(server).delete("/ingredients/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_message);
    expect(ingredients_model.remove_all).toHaveBeenCalledTimes(1);
    ingredients_model.remove_all.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    ingredients_model.remove_all = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).delete("/ingredients/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(ingredients_model.remove_all).toHaveBeenCalledTimes(1);
    ingredients_model.remove_all.mockReset();
  });
});
