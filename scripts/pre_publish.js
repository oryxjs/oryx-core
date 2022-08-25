const fs = require("fs")

function main() {
  const packages_with_versions = {}
  fs.readdirSync(`${process.cwd()}/packages`)
    .filter((f) => !f.match(/file|plugin|payment|fulfillment|source|config|create/g))
    .map((p) => {
      try {
        const package_json = require(`${process.cwd()}/packages/${p}/package.json`)
        packages_with_versions[`${package_json.name}`] = package_json.version
      } catch (error) {}
    })

  try {
    const current_packages_versions = require(`${process.cwd()}/packages-versions.json`)
    const changed_packages = diff(current_packages_versions, packages_with_versions)
    if (!Object.keys(changed_packages).length) {
      console.log("All packages are up to date, no bumps detected")
    } else {
      let bumps = ""
      Object.keys(changed_packages).map((p) => {
        const alias = p.replace(/oryx/g, "medusa")
        const version = changed_packages[p]

        bumps = bumps.concat(`${alias}@npm:${p}@${version} `)
      })

      console.log(`just run this in your terminal \n\n yarn up ${bumps} \n\n`)
      // update new versions of packages
      fs.writeFileSync(
        `${process.cwd()}/packages-versions.json`,
        JSON.stringify(packages_with_versions)
      )
    }
  } catch (error) {
    // if (error) {
    //   return console.log(error)
    // }
    fs.writeFileSync(
      `${process.cwd()}/packages-versions.json`,
      JSON.stringify(packages_with_versions)
    )
    console.log("package-versions.json generated with all current packages versions")
  }
}

function diff(p1, p2) {
  const diff_pkgs = {}
  Object.keys(p2).reduce((diff, key) => {
    if (p1[key] === p2[key]) {
      return diff
    }

    diff_pkgs[key] = p2[key]
  })
  return diff_pkgs
}

main()