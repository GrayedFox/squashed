This handy little module checks if the currently checked out branch
needs squashing. It uses a native git command to count the number of
unique commits the branch has (read: commits not present on develop).

Install using npm:

`npm install squashed --save-dev`

Then from inside the squashed npm package folder
(`node_modules/squashed/`), do:

`npm link`

Now simply type "squashed" into the terminal from any Git folder to see
if you need to squash those commits or not!
