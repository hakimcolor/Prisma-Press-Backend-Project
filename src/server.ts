import 'dotenv/config';
import app from './app';
import config from './config';
import { prisma } from './lib/prisma';

const PORT = config.port;

async function main() {
  try {
    app.listen(PORT, async () => {
      await prisma.$connect();
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server error:', error);
    await prisma.$disconnect();
  }
}

main();
