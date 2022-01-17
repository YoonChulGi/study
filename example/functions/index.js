const functions = require("firebase-functions");
const apiserver = require("./apiserver");
exports.apiserver = functions.https.onRequest(apiserver);
