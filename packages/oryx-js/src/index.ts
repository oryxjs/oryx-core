import MedusaClient from "@medusajs/medusa-js/dist"
import Client, { Config } from "@medusajs/medusa-js/dist/request"

// import Admin from "./admin"

class OryxClient extends MedusaClient {
  private client_: Client

  constructor(config: Config) {
    super(config)
    this.client_ = new Client(config)
  }
}

export default OryxClient

export * from "@medusajs/medusa-js/dist/typings"
