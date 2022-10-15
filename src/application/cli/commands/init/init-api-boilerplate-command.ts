import {Inject} from '@nestjs/common';
import {Command, CommandRunner, Option} from 'nest-commander';

import {RepositoryEntity} from '../../../../core/entities/repository-entity';
import {RepositoryInteractor} from '../../../../core/interfaces/repository-interactor';
import {RepositoryInteractorService} from '../../../../core/services/repository-interactor-service';
import {Terminal} from '../../../../infrastructure/terminal/core/interfaces/terminal';
import {TerminalService} from '../../../../infrastructure/terminal/core/services/terminal-service';
import {ConsolePresenter} from '../../presenters/console-presenter';
import {
  InitBoilerplateAnswers,
  InitBoilerplateOptions,
} from './init-boilerplate-options';

@Command({
  name: 'init-api-boilerplate',
  description: 'Initialize Typescript with API boilerplate',
})
export class InitApiBoilerplateCommand implements CommandRunner {
  constructor(
    @Inject(RepositoryInteractorService)
    private readonly repositoryInteractor: RepositoryInteractor,
    @Inject(TerminalService)
    private readonly terminal: Terminal,
    @Inject(ConsolePresenter)
    private readonly consolePresenter: ConsolePresenter
  ) {}

  @Option({
    flags: `-p, --project-name [${InitBoilerplateOptions.PROJECT_NAME}]`,
    description: 'The project name',
    defaultValue: 'my-project',
  })
  public parseProjectName(val: string): string {
    return val;
  }

  public async run(
    _args: string[],
    options: InitBoilerplateAnswers
  ): Promise<void> {
    const repositoryEntity = RepositoryEntity.make(
      'vai-ts-api-boilerplate',
      'https://github.com/heronlabs/vai-ts-api-boilerplate/archive/refs/tags/1.1.1.zip',
      '1.1.1'
    );

    await this.repositoryInteractor.clone(
      this.parseProjectName(options.projectName),
      repositoryEntity
    );

    await this.terminal.installNodePackages(options.projectName);

    this.consolePresenter.envelope(
      'API Boilerplate initialized successfully! 📦 🃏 📘'
    );
  }
}
