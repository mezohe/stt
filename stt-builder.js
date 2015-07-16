// // load peg.js and the file system module
var fs = require("fs")
var PEG = require("pegjs")
// // read peg and build a parser
var camxes_peg = fs.readFileSync("stt.js.peg").toString();
var camxes = PEG.buildParser(camxes_peg, {
  cache: true, 
  output: "source",
  allowedStartRules: [
    "text",
    "BRIVLA_clause",
    "CMAVO",
    "BRIVLA",
    "gismu",
    "stressed_syllable",
    "consonantal_syllable",
    "unstressed_syllable",
    "brivla_core",
    "slinkuhi",
  ],
});
// // write to a file
// fs.writeFileSync("\camxes.js", camxes.toSource());
var fd = fs.openSync("stt.js", 'w+');
var buffer = new Buffer('var camxes = ');
fs.writeSync(fd, buffer, 0, buffer.length);
buffer = new Buffer(camxes);
fs.writeSync(fd, buffer, 0, buffer.length);
buffer = new Buffer("\n\nmodule.exports = camxes;\n\nterm = process.argv[2];\nif (term !== undefined && typeof term.valueOf() === 'string')\n  console.log(require('./camxes_postproc.js').postprocessing(JSON.stringify(camxes.parse(term)), 3));\n\n");
fs.writeSync(fd, buffer, 0, buffer.length);
fs.close(fd);

