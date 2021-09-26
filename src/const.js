'use strict';

const NOT_FOUND_MESSAGE = `Not found`;

const ExitCode = {
  success: 0,
  fail: 1
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  NOT_FOUND_MESSAGE,
  HttpCode,
  ExitCode
};
