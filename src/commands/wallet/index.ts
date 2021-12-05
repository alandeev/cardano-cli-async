import queryStakeAddressInfo from '../../commands/query-stake-address-info'
import queryUtxo from '../../commands/query-utxo'
import getUtxoBalance from '../../helpers/cardano/get-utxo-balance'
import { setKeys } from '../../helpers/utils'
import { InstanceOptions, WalletResponse } from '../../models/cardano'
import fs from 'fs'

const reward = async (stakingAddr: string, instanceOptions: InstanceOptions) => {
  const response = await queryStakeAddressInfo(stakingAddr, instanceOptions)
  const result = response.find((delegation) => delegation.address == stakingAddr).rewardAccountBalance
  return result
}

const balance = async (paymentAddr, instanceOptions) => {
  const utxos = await queryUtxo(paymentAddr, instanceOptions)

  const allValue = { lovelace: 0 }
  for (let utxo of utxos) {
    let { lovelace, ...assets } = getUtxoBalance(utxo)

    allValue.lovelace += lovelace
    Object.assign(allValue, assets)
  }

  return {
    utxos,
    value: allValue
  }
}

const wallet = (account: string, instanceOptions: InstanceOptions) => {
  const paymentAddr = fs.readFileSync(`${instanceOptions.dir}/priv/wallet/${account}/${account}.payment.addr`).toString()
  const stakingAddr = fs.readFileSync(`${instanceOptions.dir}/priv/wallet/${account}/${account}.stake.addr`).toString()

  const files = fs.readdirSync(`${instanceOptions.dir}/priv/wallet/${account}`)

  const keysPath: Record<string, any> = {}

  for (let file of files) {
    const fileSplited = file.split('.')
    let name = fileSplited[1] + '.' + fileSplited[2]
    setKeys(keysPath, name, `${instanceOptions.dir}/priv/wallet/${account}/${file}`)
  }

  const getBalance = () => balance(paymentAddr, instanceOptions)
  const getReward = () => reward(stakingAddr, instanceOptions)

  const response: WalletResponse = {
    name: account,
    paymentAddr,
    stakingAddr,
    balance: getBalance,
    reward: getReward,
    ...keysPath
  }

  return response
}

export default wallet
