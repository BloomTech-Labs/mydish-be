const images_router = require("../../endpoints/routers/images");
const recipes_model = require("../../endpoints/models/recipes");
const validate = require("../../endpoints/middleware/validate");
const imageUpload = require("../../endpoints/middleware/image-upload");

// Set up our test server
const request = require("supertest");
const express = require("express");
const server = express();
server.use(express.json());
server.use(images_router);

describe("POST /image_upload", () => {
  test("returns 500 error if image is invalid", async () => {
    const response = await request(server)
      .post("/image_upload")
      .send({ img: "Muahaha, I'm a string!" });

    expect(response.status).toEqual(500);
  });
});
