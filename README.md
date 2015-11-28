# jspm-test-runner

A runner specifically for running tests against jspm applications

Note that this module __only works in jspm applications__.

# Usage

See the [jspm-test-runner-test](https://github.com/jackfranklin/jspm-test-runner-test/) project for an example.

```
jspm install jspm-test-runner=github:jackfranklin/jspm-test-runner
```

In every test file, import `describe` and use that to create your assertions, using the assertion library of your choice (here we're using Chai). __Your test files must exist within a directory and must be suffixed with `-test`__.

```js
// tests/app-test.js
import { describe } from 'jspm-test-runner';
import { expect } from 'chai';

describe('my test', () => {
  expect(true).to.eql(true);
});
```

Then create a file that will run your tests:

```js
// test-runner.js
import { runTests } from 'jspm-test-runner';

runTests({ directory: 'tests' });
```

Now doing `jspm run test-runner` will execute your tests and show you the result.

