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

// Updates the exitCode and logs errors form command promise rejections
const errorHandler = (error) => {
  console.error(error)
  process.exit(1)
}

// Log squashed messages in blue so they stand out
const prettyLog = (message) => {
  console.log(`\x1b[34m${message}\x1b[0m`)
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
  if (process.env.TRAVIS_PULL_REQUEST_BRANCH) {
    commitRef = process.env.TRAVIS_PULL_REQUEST_SHA
  }
  console.log(`Commit reference: ${commitRef}`)
}

init()

Promise.all([commandHandler(`getBranchCommitCount.sh ${commitRef}`), commandHandler('getFormattedBranchCommits.sh')]).then(
  ([commitCount, formattedBranchCommits]) => {
    if (commitCount > 1) {
      console.log(`
${formattedBranchCommits}`)
      prettyLog(`
      You need to squash those ${+commitCount} commits!
      `)
      process.exit(1)
    } else {
      prettyLog('Merge away McLoven :)')
      process.exit(0)
    }
  }, errorHandler)
