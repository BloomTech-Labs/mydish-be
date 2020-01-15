const rec_ingredients_router = require("../../endpoints/routers/recommended_ingredients");

test("We are in the test environment", () => {
    const env = process.env.DB_ENVIRONMENT;
    expect(env).toBe("testing")
})