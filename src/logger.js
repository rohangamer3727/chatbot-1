const pino = require('pino');
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      level: 'trace',
      colorize: true,
      customColors: 'error:red,info:blue,fatal:red,warn:yellow,debug:green',
      useOnlyCustomProps: true,
      ignore: 'pid,hostname',
      timestampKey: 'time',
      translateTime: 'dddd, mmmm dS, yyyy, h:MM:ss TT',
    },
  },
});

module.exports = logger;
