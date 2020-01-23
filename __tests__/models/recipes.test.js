const recipes_model = require("../../endpoints/models/recipes");

test("We are in the test environment", () => {
    const env = process.env.DB_ENVIRONMENT;
    expect(env).toBe("testing")
})