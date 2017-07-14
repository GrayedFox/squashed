const execProcess = require('./execProcess.js')

execProcess.result('sh countBranchCommits.sh', function(err, response) {
  if (err) {
    console.log(err)
  } else {
    if (response > 1) {
      console.log('You need to squash your commits! Do a rebase!')
      return false
    } else {
      console.log('Merge away McLoven')
      return true
    }
  }
})
