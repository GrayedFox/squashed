This handy little module checks if the currently checked our branch
has been squashed or not (based on the number of commits the branch has).

Now if you're following the GitFlow branching model you can add a check
to your desired CI pipeline to ensure developers don't merge feature
branches without rebasing/squashing them first!
