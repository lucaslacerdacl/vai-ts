import * as fs from 'fs';
import {babelConfig} from '../../templates/babel/babel.template';

export class Babel {
  createBabelFile(projectFolder: string) {
    const babelFile = babelConfig();
    fs.writeFileSync(`${projectFolder}/babel.config.js`, babelFile);
  }
}
