import {Mock} from 'moq.ts';
import {Command} from '../src/commands/command.enum';
import {ICommand} from '../src/commands/command.interface';
import {StartUp} from '../src/start-up.service';

describe('Start up', () => {
  it('Should run a found command', async () => {
    const arg0 = Command.init;
    const arg1 = [''];
    const runMock = jest.fn();

    const mockCommand = new Mock<ICommand>();
    const command = mockCommand
      .setup(instance => instance.whoami)
      .returns(Command.init)
      .setup(instance => instance.getOptions)
      .returns(() => [''])
      .setup(instance => instance.run)
      .returns(() => runMock())
      .object();

    const startUp = new StartUp([command]);
    await startUp.run(arg0, arg1);

    expect(runMock).toHaveBeenCalled();
  });

  it('Should not found any command', async () => {
    const arg0 = 'Command';
    const arg1 = [''];
    const runMock = jest.fn();

    const mockCommand = new Mock<ICommand>();
    const command = mockCommand
      .setup(instance => instance.whoami)
      .returns(Command.init)
      .setup(instance => instance.getOptions)
      .returns(() => [''])
      .setup(instance => instance.run)
      .returns(() => runMock())
      .object();

    const startUp = new StartUp([command]);

    await expect(async () => startUp.run(arg0, arg1)).rejects.toThrow(
      'Command not found.'
    );
  });

  it('Should not found any options', async () => {
    const arg0 = Command.init;
    const arg1 = ['-p'];
    const runMock = jest.fn();

    const mockCommand = new Mock<ICommand>();
    const command = mockCommand
      .setup(instance => instance.whoami)
      .returns(Command.init)
      .setup(instance => instance.getOptions)
      .returns(() => ['-t'])
      .setup(instance => instance.run)
      .returns(() => runMock())
      .object();

    const startUp = new StartUp([command]);

    await expect(async () => startUp.run(arg0, arg1)).rejects.toThrow(
      'Command not found.'
    );
  });
});
