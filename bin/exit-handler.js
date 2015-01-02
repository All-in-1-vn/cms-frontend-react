var fs = require('fs'),
    pidFilePath = process.env.PID_FILE_PATH;

if (pidFilePath) {
  console.log('Process Id: ', process.pid, '\n\t pidfile: ', pidFilePath);
  fs.writeFileSync(pidFilePath, process.pid + '\n');
}

process.stdin.resume(); //so the program will not close instantly

var exitHandler = function(options, err) {
  console.log('Exit: ', options);

  if (pidFilePath) {
    console.log('Unlink file', pidFilePath);
    fs.unlink(pidFilePath);
  }
  if (options.cleanup) {
    console.log('App exit cleaned.');
  }
  if (err) {
    console.log(err.stack);
  }
  process.exit(0);
};


//do something when app is closing
process.on('exit', exitHandler.bind(null, {
  info: 'exiting...',
  cleanup: true
}));


//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
  info: 'SIGINT',
  exit: true
}));


//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
  info: 'uncaughtException',
  exit: true
}));



process.on('SIGTERM', exitHandler.bind(null, {
  info: 'SIGTERM',
  exit: true
}));
