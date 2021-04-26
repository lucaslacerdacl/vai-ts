import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {Babel} from './third-parties/babel.service';
import {Git} from './third-parties/git.service';
import {GTS} from './third-parties/gts.service';
import {Jest} from './third-parties/jest.service';
import {InitOptions} from './options.enum';
import {Skeleton} from './skeleton.service';
import {Travis} from './third-parties/travis.service';
import {each} from 'lodash';

/**
 * Class responsible for implement the init command.
 */
export class Init implements ICommand {
  /**
   * Return the init command name.
   */
  whoami: Command = Command.init;

  /**
   * Return the options avaliable for init command.
   * @returns Init commands.
   */
  getOptions(): string[] {
    return Object.values(InitOptions);
  }

  /**
   * Check for the project name typed.
   * @param options The options typed in the terminal.
   * @returns The project name.
   */
  private getProjectName(options: string[]): string {
    let projectName = 'my-project';

    each(options, option => {
      if (option.includes('=')) {
        const optionSplited = option.split('=');
        const optionToBeValidate = `${optionSplited[0]}=`;
        if (optionToBeValidate === InitOptions.projectName) {
          projectName = optionSplited[1];
        }
      }
    });

    return projectName;
  }

  /**
   * Create the skeleton. Execute third parties.
   * @param options The options typed in the terminal.
   */
  async run(options: string[]): Promise<void> {
    const projectName = this.getProjectName(options);

    await this.skeleton.createProjectFolder(projectName);
    this.skeleton.createPackageFile(projectName);
    await this.skeleton.installDependencies(projectName);

    this.babel.createBabelFile(projectName);

    this.git.createGitIgnoreFile(projectName);

    this.gts.createESLintFiles(projectName);
    this.gts.createPrettierFile(projectName);
    this.gts.createTsConfigFile(projectName);

    this.jest.createJestConfigFile(projectName);
    this.jest.createJestSetup(projectName);

    this.travis.createTravisFile(projectName);
  }

  /**
   * The third-parties.
   * @param babel Babel.
   * @param git Git.
   * @param gts Google Typescript.
   * @param jest Jest.
   * @param travis Travis CI.
   * @param skeleton Skeleton.
   */
  constructor(
    private babel: Babel,
    private git: Git,
    private gts: GTS,
    private jest: Jest,
    private travis: Travis,
    private skeleton: Skeleton
  ) {}
}
