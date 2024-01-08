import winston from 'winston'

const { combine, timestamp, prettyPrint } = winston.format

const logger = winston.createLogger({
  // Log only if info.level is less than or equal to this level
  // https://github.com/winstonjs/winston#logging
  level: 'info',

  // Formatting for info messages
  // https://github.com/winstonjs/winston#formats
  format: combine(timestamp(), prettyPrint()),
  defaultMeta: {
    env: process.env.NODE_ENV,
  },
  transports: [new winston.transports.Console()],
})

export default logger
