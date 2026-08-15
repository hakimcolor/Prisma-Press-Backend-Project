import app from './app';
const PORT = process.env.PORT || 5000;
async function main() {
  try {
    app.listen();
  } catch (error) {}
}
main();
