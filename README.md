This handy little module checks if the currently checked our branch
has been squashed or not (based on the number of commits the branch has).

Now if you're following the GitFlow branching model you can add a check
to your desired CI pipeline to ensure developers don't merge feature
branches without rebasing/squashing them first!

Install using npm

`npm install squashed --save-dev`

Then from inside the squashed npm package folder, do

`npm link`

Now simply navigate to the root folder of the git project and type
`squashed` into your command line. Will output a message and also return
 true or false so that it can be easily integrated into a CI task runner.
