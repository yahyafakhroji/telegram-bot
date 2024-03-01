import { Telegraf, Markup } from 'telegraf';
import { AbstractCommand } from './abstract.command';
import { IBotContext } from '../interfaces/context.interface';
import dayjs from 'dayjs';

export class StartCommand extends AbstractCommand {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handler(): void {
    this.bot.start(async (ctx) => {
      let message = '<b>Thank you for your order!</b>\n\n';
      message +=
        'This message confirms your order with <b>Molla, inc</b>. Your order number is <a href="https://www.google.com/search?q=12345">#12345</a>.\n\n';
      message += '📦 <b>Products</b>\n\n';
      message += '<blockquote>';
      message += "- 2 x Air Jordan 1 Low Women's Shoes = USD 200\n";
      message += "- 1 x Air Jordan 1 Low Men's Shoes = USD 150\n";
      message += '</blockquote>\n\n';
      message += '🧾 <b>Order Details</b>\n\n';
      message +=
        '<b> - Order Date:</b> <i>' +
        dayjs().format('MMMM DD, YYYY HH:mm') +
        '</i>\n';
      message +=
        '<b> - Shipping Address:</b> <i>Malang Regency, East Java, Indonesia</i>\n';
      message += '<b> - Grand Total:</b> <i>USD 350</i>\n';
      message += '<b> - Payment Method:</b> <i>Muggle Link</i>\n\n';
      message += 'Make payment by click <b>Pay Now</b> button.';

      ctx.replyWithPhoto(
        { url: 'https://i.ibb.co/s1PYs1v/air-jordan.jpg' },
        {
          caption: message,
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            Markup.button.webApp(
              '💸 Pay Now',
              'https://pay.muggle.link/?pid=283a8736-004e-4b72-a871-149dc8303576',
            ),
          ]),
        },
      );
    });
  }
}
