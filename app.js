const execProcess = require('./execProcess.js')

execProcess.result('sh countBranchCommits.sh', function(err, response) {
  if (err) {
    console.log(err)
  } else {
    return !(response > 1)
  }
})
