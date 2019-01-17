const fs = require('fs');
const lame = require('lame');
const speaker = require('speaker');
const colors = require('colors');
const readline = require('readline');

const printWithDelay = function(text) {
  const textArray = text.split('');

  let i = 0;
  let intervalId = setInterval(() => {
    process.stdout.write(colors.bgWhite.magenta(textArray[i]));

    i++;
    if (i >= textArray.length) {
      clearInterval(intervalId);
    }
  }, 30);
}

const startDialog = function() {
  console.clear();
  printWithDelay('\n     Press any button to start!     \n    And any button again to exit    \n\n');

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  let keyPressed = false;
  process.stdin.on('keypress', () => {
    if (keyPressed) {
      process.exit();
    }
    keyPressed = true;
    playMario();
  });
}

const playMario = function() {
  fs.createReadStream('./assets/mario.mp3')
  .pipe(new lame.Decoder())
  .on('format', function (format) {
    this.pipe(new speaker(format));
  });
  console.log(colors.green(' ----------------------------------'));
  console.log(colors.green('|                                  |'));
  console.log(colors.green('|  '), colors.rainbow('Super Mario Bros Main Theme!'), colors.green('  |'));
  console.log(colors.green('|                                  |'));
  console.log(colors.green(' ----------------------------------'));
}

startDialog();
