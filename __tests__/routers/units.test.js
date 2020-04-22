const units_router = require("../../endpoints/routers/units");
const units_model = require("../../endpoints/models/units");

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
server.use(units_router);

test("We are in the test environment", () => {
  const env = process.env.DB_ENVIRONMENT;
  expect(env).toBe("testing");
});

describe("GET /units", () => {
  const fake_db = [
    {id: 1, name: "tsp"},
    {id: 2, name: "oz"},
  ];

  test("Responds with 200 if successful", async () => {
    units_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_units = fake_db;

    const response = await request(server).get("/units/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_units);
    expect(units_model.get_all).toHaveBeenCalledTimes(1);
    units_model.get_all.mockReset();
  });

  test("Responsds with 404 if no units", async () => {
    units_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res([]), 0));
    });

    const expected_message = "No units found.";

    const response = await request(server).get("/units/");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(units_model.get_all).toHaveBeenCalledTimes(1);
    units_model.get_all.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    units_model.get_all = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).get("/units/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(units_model.get_all).toHaveBeenCalledTimes(1);
    units_model.get_all.mockReset();
  });
});

describe("POST /units", () => {
  const new_unit = {
    name: "fluid oz",
  };

  test("Responds with 200 if successful", async () => {
    units_model.add_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(new_unit), 0));
    });

    const expected_unit = new_unit;

    const response = await request(server).post("/units/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_unit);
    expect(units_model.add_one).toHaveBeenCalledTimes(1);
    units_model.add_one.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    units_model.add_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).post("/units/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(units_model.add_one).toHaveBeenCalledTimes(1);
    units_model.add_one.mockReset();
  });
});

describe("GET /units/:id", () => {
  const fake_db = [
    {id: 1, name: "tsp"},
    {id: 2, name: "oz"},
  ];

  test("Responds with 200 if successful", async () => {
    units_model.get_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_unit = fake_db;

    const response = await request(server).get("/units/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_unit);
    expect(units_model.get_one).toHaveBeenCalledTimes(1);
    units_model.get_one.mockReset();
  });

  test("Responsds with 404 if no units", async () => {
    units_model.get_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "No unit found.";

    const response = await request(server).get("/units/3");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(units_model.get_one).toHaveBeenCalledTimes(1);
    units_model.get_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    units_model.get_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).get("/units/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(units_model.get_one).toHaveBeenCalledTimes(1);
    units_model.get_one.mockReset();
  });
});

describe("PUT /units/:id", () => {
  const fake_db = {id: 1, name: "tsp"};

  test("Responds with 200 if successful", async () => {
    units_model.update_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_unit = fake_db;

    const response = await request(server).put("/units/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_unit);
    expect(units_model.update_one).toHaveBeenCalledTimes(1);
    units_model.update_one.mockReset();
  });

  test("Responsds with 404 if no unit", async () => {
    units_model.update_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "Couldn't update unit";

    const response = await request(server).put("/units/2");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(units_model.update_one).toHaveBeenCalledTimes(1);
    units_model.update_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    units_model.update_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).put("/units/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(units_model.update_one).toHaveBeenCalledTimes(1);
    units_model.update_one.mockReset();
  });
});

describe("DELETE /units/:id", () => {
  const fake_db = {id: 1, name: "tsp"};

  test("Responds with 200 if successful", async () => {
    units_model.remove_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_message = `${fake_db.name} has been terminated.`;

    const response = await request(server).delete("/units/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_message);
    expect(units_model.remove_one).toHaveBeenCalledTimes(1);
    units_model.remove_one.mockReset();
  });

  test("Responsds with 404 if no units", async () => {
    units_model.remove_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "Couldn't find unit 2.";

    const response = await request(server).delete("/units/2");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(units_model.remove_one).toHaveBeenCalledTimes(1);
    units_model.remove_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    units_model.remove_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).delete("/units/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(units_model.remove_one).toHaveBeenCalledTimes(1);
    units_model.remove_one.mockReset();
  });
});

describe("DELETE /units", () => {
  test("Responds with 200 if successful", async () => {
    units_model.remove_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "All units have been eliminated.";

    const response = await request(server).delete("/units/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_message);
    expect(units_model.remove_all).toHaveBeenCalledTimes(1);
    units_model.remove_all.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    units_model.remove_all = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).delete("/units/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(units_model.remove_all).toHaveBeenCalledTimes(1);
    units_model.remove_all.mockReset();
  });
});
