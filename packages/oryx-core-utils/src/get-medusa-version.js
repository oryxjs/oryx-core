import path from "path"

export const getMedusaVersion = () => {
  try {
    return require(path.join(
      process.cwd(),
      `node_modules`,
      `@oryxjs/oryx`,
      `package.json`
    )).version
  } catch (e) {
    return ``
  }
}
