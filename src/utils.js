'use strict';

const getDoubleCount = (number) => number < 10 ? `0${number}` : number;

const getRandomObjectProperty = (object) => {
  return object[Object.keys(object)[Math.floor(Math.random() * Object.keys(object).length)]];
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

module.exports = {
  getDoubleCount,
  getRandomInt,
  getRandomObjectProperty,
  shuffle
};
