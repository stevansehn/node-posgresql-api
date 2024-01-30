const App = require("./app");
const PORT = process.env.PORT || 3000;

async function start() {
  const app = new App();
  await app.initialize();
  app.server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

start();
