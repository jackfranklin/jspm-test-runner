import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { assertions } from './describe';

fs.readdir(path.join(process.cwd(), 'test'), (err, files) => {
  const testFiles = files.
    filter((file) => file.indexOf('-test') > -1).
    map((file) => path.join('test', file));


  const testFilePromises = testFiles.map((file) => System.import(file));

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
