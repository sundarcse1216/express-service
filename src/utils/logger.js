const {createLogger, format, transports} = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}


const LOGGER = caller => {
    return createLogger({
        level: env === 'production' ? 'info' : 'debug',
        format: format.combine(
            format.label({label: path.relative(process.cwd(), caller)}),
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'})
        ),
        transports: [
            new transports.Console({
                format: format.combine(
                    format.printf(
                        info => `[${info.timestamp}] [${info.level.toUpperCase()}] [${info.label}]: ${info.message}`
                    )
                )
            }),
            new transports.DailyRotateFile({
                filename: `${logDir}/%DATE%-server.log`,
                datePattern: 'YYYY-MM-DD',
                format: format.combine(
                    format.printf(
                        info => `[${info.timestamp}] [${info.level.toUpperCase()}] [${info.label}]: ${info.message}`
                    )
                ),
                maxFiles: '10d',
                zippedArchive: true
            })
        ]
    });
};

module.exports = LOGGER;