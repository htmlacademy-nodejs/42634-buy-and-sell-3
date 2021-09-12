'use strict';

const generateModule = require(`./generate`);
const versionModule = require(`./version`);
const helpModule = require(`./help`);

const Cli = {
  [generateModule.name]: generateModule,
  [versionModule.name]: versionModule,
  [helpModule.name]: helpModule
};

module.exports = {
  Cli
};
