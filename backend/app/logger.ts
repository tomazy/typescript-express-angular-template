import * as createLogger from 'bunyan-request-logger';

module.exports = function logger(name: string) {
  return createLogger({ name });
};
