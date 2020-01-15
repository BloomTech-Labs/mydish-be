const rec_ingredients_model = require("../../endpoints/models/recommended_ingredients");

test("We are in the test environment", () => {
    const env = process.env.DB_ENVIRONMENT;
    expect(env).toBe("testing")
})