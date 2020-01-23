const version_router = require("../../endpoints/routers/pervious_versions");
const version_model = require("../../endpoints/models/previous_versions");
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
server.use(version_router);

test("We are in the test environment", () => {
  const env = process.env.DB_ENVIRONMENT;
  expect(env).toBe("testing");
});

describe("GET /recipes/:id/versions", () => {
  const fake_db = [
    {
      id: 1,
      changes: { a: "b", c: "d" },
      recipe_id: 1,
      revision_number: 1,
      test: true
    },
    {
      id: 2,
      changes: { a: "b", c: "d" },
      recipe_id: 1,
      revision_number: 2,
      test: true
    },
    {
      id: 3,
      changes: { a: "b", c: "f" },
      recipe_id: 1,
      revision_number: 3,
      test: true
    },
    {
      id: 4,
      changes: { a: "b", c: "e" },
      recipe_id: 1,
      revision_number: 4,
      test: true
    },
    {
      id: 5,
      changes: { a: "b", c: "g" },
      recipe_id: 1,
      revision_number: 5,
      test: true
    },
    {
      id: 6,
      changes: { a: "b", c: "h" },
      recipe_id: 1,
      revision_number: 6,
      test: true
    },
    {
      id: 7,
      changes: { a: "b", c: "i" },
      recipe_id: 1,
      revision_number: 7,
      test: true
    },
    {
      id: 8,
      changes: { a: "b", c: "l" },
      recipe_id: 1,
      revision_number: 8,
      test: true
    },
    {
      recipe_id: 2,
      changes: []
    }
  ];
  test("Responds with 200 if successful", async () => {
    version_model.get_all_versions = jest.fn(() => {
      return new Promise(res => setTimeout(() => res(fake_db), 0));
    });

    const expected_versions = fake_db;

    const response = await request(server).get("/recipes/1/versions/");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected_versions);
    expect(version_model.get_all_versions).toHaveBeenCalledTimes(1);
    version_model.get_all_versions.mockReset();
  });

  test("Returns message if the model returns an empty array", async () => {
    version_model.get_all_versions = jest.fn(
      () => new Promise(res => setTimeout(() => res([]), 0))
    );

    const expected_msg = /don't have any/i;

    const response = await request(server).get("/recipes/2/versions/");

    expect(response.status).toEqual(400);
    expect(response.body.message).toMatch(expected_msg);
    expect(version_model.get_all_versions).toHaveBeenCalledTimes(1);
  });

  test("returns 500 if unsuccessful", async () => {
    version_model.get_all_versions = jest.fn(() => {
      throw { detail: "error" };
    });
    const expected_error = "error";

    const response = await request(server).get("/recipes/4/versions");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(version_model.get_all_versions).toHaveBeenCalledTimes(1);
    version_model.get_all_versions.mockReset();
  });
});

describe("GET /recipes/:id/version/:rev_id", () => {
  test("Responds with 200 if successful", async () => {
    version_model.get_version_by_id = jest.fn((id, rev_id) => {
      return new Promise(res => {
        setTimeout(
          () => res({ recipe_id: Number(id), id: Number(rev_id), test: true }),
          0
        );
      });
    });

    const expected_version = {
      id: 2,
      recipe_id: 1,
      test: true
    };

    const response = await request(server).get("/recipes/1/version/2");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected_version);
    expect(version_model.get_version_by_id).toHaveBeenCalledTimes(1);
    version_model.get_version_by_id.mockReset();
  });

  test("Response with 400 if the model returns nothing", async () => {
    version_model.get_version_by_id = jest.fn(() => null);
    const expected_error = /matches/i;

    const response = await request(server).get("/recipes/1/version/9");

    expect(response.status).toEqual(400);
    expect(response.body.message).toMatch(expected_error);
    expect(version_model.get_version_by_id).toHaveBeenCalledTimes(1);
    version_model.get_version_by_id.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    version_model.get_version_by_id = jest.fn(() => {
      throw { detail: "error" };
    });
    const expected_error = "error";

    const response = await request(server).get("/recipes/1/version/9");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(version_model.get_version_by_id).toHaveBeenCalledTimes(1);
    version_model.get_version_by_id.mockReset();
  });
});

describe("GET /recipes/:id/versions/:rev_num", () => {
  test("Responds with 200 if successful", async () => {
    version_model.get_version_by_num = jest.fn((id, rev_num) => {
      return new Promise(res => {
        setTimeout(
          () =>
            res({
              recipe_id: Number(id),
              revision_number: Number(rev_num),
              test: true
            }),
          0
        );
      });
    });

    const expected_version = {
      revision_number: 2,
      recipe_id: 1,
      test: true
    };

    const response = await request(server).get("/recipes/1/versions/2");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected_version);
    expect(version_model.get_version_by_num).toHaveBeenCalledTimes(1);
    version_model.get_version_by_num.mockReset();
  });

  test("Response with 400 if the model returns nothing", async () => {
    version_model.get_version_by_num = jest.fn(() => null);
    const expected_error = /matches/i;

    const response = await request(server).get("/recipes/1/versions/9");

    expect(response.status).toEqual(400);
    expect(response.body.message).toMatch(expected_error);
    expect(version_model.get_version_by_num).toHaveBeenCalledTimes(1);
    version_model.get_version_by_num.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    version_model.get_version_by_num = jest.fn(() => {
      throw { detail: "error" };
    });
    const expected_error = "error";

    const response = await request(server).get("/recipes/1/versions/66");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(version_model.get_version_by_num).toHaveBeenCalledTimes(1);
    version_model.get_version_by_num.mockReset();
  });
});
