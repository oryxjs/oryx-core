const repoUrl = "https://github.com/oryxjs/medusa.git"
const jsGit = require("simple-git")
const git = jsGit.default()
// specify some packages
const args = process.argv.splice(2)
const fs = require('fs')


async function main() {
  await git.addRemote("medusa", repoUrl)
  await git.raw('fetch', 'medusa')

  let packages = []
  if(args.length) {
    packages = [...args]
    await pull_or_add_packages(packages)
  } else {
    const d = await git.branch({ '-r': null, '--list': null })
    delete d.branches['medusa/master']
    packages = Object.keys(d.branches).filter((b) => b.includes('medusa/')).map((b) => b.split('/')[1])
    await pull_or_add_packages(packages)
  }
  
  await git.removeRemote('medusa')
}

async function pull_or_add_packages(packages) {
  for(let p of packages) {
    const shouldPull = fs.existsSync(`${process.cwd()}/packages/${p}`)
    try {
      const resp = await git.raw(
        [
          "subtree",
          `${shouldPull ? 'pull':'add'}`,
          "--prefix",
          `packages/${p}/`,
          "medusa",
          p,
        ])
      console.log(
        "Pull and Creating/Updating subtree branches done successfully \n" +
          resp
      )
    } catch (error) {
      throw new jsGit.GitError(error)
    }
  }
}


main()