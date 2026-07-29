import { log } from 'node:console';
import app from './app';
const PORT = process.env.PORT || 5000;
async function main() {
  try {
    app.listen(PORT, () => {
      `server is runing port on ${PORT}`;
    });
  } catch (error) {
    console.error('error ', error);
    process.exit(1);
  }
}
main()