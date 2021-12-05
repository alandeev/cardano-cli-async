import { InstanceOptions } from '@models/cardano'
import queryUtxoCLI from './query-utxo'

class CardanoCLI {
  private network: string
  constructor(options: InstanceOptions) {
    this.network = options.network
  }

  queryUtxo(wallet_address: string) {
    return queryUtxoCLI({
      address: wallet_address,
      network: this.network
    })
  }
}

const cardano = new CardanoCLI({
  network: 'testnet-magic 1097911063'
})

const address = 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3'

cardano.queryUtxo(address).then((res) => {
  console.log(res)
})
