// the node crypto api gives us tols for encrypting and decrypting data.

const crypto = require("crypto");
// class : Cipher

let algo = "aes-192-cbc";
let password = "password123";

const valEnc = crypto.scrypt(password, "salt", 24, (err, key) => {
  if (err) throw new Error(err.message);

  crypto.randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw new Error(err.message);

    const cipher = crypto.createCipheriv(algo, key, iv);

    let enc = "";

    cipher.setEncoding("utf8");

    cipher.on("data", (data) => {
      enc = enc += data;
    });

    cipher.on("end", () => {
      console.log(enc);
    });

    cipher.write("something");
    cipher.end();
  });
});
