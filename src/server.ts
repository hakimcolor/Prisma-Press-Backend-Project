import app from './app';
import config from './config';
import { prisma } from './lib/prisma';
const PORT = config.port;
async function main() {
  try {
    await prisma.$connect();
    console.log('prisma conneceted.');
    app.listen(PORT, () => {
      console.log(`server is runnning on port ${PORT}`);
    });
  } catch (error) {
    console.log('error starting the server', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
