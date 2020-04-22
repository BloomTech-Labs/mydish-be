const tags_router = require("../../endpoints/routers/tags");
const tags_model = require("../../endpoints/models/tags");

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
server.use(tags_router);

test("We are in the test environment", () => {
  const env = process.env.DB_ENVIRONMENT;
  expect(env).toBe("testing");
});

describe("GET /tags", () => {
  const fake_db = [
    {id: 1, name: "Breakfast"},
    {id: 2, name: "Brunch"},
  ];

  test("Responds with 200 if successful", async () => {
    tags_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_tags = fake_db;

    const response = await request(server).get("/tags/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_tags);
    expect(tags_model.get_all).toHaveBeenCalledTimes(1);
    tags_model.get_all.mockReset();
  });

  test("Responsds with 404 if no tags", async () => {
    tags_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res([]), 0));
    });

    const expected_message = "No tags found.";

    const response = await request(server).get("/tags/");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(tags_model.get_all).toHaveBeenCalledTimes(1);
    tags_model.get_all.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    tags_model.get_all = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).get("/tags/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(tags_model.get_all).toHaveBeenCalledTimes(1);
    tags_model.get_all.mockReset();
  });
});

describe("POST /tags", () => {
  const new_tag = {
    name: "Supper",
  };

  test("Responds with 200 if successful", async () => {
    tags_model.add_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(new_tag), 0));
    });

    const expected_tag = new_tag;

    const response = await request(server).post("/tags/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_tag);
    expect(tags_model.add_one).toHaveBeenCalledTimes(1);
    tags_model.add_one.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    tags_model.add_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).post("/tags/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(tags_model.add_one).toHaveBeenCalledTimes(1);
    tags_model.add_one.mockReset();
  });
});

describe("GET /tags/:id", () => {
  const fake_db = [
    {id: 1, name: "Breakfast"},
    {id: 2, name: "Brunch"},
  ];

  test("Responds with 200 if successful", async () => {
    tags_model.get_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_tag = fake_db;

    const response = await request(server).get("/tags/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_tag);
    expect(tags_model.get_one).toHaveBeenCalledTimes(1);
    tags_model.get_one.mockReset();
  });

  test("Responsds with 404 if no tags", async () => {
    tags_model.get_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "No tag found.";

    const response = await request(server).get("/tags/3");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(tags_model.get_one).toHaveBeenCalledTimes(1);
    tags_model.get_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    tags_model.get_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).get("/tags/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(tags_model.get_one).toHaveBeenCalledTimes(1);
    tags_model.get_one.mockReset();
  });
});

describe("PUT /tags/:id", () => {
  const fake_db = {id: 1, name: "Breakfast"};

  test("Responds with 200 if successful", async () => {
    tags_model.update_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_tag = fake_db;

    const response = await request(server).put("/tags/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_tag);
    expect(tags_model.update_one).toHaveBeenCalledTimes(1);
    tags_model.update_one.mockReset();
  });

  test("Responsds with 404 if no tag", async () => {
    tags_model.update_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "Couldn't update tag";

    const response = await request(server).put("/tags/2");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(tags_model.update_one).toHaveBeenCalledTimes(1);
    tags_model.update_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    tags_model.update_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).put("/tags/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(tags_model.update_one).toHaveBeenCalledTimes(1);
    tags_model.update_one.mockReset();
  });
});

describe("DELETE /tags/:id", () => {
  const fake_db = {id: 1, name: "Breakfast"};

  test("Responds with 200 if successful", async () => {
    tags_model.remove_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_message = `${fake_db.id} has been terminated.`;

    const response = await request(server).delete("/tags/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_message);
    expect(tags_model.remove_one).toHaveBeenCalledTimes(1);
    tags_model.remove_one.mockReset();
  });

  test("Responsds with 404 if no tags", async () => {
    tags_model.remove_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "Couldn't find tag 2.";

    const response = await request(server).delete("/tags/2");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(tags_model.remove_one).toHaveBeenCalledTimes(1);
    tags_model.remove_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    tags_model.remove_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).delete("/tags/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(tags_model.remove_one).toHaveBeenCalledTimes(1);
    tags_model.remove_one.mockReset();
  });
});

describe("DELETE /tags", () => {
  test("Responds with 200 if successful", async () => {
    tags_model.remove_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "All tags have been eliminated.";

    const response = await request(server).delete("/tags/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_message);
    expect(tags_model.remove_all).toHaveBeenCalledTimes(1);
    tags_model.remove_all.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    tags_model.remove_all = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).delete("/tags/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(tags_model.remove_all).toHaveBeenCalledTimes(1);
    tags_model.remove_all.mockReset();
  });
});
