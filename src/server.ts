import app from './app';
import 'dotenv/config';
import config from './config';

// const PORT = config.port;
const PORT = process.env.PORT;

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server error:', error);
  }
}
main();
