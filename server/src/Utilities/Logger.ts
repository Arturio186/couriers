import winston from 'winston';

const Logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: './Logs/errors.log', level: 'error' })
    ]
});

export default Logger;