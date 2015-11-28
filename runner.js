import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

let assertions = [];

function describe(name, fn) {
  assertions.push({ name, fn });
}

export { describe, assertions };

const fileIsTest = (f) => f.indexOf('-test') > -1;
const getFilePath = (dir, f) => path.join(dir, f);

export function runTests({ directory }) {
  fs.readdir(path.join(process.cwd(), directory), (err, files) => {
    const testFiles = files.filter(fileIsTest).map(getFilePath.bind(null, directory));
    const testFilePromises = testFiles.map((f) => System.import(f));

    Promise.all(testFilePromises).then(() => {
      const results = assertions.map(({ name, fn }) => {
        let passed = true;
        let error;
        try {
          fn.call();
        } catch (e) {
          passed = false;
          error = e;
        }

        return { name, passed, error };
      });

      results.forEach(({ name, passed, error}) => {
        const colourFn = passed ? chalk.green : chalk.red;
        const message = passed ? 'Pass: ' : 'Fail: ';

        console.log(colourFn(message + name));
        if (!passed) {
          console.log('\t' + error.message);
          console.log('\t' + error.stack);
        }
      });
      console.log('');
    }).catch((e) => {
      console.log('Error loading test file');
      console.log(e.message);
      console.log(e.stack);
    });
  });
}
