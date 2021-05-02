#!/usr/bin/env node
'use strict';

import 'reflect-metadata';

import {Babel} from './commands/init/third-parties/babel.service';
import {GTS} from './commands/init/third-parties/gts.service';
import {Git} from './commands/init/third-parties/git.service';
import {Init} from './commands/init/init.service';
import {Jest} from './commands/init/third-parties/jest.service';
import {Skeleton} from './commands/init/skeleton.service';
import {StartUp} from './start-up.service';
import {Travis} from './commands/init/third-parties/travis.service';
import {Version} from './commands/version/version.service';
import {VsCodeDebugger} from './commands/init/third-parties/vscode-debugger.service';

(async () => {
  try {
    const babel = new Babel();
    const git = new Git();
    const gts = new GTS();
    const jest = new Jest();
    const skeleton = new Skeleton();
    const travis = new Travis();
    const vsCodeDebugger = new VsCodeDebugger();

    const init = new Init(
      vsCodeDebugger,
      babel,
      git,
      gts,
      jest,
      travis,
      skeleton
    );

    const version = new Version();

    const commands = [init, version];
    const startUp = new StartUp(commands);
    const arg0 = process.argv[2];
    const arg1 = process.argv.slice(3);

    await startUp.run(arg0, arg1);
  } catch (err) {
    console.log(err.message);
  }
})();
