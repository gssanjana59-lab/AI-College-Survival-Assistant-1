const assert = require("assert");

function validateCGPA(cgpa) {
    return cgpa >= 0 && cgpa <= 10;
}

function validateAttendance(attendance) {
    return attendance >= 0 && attendance <= 100;
}

function validateHours(hours) {
    return hours > 0;
}

assert.strictEqual(validateCGPA(8), true);
assert.strictEqual(validateCGPA(12), false);

assert.strictEqual(validateAttendance(80), true);
assert.strictEqual(validateAttendance(120), false);

assert.strictEqual(validateHours(4), true);
assert.strictEqual(validateHours(0), false);

console.log("All tests passed ✅");