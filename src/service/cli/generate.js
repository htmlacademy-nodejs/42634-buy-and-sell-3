'use strict';

const util = require(`util`);
const fs = require(`fs`);
const {getRandomInt, shuffle, getDoubleCount, getRandomObjectProperty} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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

const generateOffers = (offersCount) => {
  const offers = [];

  for (let i = 0; i < offersCount; i++) {
    offers.push({
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      picture: getPictureName(PictureRestrict.MIN, PictureRestrict.MAX),
      description: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length - 1)).join(` `),
      type: getRandomObjectProperty(OfferType),
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
      category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1))
    });
  }

  return offers;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const offerCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(offerCount));

    const writeFilePromise = util.promisify(fs.writeFile);

    await writeFilePromise(FILE_NAME, content)
      .then(() => console.log(`Operation success. File created.`))
      .catch(() => console.error(`Can't write data to file...`));
  }
};
