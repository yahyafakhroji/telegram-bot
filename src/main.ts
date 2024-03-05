import { TgBot } from '@modules/tg';
import dotenv from 'dotenv'; 

dotenv.config();  // Load environment variables from .env file 

const bot = new TgBot();
bot.init();
