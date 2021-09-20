'use strict';

const util = require(`util`);
const fs = require(`fs`);
const chalk = require(`chalk`);

const {getRandomInt, shuffle, getDoubleCount, getRandomObjectProperty} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const MockFilePath = {
  Sentences: `./data/sentences.txt`,
  Titles: `./data/titles.txt`,
  Categories: `./data/categories.txt`
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};


const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const getPictureName = (minPictureNumber, maxPictureNumber) => {
  return `item${getDoubleCount(getRandomInt(minPictureNumber, maxPictureNumber))}.jpg`;
};

const readContent = async (path) => {
  try {
    const readFile = util.promisify(fs.readFile);
    const content = await readFile(path, `utf8`);

    return content.trim().split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

const generateOffers = (offersCount, titles, sentences, categories) => {
  const offers = [];

  for (let i = 0; i < offersCount; i++) {
    offers.push({
      title: titles[getRandomInt(0, titles.length - 1)],
      picture: getPictureName(PictureRestrict.MIN, PictureRestrict.MAX),
      description: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
      type: getRandomObjectProperty(OfferType),
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
      category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1))
    });
  }

  return offers;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const offerCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(
        generateOffers(offerCount,
            await readContent(MockFilePath.Titles),
            await readContent(MockFilePath.Sentences),
            await readContent(MockFilePath.Categories))
    );

    const writeFilePromise = util.promisify(fs.writeFile);

    await writeFilePromise(FILE_NAME, content)
      .then(() => console.info(chalk.green(`Operation success. File created.`)))
      .catch(() => console.error(chalk.red(`Can't write data to file...`)));
  }
};
