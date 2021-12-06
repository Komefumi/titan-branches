# Bash
alias ssb="source ~/.bash_profile"

# Quick (Usually Dot-Prefixed) Config File Generation
mkconfigfile() {
  PAYLOAD=$1
  FILE_NAME=$2
  echo -e "$PAYLOAD" > "$FILE_NAME"
}

mkdotignore() {
  mkconfigfile "node_modules\npackage-lock.json" ".ignore"
}

# FZF
export FZF_DEFAULT_COMMAND='fd --type f'

open() {
  output=$(fzf)
  if [ -n "$output" ]; then
    vim $output
  fi
}

alias files="tree -I 'node_modules|dist'"
search() {
  ag "$*"
}


# NOTE ! When searching for anything with quotes, remember to escape them as bash won't pass in the quotes directly otherwise
# `search import React from "react";` won't work
# `search import React from \"react\";` will work


# Git helpers

alias checkout="git checkout"
alias branch="git branch"
alias status="git status"
alias add="git add"

commit() {
  git commit -m "$*"
}

alias diff="git diff"
alias push-all="git push --all"

merge() {
  git merge "$1"
}

#
#clear-all-changes() {
#  git checkout -- "."
#}

___internal_push_all() {
  git push --all
}

alias push-all="___internal_push_all"

# NPM helpers

nrun() {
  npm run "$*"
}

nadd() {
  npm install $*
}

ndad() {
  npm install --save-dev $*
}
