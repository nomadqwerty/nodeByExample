// assert api has functions used for verifying value.
// sort of a comparision api. for testing actual result vs expected result.
// assert.AssertionErrors class
// instance of Error class.

const assert = require("assert");

const optionsObj = {
  message: "values are differnt",
  actual: 0,
  expected: 0,
  operator: "strictEqual",
};
const assertThis = new assert.AssertionError(optionsObj);

try {
  assert.strictEqual(1, 2);
} catch (error) {
  console.log(error.message);
  console.log(error instanceof assert.AssertionError);
  //   assert.strictEqual(error.message, assertThis.message);
  console.log(error.actual);
  console.log(error.expected);
}

//assert(value,message)
const symb1 = Symbol();
const symb2 = Symbol();
const obj1 = {
  a: {
    b: {
      c: 1,
      symb1,
    },
  },
};
const obj2 = {
  a: {
    b: {
      c: 1,
      symb2,
    },
  },
};

try {
  //   assert("0", "it is falsy");
  //  deepStrictEqual(actual,expected,message)/deepEqual this performs a recursive comparison of objects. checks for deep equality: recursive, use for object comparision

  assert.deepEqual(obj1, obj2, new Error("it is falsy"));
  assert.deepStrictEqual(obj1, obj2, new Error("it is falsy"));
} catch (err) {
  // console.log(err.message);
}

//assert.doesNotMatch(str,reqex,msg)
try {
  //use to check for matching characters in stringResult
  // if there is match an error is thrown because it shouldnnot match
  assert.doesNotMatch("there is a match", /match/, "there is a match");
} catch ({ message, actual, expected }) {
  // console.log(message);
}

//assert.doesNotReject.
assert.doesNotReject(
  Promise.reject().catch((err) => console.log(err)),
  /error/,
  "message"
);

assert.doesNotThrow(
  () => {
    try {
      throw new Error("please catch me");
    } catch (error) {
      console.log(error.message);
    }
  },
  /error/,
  "message"
);

// assert.equal(actual, expected,msg)
// test equality

try {
  assert.equal(1, true, "i am used for checking if values are ==");
  // assert.fail(new Error("i am used for throwing assertion errors"));
  // assert.ifError(new Error("i am used for throw errors to"));
  // assert.match(
  //   "this is for strings",
  //   /strings, my arg is for regex patterns/,
  //   "this fucntion is used to check if strings are =="
  // );
} catch (error) {
  console.log(error.message, "here");
}

let obj3 = {
  a: {
    b: { c: { [Symbol()]: 1 } },
  },
};
let obj4 = {
  a: {
    b: { c: { [Symbol()]: 1 } },
  },
};

try {
  assert.notDeepEqual(obj3, obj3, "i will throw errors if objects are ==");
} catch (error) {}

// assert.notEqual
try {
  assert.notEqual(1, 1, "i throw errors if values are ==");
} catch (error) {
  console.log(error.message);
}

//assert.ok()
try {
  assert.ok(0, "i test if values are truthy");
} catch (error) {
  console.log(error.message);
}

try {
  assert.rejects(
    () => {
      return Promise.reject();
    },
    {
      name: "error",
      message: "rejected promise",
    }
  );
} catch (error) {
  console.log(error.message);
}
