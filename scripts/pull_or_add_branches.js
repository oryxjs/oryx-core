const repoUrl = "https://github.com/oryxjs/medusa.git"
const username = process.env.USERNAME
const password = process.env.PASSWORD
const jsGit = require("simple-git")
const url = new URL(repoUrl)
const authConfig = `credential.${url.origin}.helper='!f() { echo username=${username} && echo password=${password}; }; f'`
const git = jsGit.default({
  config: [authConfig],
})
// specify some packages
const args = process.argv.splice(2)
const fs = require('fs')


async function main() {
  git.addRemote("medusa", repoUrl)
  .then((r) => {
    return git.raw('fetch', 'medusa')
  }).then(() => {
    let oryx_branches = []
    if(args.length) {
      oryx_branches = [...args]
    } else {
      git.branch({
        '-r': null,
        '--list': null
      }).then((d) => {
        delete d.branches['medusa/master']
        oryx_branches = Object.keys(d.branches).filter((b) => b.includes('medusa/')).map((b) => b.split('/')[1])
      })
    }
    console.log(oryx_branches)
    for(let p of oryx_branches) {
      const shouldPull = fs.existsSync(`${process.cwd}/packages/${p}`)
      git.raw(
        [
          "subtree",
          `${shouldPull ? 'pull':'add'}`,
          "--prefix",
          `packages/${p}/`,
          "medusa",
          p,
        ],
        (err, resp) => {
          if (err) {
            git.removeRemote("medusa")
            throw new jsGit.GitError(err)
          }
          console.log(
            "Pull and Creating/Updating subtree branches done successfully \n" +
              resp
          )
        }
      )
    }
  }).finally(() => {
    git.removeRemote("medusa")
  })
  
  
}


main()