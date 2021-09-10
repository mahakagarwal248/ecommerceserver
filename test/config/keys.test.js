const assert = require("assert");
const config = require("../../config/keys");

describe("Test config file", ()=>{
    it("should return an object of the configurations", async ()=>{
        assert.strictEqual("object", typeof config);
    });
});