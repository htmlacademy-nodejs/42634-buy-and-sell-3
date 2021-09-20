'use strict';

const generateModule = require(`./generate`);
const versionModule = require(`./version`);
const helpModule = require(`./help`);
const serverModule = require(`./server`);

const Cli = {
  [generateModule.name]: generateModule,
  [versionModule.name]: versionModule,
  [helpModule.name]: helpModule,
  [serverModule.name]: serverModule,
};

module.exports = {
  Cli
};
