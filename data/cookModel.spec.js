const server = require('../server.js');
const request = require('supertest');
const Cooks = require('./cookModel.js');
const db = require("./dbConfig");


describe("cooks model", () => {
    beforeEach(async () => {
        await db("cooks").del();
    });

    it("should set environment to testing", () => {
        expect(process.env.NODE_ENV).toBe("testing");
    });

    describe("insert()", () => {
        it("should insert hobbits into the db", async () => {
            //insert a record
            await Cooks.insert({ username: "test", password: "test" });
            //assert the record was inserted
            let cook = await db("cooks");
            console.log(cook);

            //assert the record was inserted
            expect(cook).toHaveLength(1);
        });
    });

    describe("cooks", () => {
        it('get /', async () => {
            const res = await request(server).get('/cooks');
            expect(res.status).toBe(400);
            //no valid token
        })

        it('post /', async () => {
            const res = await request(server).post('/cooks/register').send({ username: "Yurika", password: "testpassword3" });
            expect(res.status).toBe(201);
        })

        it('post /', async () => {
            const res = await request(server).post('/cooks/login').send({ username: "test", password: "test" });
            expect(res.status).toBe(401);
        })
    })



})
