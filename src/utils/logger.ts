
const isDevelopment = process.env.NODE_ENV === 'development';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  level?: LogLevel;
  context?: string;
}

class Logger {
  private static log(level: LogLevel, message: any, options?: LogOptions) {
    if (!isDevelopment && level === 'debug') return;
    
    const timestamp = new Date().toISOString();
    const context = options?.context ? `[${options.context}]` : '';
    const formattedMessage = `${timestamp} ${context} ${level.toUpperCase()}: ${message}`;
    
    switch (level) {
      case 'debug':
        isDevelopment && console.debug(formattedMessage);
        break;
      case 'info':
        console.info(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'error':
        console.error(formattedMessage);
        break;
    }
  }

  static debug(message: any, options?: LogOptions) {
    this.log('debug', message, options);
  }

  static info(message: any, options?: LogOptions) {
    this.log('info', message, options);
  }

  static warn(message: any, options?: LogOptions) {
    this.log('warn', message, options);
  }

  static error(message: any, options?: LogOptions) {
    this.log('error', message, options);
  }
}

export default Logger;
