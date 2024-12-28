import winston, {format} from "winston";  

const defaultFormat = format.combine(
    format.timestamp(),
    format.splat(),
    format.metadata({ fillExcept: ['message', 'timestamp', 'level'] }),
    format.printf(
        (info) => {            
            return (Object.keys(info.metadata).length)
                ? `${info.timestamp} ${info.level}: ${info.message} ${JSON.stringify(info.metadata)}`
                : `${info.timestamp} ${info.level}: ${info.message}`;
        }
    ),
);

export const logging =() => {
    winston.loggers.add('system',
        {
            format: defaultFormat,
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'storage/logs/system.log' }),
            ],
        }
    );

    winston.loggers.add('user',
        {
            format: defaultFormat,
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'storage/logs/user.log' }),
            ],
        }
    )
}

