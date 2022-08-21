const replace = require("replace-in-file")

async function main() {
  const options = {
    files: process.cwd().concat('/packages', '/oryx', '/dist', '/auth', '/cart.js'),
    from: /medusa/g,
    to: 'oryx',
  };

  const results = replace.sync(options)
  console.log(JSON.stringify(results))
}

main()