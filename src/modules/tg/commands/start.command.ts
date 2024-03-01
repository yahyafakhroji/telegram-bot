import { Telegraf, Markup } from 'telegraf';
import { AbstractCommand } from './abstract.command';
import { IBotContext } from '../interfaces/context.interface';
import dayjs from 'dayjs';

export class StartCommand extends AbstractCommand {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  async getData() {
    const res = await fetch(
      'https://api.muggle.link/api/products/283a8736-004e-4b72-a871-149dc8303576',
    );
    const { data } = await res.json();
    return data;
  }

  async handler() {
    const { product, id } = await this.getData();

    let message = '<b>Thank you for your order!</b>\n\n';
    message +=
      'This message confirms your order with <b>Molla, inc</b>. Your order number is <a href="https://www.google.com/search?q=12345">#12345</a>.\n\n';
    message += '📦 <b>Product</b>\n\n';
    message += '<blockquote>';
    message += `<u>${product.name}</u>\n\n`;
    message += `${product.description}\n\n`;
    message += `🏷️ <b>${product.currency} ${product.price}</b>`;
    message += '</blockquote>\n\n';
    message += '🧾 <b>Order Details</b>\n\n';
    message +=
      '<b> - Order Date:</b> <i>' +
      dayjs().format('MMMM DD, YYYY HH:mm') +
      '</i>\n';
    message +=
      '<b> - Shipping Address:</b> <i>Malang Regency, East Java, Indonesia</i>\n';
    message += `<b> - Grand Total:</b> <i>${product.currency} ${product.price}</i>\n`;
    message += '<b> - Payment Method:</b> <i>Muggle Link</i>\n\n';
    message += 'Make payment by click <b>Pay Now</b> button.';
    this.bot.start(async (ctx) => {
      ctx.replyWithPhoto(
        { url: product.image_url },
        {
          caption: message,
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            Markup.button.webApp(
              '💸 Pay Now',
              `https://pay.muggle.link/?pid=${id}`,
            ),
          ]),
        },
      );
    });
  }
}
