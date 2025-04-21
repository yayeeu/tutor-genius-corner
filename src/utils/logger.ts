
const isDevelopment = process.env.NODE_ENV === 'development';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  level?: LogLevel;
  context?: string;
  error?: unknown; // Add error property to support error objects
}

class Logger {
  private static log(level: LogLevel, message: any, options?: LogOptions) {
    if (!isDevelopment && level === 'debug') return;
    
    const timestamp = new Date().toISOString();
    const context = options?.context ? `[${options.context}]` : '';
    const formattedMessage = `${timestamp} ${context} ${level.toUpperCase()}: ${message}`;
    
    // Format error if provided
    let errorOutput = '';
    if (options?.error) {
      // Convert error to string representation for logging
      if (options.error instanceof Error) {
        errorOutput = `\n${options.error.stack || options.error.toString()}`;
      } else {
        try {
          errorOutput = `\n${JSON.stringify(options.error, null, 2)}`;
        } catch (e) {
          errorOutput = `\n[Unstringifiable error object]`;
        }
      }
    }
    
    const fullMessage = formattedMessage + errorOutput;
    
    switch (level) {
      case 'debug':
        isDevelopment && console.debug(fullMessage);
        break;
      case 'info':
        console.info(fullMessage);
        break;
      case 'warn':
        console.warn(fullMessage);
        break;
      case 'error':
        console.error(fullMessage);
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
  
  // Helper method for production to strip debug logs
  static isProd() {
    return !isDevelopment;
  }
}

export default Logger;
