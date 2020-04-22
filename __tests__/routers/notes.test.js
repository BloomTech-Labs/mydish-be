const notes_router = require('../../endpoints/routers/notes');
const notes_model = require('../../endpoints/models/notes');
const validate = require('../../endpoints/middleware/validate');

jest.mock("../../endpoints/middleware/validate", () => {
    return {
      user: (req, res, next) => next(),
      token: (req, res, next) => {
        req.user = {id: 1};
        next();
      },
      admin: (req, res, next) => next(),
      note: (req, res, next) => {
        res.locals.note = req.body;
        next();
      },
      user_note: (req, res, next) => next(),
    };
  });
  
  // Set up our test server
  const request = require("supertest");
  const express = require("express");
  const server = express();
  server.use(express.json());
  server.use(notes_router);
  
  test("We are in the test environment", () => {
    const env = process.env.DB_ENVIRONMENT;
    expect(env).toBe("testing");
  });
  
  describe('POST "/notes"', () => {
    test("Returns 200 if successful", async () => {
      const new_note = {
      };
      notes_model.add_one = jest.fn(
        () =>
          new Promise(res => {
            setTimeout(() => res({note_id: 1}), 0);
          }),
      );
      notes_model.get_one = jest.fn(
        req_id =>
          new Promise(res => {
            setTimeout(
              () => res({...new_note, owner_id: 1, id: req_id.id, test: true}),
              0,
            );
          }),
      );
      const expected_note = {
        ...new_note,
        note_id: 1,
      };
  
      const response = await request(server)
        .post("/notes")
        .send(new_note)
        .set("Accept", "application/json");
  
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expected_note);
      expect(notes_model.add_one).toHaveBeenCalledTimes(1);
      notes_model.add_one.mockReset();
    });
  
    test("Returns 500 if no new_note is returned", async () => {
        const new_note = {
            recipe_id: 1,
            decription: "Delicious!"
          };

      notes_model.add_one = 
        jest.fn(() => {throw {detail: "error"};
    });

      notes_model.get_one = jest.fn(
        req_id =>
          new Promise(res => {
            setTimeout(() => res({note_id: 1}), 0);
          }),
      );
      const expected_error = /error/i;
  
      const response = await request(server)
        .post("/notes")
        .send(new_note)
        .set("Accept", "application/json");
      expect(response.status).toEqual(500);
      expect(response.body).toMatch(expected_error);
      expect(notes_model.add_one).toHaveBeenCalledTimes(1);
      notes_model.add_one.mockReset();
    });
  
    test("Returns 500 if unsuccessful", async () => {
      notes_model.add_one = jest.fn(() => {
        throw {detail: "error"};
      });
      const expected_error = "error";
      const new_note = {
        note_id: 1,
        decription: "Delicious!"
      };
  
      const response = await request(server)
        .post("/notes")
        .send(new_note)
        .set("Accept", "application/json");
  
      expect(response.status).toEqual(500);
      expect(response.body).toEqual(expected_error);
      expect(notes_model.add_one).toHaveBeenCalledTimes(1);
      notes_model.add_one.mockReset();
    });
  
  });
  
  describe('GET "/notes/:id"', () => {
    test("Returns 200 if successful", async () => {
      notes_model.get_one = jest.fn(
        id_obj =>
          new Promise(res => {
            setTimeout(() => res({id: Number(id_obj.id), test: true}), 0);
          }),
      );
      const expected_note = {
        id: 1, // We will test for note id 1
        test: true,
      };
  
      const response = await request(server).get("/notes/1");
  
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expected_note);
      expect(notes_model.get_one).toHaveBeenCalledTimes(1);
      notes_model.get_one.mockReset();
    });
  
    test("Returns 404 if the model returns nothing", async () => {
      notes_model.get_one = jest.fn(() => null);
      const expected_error = /No instruction found./i;
  
      const response = await request(server).get("/notes/1");
  
      expect(response.status).toEqual(404);
      expect(response.body).toMatch(expected_error);
      expect(notes_model.get_one).toHaveBeenCalledTimes(1);
      notes_model.get_one.mockReset();
    });
  
    test("returns 500 if unsuccessful", async () => {
      notes_model.get_one = jest.fn(() => {
        throw {detail: "error"};
      });
      const expected_error = "error";
  
      const response = await request(server).get("/notes/1");
  
      expect(response.status).toEqual(500);
      expect(response.body).toEqual(expected_error);
      expect(notes_model.get_one).toHaveBeenCalledTimes(1);
      notes_model.get_one.mockReset();
    });
  });
  
  describe('GET "/notes"', () => {
    // We will use this fake_db in our tests
    const fake_db = [
      {title: "test1", test: true},
      {title: "test2", test: true},
      {title: "test22", test: true},
      {title: "test3", test: true},
    ];
    test("returns 200 if no search is given", async () => {
      notes_model.get_all = jest.fn(
        title_search =>
          new Promise(res => {
            setTimeout(
              // Actually filter the fake_db to emulate a search
              () => res(fake_db),
              0,
            );
          }),
      );
      // We should return all of our database on an empty search
      const expected_notes = fake_db;
  
      const response = await request(server).get("/notes");
  
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expected_notes);
      expect(notes_model.get_all).toHaveBeenCalledTimes(1);
      notes_model.get_all.mockReset();
    });
    test("Returns 200 if search is successful", async () => {
      notes_model.get_all = jest.fn(
        title_search =>
          new Promise(res => {
            setTimeout(
              // Actually filter the fake_db to emulate a search
              () => res(fake_db),
              0,
            );
          }),
      );
      const expected_notes = fake_db;
  
      const response = await request(server).get("/notes?title=t2");
  
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expected_notes);
      expect(notes_model.get_all).toHaveBeenCalledTimes(1);
      notes_model.get_all.mockReset();
    });
  
    test("Returns 404 if the model returns an empty array", async () => {
      notes_model.get_all = jest.fn(() => []);
      const expected_error = /No instructions found./i;
  
      const response = await request(server).get("/notes");
  
      expect(response.status).toEqual(404);
      expect(response.body).toMatch(expected_error);
      expect(notes_model.get_all).toHaveBeenCalledTimes(1);
      notes_model.get_all.mockReset();
    });
  
    test("returns 500 if unsuccessful", async () => {
      notes_model.get_all = jest.fn(() => {
        throw {detail: "error"};
      });
      const expected_error = "error";
  
      const response = await request(server).get("/notes");
  
      expect(response.status).toEqual(500);
      expect(response.body).toEqual(expected_error);
      expect(notes_model.get_all).toHaveBeenCalledTimes(1);
      notes_model.get_all.mockReset();
    });
  });
  
  describe('GET "/cookbook"', () => {
    // We will use this fake_db in our tests
    const fake_db = [
      {title: "test1", course: "breakfast", test: true},
      {title: "test2", course: "lunch", test: true},
      {title: "test22", course: "breakfast", test: true},
      {title: "test3", course: "dinner", test: true},
    ];
    test("Returns 200 if cookbook search is successful", async () => {
      notes_model.get_by_course = jest.fn(
        (id, course) =>
          new Promise(res => {
            setTimeout(
              () => res(fake_db),
              0,
            );
          }),
      );
      const expected_notes = fake_db;
  
      const response = await request(server).get("/cookbook?course=breakfast");
  
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expected_notes);
      expect(notes_model.get_by_course).toHaveBeenCalledTimes(1);
      notes_model.get_by_course.mockReset();
    });
  
    test("Returns empty array if the model returns empty", async () => {
      notes_model.get_by_course = jest.fn(() => []);
      const expected_response = [];
  
      const response = await request(server).get("/cookbook?course=snack");
  
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expected_response);
      expect(notes_model.get_by_course).toHaveBeenCalledTimes(1);
      notes_model.get_by_course.mockReset();
    });
  
    test("returns 500 if unsuccessful", async () => {
      notes_model.get_by_course = jest.fn(() => {
        throw {detail: "error"};
      });
      const expected_error = {detail: "error"};
  
      const response = await request(server).get("/cookbook");
  
      expect(response.status).toEqual(500);
      expect(response.body).toEqual(expected_error);
      expect(notes_model.get_by_course).toHaveBeenCalledTimes(1);
      notes_model.get_by_course.mockReset();
    });
  });
  
  describe("PUT /notes/:id", () => {
    test("Returns 200 if successful", async () => {
      // When we update successfully, we then get_one from the database
      // So... we need to mock two functions
      //     One to "update", and one to "get".
      // Our expected response is the "get" response
      notes_model.update_one = jest.fn(
        () => new Promise(res => setTimeout(() => res({test: true, title: "test"})), 0),
      );
      notes_model.get_one = jest.fn(
        () =>
          new Promise(res =>
            setTimeout(() => res({title: "test", test: true}), 0),
          ),
      );
  
      const expected_response = {title: "test", test: true}; // success = 1
  
      const response = await request(server)
        .put("/notes/2")
        .send({body: "updates", test: true})
        .set("Accept", "application/json");
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expected_response);
      expect(notes_model.update_one).toHaveBeenCalledTimes(1);
      notes_model.update_one.mockReset();
    });
  
    test("Returns 404 with a falsey return value", async () => {
      notes_model.update_one = jest.fn(
        () => new Promise(res => setTimeout(() => res(false)), 0),
      );
  
      const expected_error = /couldn't update/i; // success = 1
  
      const response = await request(server)
        .put("/notes/25")
        .send({body: "updates", test: true})
        .set("Accept", "application/json");
  
      expect(response.status).toBe(404);
      expect(response.body).toMatch(expected_error);
      expect(notes_model.update_one).toHaveBeenCalledTimes(1);
      notes_model.update_one.mockReset();
    });
  
    test("Returns 500 if unsuccessful", async () => {
      notes_model.update_one = jest.fn(() => {
        throw {detail: "error"};
      });
      const expected_error = "error";
  
      const response = await request(server)
        .put("/notes/2")
        .send({body: "updates", test: true})
        .set("Accept", "application/json");
  
      expect(response.status).toEqual(500);
      expect(response.body).toEqual(expected_error);
      expect(notes_model.update_one).toHaveBeenCalledTimes(1);
      notes_model.update_one.mockReset();
    });
  
    test("returns 404 if there's a custom error", async () => {
        notes_model.update_one = jest.fn(() => {
            return new Promise((res) => setTimeout(() => res(), 0));
          });
          const expected_message = "Couldn't update instruction";
          const response = await request(server).put("/notes/2");
          expect(response.status).toBe(404);
          expect(response.body).toEqual(expected_message);
          expect(notes_model.update_one).toHaveBeenCalledTimes(1);
          notes_model.update_one.mockReset();
    });
  });
  
  describe('DELETE "/notes"', () => {
    test("Returns 200 if successful", async () => {
      notes_model.remove_one = jest.fn(
        () =>
          new Promise(res => {
            setTimeout(() => res([{title: "test_title"}]), 0);
          }),
      );
      const expected_response = /undefined has been terminated./i;
  
      const response = await request(server).delete("/notes/1");
  
      expect(response.status).toEqual(200);
      expect(response.body).toMatch(expected_response);
      expect(notes_model.remove_one).toHaveBeenCalledTimes(1);
      notes_model.remove_one.mockReset();
    });
  
    test("returns 500 if unsuccessful", async () => {
      notes_model.remove_one = jest.fn(() => {
        throw {detail: "error"};
      });
      const expected_error = "error";
  
      const response = await request(server).delete("/notes/1");
  
      expect(response.status).toEqual(500);
      expect(response.body).toEqual(expected_error);
      expect(notes_model.remove_one).toHaveBeenCalledTimes(1);
      notes_model.remove_one.mockReset();
    });
  });
  
  describe('DELETE "/notes/:id"', () => {
    test("Returns 200 if successful", async () => {
      notes_model.remove_all = jest.fn(
        () =>
          new Promise(res => {
            setTimeout(() => res(true), 0);
          }),
      );
      const expected_response = /All instructions have been eliminated./i;
  
      const response = await request(server).delete("/notes");
  
      expect(response.status).toEqual(200);
      expect(response.body).toMatch(expected_response);
      expect(notes_model.remove_all).toHaveBeenCalledTimes(1);
      notes_model.remove_all.mockReset();
    });
  
    test("returns 500 if unsuccessful", async () => {
      notes_model.remove_all = jest.fn(() => {
        throw {detail: "error"};
      });
      const expected_error = "error";
  
      const response = await request(server).delete("/notes");
  
      expect(response.status).toEqual(500);
      expect(response.body).toEqual(expected_error);
      expect(notes_model.remove_all).toHaveBeenCalledTimes(1);
      notes_model.remove_all.mockReset();
    });
  });

