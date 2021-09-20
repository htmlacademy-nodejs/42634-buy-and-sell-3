const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const http = require(`http`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.js`;

module.exports = {
  name: `--server`,
  async run(args) {
    const [enteredPort] = args;
    const port = Number.parseInt(enteredPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, () => console.info(chalk.green(`Ожидаю соединений на ${port}`)))
      .on(`error`, ({message}) => console.error(chalk.red(`Ошибка при создании сервера: ${message}`)));
  }
};
