#!/usr/bin/env node

const assert = require('assert');
const path = require('path');
const exec = require('child_process').exec;
const libExecutable = path.resolve(__dirname, '../../dist/bin/mocha-parallel-tests');

exec(`${libExecutable} -R json --retry 1 test/describe-onefile-fail/test.spec.js`, {
    cwd: path.resolve(__dirname, '../../')
}, (err, stdout) => {
    assert(!err, `Error occured: ${err}`);

    let jsonReporterOutput = stdout.toString();
    try {
        jsonReporterOutput = JSON.parse(jsonReporterOutput);
    } catch (ex) {
        console.error(`Native JSON reporter output is not valid JSON: ${jsonReporterOutput || '(empty)'}`);
        process.exit(1);
    }

    console.log(jsonReporterOutput)
});
