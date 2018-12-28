const libnotify = require('libnotify')

function notify(diffPixels) {
  if (diffPixels > 0) {
    libnotify.notify(`${process.env.SITEURL} has changed! GAAAAAAAAH!`, {
      title: 'Site Checker',
      time: 1000 * 60 * 60 * 5
    })
  }
}

module.exports = notify
