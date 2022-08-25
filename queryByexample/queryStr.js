const qS = require("querystring");

let qStr = "&topic=api&type=rest&framework=node";

// converts unsafe ascii chars to %, .escape()
const percentEnc = qS.escape(qStr);

// removes % encoding,.unescape()
const percentDc = qS.unescape(percentEnc);

//.parse: split queries into key value pairs.
const parsedQuery = qS.parse(qStr, "&", "=", {
  decodedURIComponent: qS.unescape(),
  maxKeys: 0,
});

// .stringify, this turns a parse url obj back into a urlqString.
const unparsed = qS.stringify(parsedQuery);

console.log(unparsed);
