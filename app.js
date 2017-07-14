const execProcess = require('./execProcess.js')

execProcess.result('sh node_modules/squashed/countBranchCommits.sh', function(err, response) {
  if (err) {
    console.log(err)
  } else {
    if (response > 1) {
      console.log('You need to squash your commits! Do a rebase!')
      process.exit(1)
    } else {
      console.log('Merge away McLoven')
      process.exit(0)
    }
  }
})
