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

describe("/GET instructions/:id", () => {
  test("Returns 200 if successful", async () => {
    instructions_model.get_one = jest.fn(
      (id_obj) =>
        new Promise((res) => {
          setTimeout(() => res({id: Number(id_obj.id), test: true}), 0);
        }),
    );
    const expected_instruction = {
      id: 1,
      test: true,
    };

    const response = await request(server).get("/instructions/1");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected_instruction);
    expect(instructions_model.get_one).toHaveBeenCalledTimes(1);
    instructions_model.get_one.mockReset();
  });

  test("Returns 404 if the model returns nothing", async () => {
    instructions_model.get_one = jest.fn(() => null);
    const expected_error = /no instruction/i;

    const response = await request(server).get("/instructions/1");

    expect(response.status).toEqual(404);
    expect(response.body).toMatch(expected_error);
    expect(instructions_model.get_one).toHaveBeenCalledTimes(1);
    instructions_model.get_one.mockReset();
  });

  test("returns 500 if unsuccessful", async () => {
    instructions_model.get_one = jest.fn(() => {
      throw {detail: "error"};
    });
    const expected_error = "error";

    const response = await request(server).get("/instructions/1");

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expected_error);
    expect(instructions_model.get_one).toHaveBeenCalledTimes(1);
    instructions_model.get_one.mockReset();
  });
});

describe("GET /instructions", () => {
  const fake_db = [
    {id: 1, recipe_id: 1, step_number: 1, description: "Cook the sausage!"},
    {
      id: 2,
      recipe_id: 2,
      step_number: 1,
      description: "Eat! Das ist sehr gut!!!",
    },
  ];

  test("Responds with 200 if successful", async () => {
    instructions_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_instructions = fake_db;

    const response = await request(server).get("/instructions/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_instructions);
    expect(instructions_model.get_all).toHaveBeenCalledTimes(1);
    instructions_model.get_all.mockReset();
  });

  test("Responsds with 404 if no instructions", async () => {
    instructions_model.get_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res([]), 0));
    });

    const expected_message = "No instructions found.";

    const response = await request(server).get("/instructions/");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(instructions_model.get_all).toHaveBeenCalledTimes(1);
    instructions_model.get_all.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    instructions_model.get_all = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).get("/instructions/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(instructions_model.get_all).toHaveBeenCalledTimes(1);
    instructions_model.get_all.mockReset();
  });
});

describe("PUT /instructions/:id", () => {
  const fake_db = {
    id: 1,
    recipe_id: 1,
    step_number: 1,
    description: "Roll the meat into spheres for the meatballs",
  };

  test("Responds with 200 if successful", async () => {
    instructions_model.update_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_instruction = fake_db;

    const response = await request(server).put("/instructions/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_instruction);
    expect(instructions_model.update_one).toHaveBeenCalledTimes(1);
    instructions_model.update_one.mockReset();
  });

  test("Responsds with 404 if no instruction", async () => {
    instructions_model.update_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "Couldn't update instruction";

    const response = await request(server).put("/instructions/2");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(instructions_model.update_one).toHaveBeenCalledTimes(1);
    instructions_model.update_one.mockReset();
  });

  test("Responsds with 500 if unsuccessful", async () => {
    instructions_model.update_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).put("/instructions/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(instructions_model.update_one).toHaveBeenCalledTimes(1);
    instructions_model.update_one.mockReset();
  });
});

describe("DELETE /instructions/:id", () => {
  const fake_db = {
    id: 1,
    recipe_id: 1,
    step_number: 1,
    description: "Roll the meat into spheres for the meatballs",
  };

  test("Responds with 200 if successful", async () => {
    instructions_model.remove_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(fake_db), 0));
    });

    const expected_message = `${fake_db.id} has been terminated.`;

    const response = await request(server).delete("/instructions/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_message);
    expect(instructions_model.remove_one).toHaveBeenCalledTimes(1);
    instructions_model.remove_one.mockReset();
  });

  test("Responsds with 404 if no instruction exists", async () => {
    instructions_model.remove_one = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "Couldn't find instruction 2.";

    const response = await request(server).delete("/instructions/2");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expected_message);
    expect(instructions_model.remove_one).toHaveBeenCalledTimes(1);
    instructions_model.remove_one.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    instructions_model.remove_one = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).delete("/instructions/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(instructions_model.remove_one).toHaveBeenCalledTimes(1);
    instructions_model.remove_one.mockReset();
  });
});

describe("DELETE /instructions", () => {
  test("Responds with 200 if successful", async () => {
    instructions_model.remove_all = jest.fn(() => {
      return new Promise((res) => setTimeout(() => res(), 0));
    });

    const expected_message = "All instructions have been eliminated.";

    const response = await request(server).delete("/instructions/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected_message);
    expect(instructions_model.remove_all).toHaveBeenCalledTimes(1);
    instructions_model.remove_all.mockReset();
  });

  test("Responds with 500 if unsuccessful", async () => {
    instructions_model.remove_all = jest.fn(() => {
      throw {detail: "error"};
    });

    const expected_error = "error";

    const response = await request(server).delete("/instructions/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expected_error);
    expect(instructions_model.remove_all).toHaveBeenCalledTimes(1);
    instructions_model.remove_all.mockReset();
  });
});
