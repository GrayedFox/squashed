const fs = require('fs')
const execProcess = require('./execProcess.js')

let path = './node_modules/squashed/commands/'
let commitRef = 'HEAD'

// Function which returns a promise so we can chain command execution
const commandHandler = (command) => {
  return new Promise((resolve, reject) => {
    execProcess.result(`sh ${path}${command}`, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

// Logs errors from promise rejections, including stack trace
const errorHandler = (error) => {
  console.log(error.stack.replace(error.message, ''))
  quit(error.message, 1)
}

// Log pass messages in blue so they stand out, with padding
const logPass = (message) => {
  console.log(`
  \x1b[34m${message}\x1b[0m
  `)
}

// Log fail message in red so they stand out, with padding
const logFail = (message) => {
  console.log(`
  \x1b[31m${message}\x1b[0m
  `)
}

// Quit squashed with a given message and exit code
const quit = (message, statusCode = 0) => {
  statusCode === 0 ? logPass(message) : logFail(message)
  process.exit(statusCode)
}

// Initialisation and env setup
const init = () => {
  // if not installed via Node Package Manager adjust path to root (for debugging local builds)
  try {
    (!fs.lstatSync(path).isDirectory())
  } catch(err) {
    if (err.code === 'ENOENT') {
      path = './commands/'
    }
  }

  // if run inside Travis CI we need to ensure we update the commitRef since we are working in a detached head state
  if (process.env.TRAVIS) {
    if (!process.env.TRAVIS_PULL_REQUEST_SHA) {
      quit(`No need to run squashed against push builds!`)
    } else if (process.env.TRAVIS_BRANCH !== 'develop') {
      quit(`No need to run squashed against pull requests that don't target develop!`)
    }
    commitRef = process.env.TRAVIS_PULL_REQUEST_SHA
  }
  console.log(`Commit Reference: ${commitRef}`)
}

init()

Promise.all([commandHandler(`getBranchCommitCount.sh ${commitRef}`), commandHandler(`getFormattedBranchCommits.sh ${commitRef}`)]).then(
  ([commitCount, formattedBranchCommits]) => {
    if (commitCount > 1) {
      console.log(`${formattedBranchCommits}`)
      quit(`You need to squash those ${+commitCount} commits!`, 1)
    } else {
      quit(`Merge away McLoven :)`)
    }
  }, errorHandler)
