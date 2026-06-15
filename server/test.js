const assert = require("assert");

function calculateHours(hours) {
    return hours > 0;
}

assert.equal(calculateHours(5), true);

console.log("All tests passed");