export const packageConfig = (projectName: string): string => {
  const template = `
{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "compile": "tsc",
    "compile-watch": "tsc -w",
    "docs": "typedoc src/*.ts src/**/*.ts"
  },
  "devDependencies": {
    "@types/node": "^14.11.2",
    "codecov": "^3.8.1",
    "moq.ts": "^7.3.4",
    "nodemon": "^2.0.7",
    "typedoc": "^0.20.35",
    "typescript": "^4.0.3"
  },
  "dependencies": {
    "reflect-metadata": "^0.1.13",
    "@types/lodash": "^4.14.168",
    "lodash": "^4.17.21"
  }
}  
`;

  return template.trimStart();
};

export const indexConfig = (): string => {
  const template = `
'use strict';

import 'reflect-metadata';

(async () => {
  try {
    console.log('OK');
  } catch (err) {
    console.log(err.message);
  }
})();
`;

  return template.trimStart();
};
