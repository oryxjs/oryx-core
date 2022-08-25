import Configstore from "configstore"

let config: Configstore

export const getConfigStore = (): Configstore => {
  if (!config) {
    config = new Configstore(
      `oryx`,
      {},
      {
        globalConfigPath: true,
      }
    )
  }

  return config
}
