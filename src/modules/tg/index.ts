import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { StartCommand } from './commands/start.command';
import { IBotContext } from './interfaces/context.interface';
import { AbstractCommand } from './commands/abstract.command';

export class TgBot {
  bot: Telegraf<IBotContext>;
  commands: AbstractCommand[] = [];

  constructor() {
    this.bot = new Telegraf<IBotContext>(process.env.TELEGRAM_TOKEN);
    this.bot.use(
      new LocalSession({
        database: './tg-session.json',
      }).middleware(),
    );
  }

  init() {
    this.commands.push(new StartCommand(this.bot));
    this.commands.forEach((command) => {
      command.handler();
    });
    this.bot.launch();
  }
}
