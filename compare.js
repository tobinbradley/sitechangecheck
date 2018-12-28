const fs = require('fs')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')

function pngDiff(fileName) {
  return new Promise((resolve, reject) => {
    const img1 = fs
      .createReadStream('img/baseline.png')
      .pipe(new PNG())
      .on('parsed', doneReading)
    const img2 = fs
      .createReadStream('img/compare.png')
      .pipe(new PNG())
      .on('parsed', doneReading)

    let filesRead = 0
    function doneReading() {
      // Wait until both files are read.
      if (++filesRead < 2) return

      let diff = new PNG({ width: img1.width, height: img1.height })
      const pixelDiff = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        img1.width,
        img1.height,
        { threshold: 0.1 }
      )

      if (pixelDiff > 0) {
        // write diff file
        diff.pack().pipe(fs.createWriteStream('img/diff.png'))
      }

      resolve(pixelDiff)
    }
  })
}

function txtDiff() {
  const txt1 = fs.readFileSync('txt/baseline.txt', 'utf8')
  const txt2 = fs.readFileSync('txt/compare.txt', 'utf8')
  if (txt1 === txt2) {
    return 0
  } else {
    return 1
  }  
}

module.exports = {pngDiff, txtDiff}
