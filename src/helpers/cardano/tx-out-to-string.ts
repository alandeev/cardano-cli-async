const txOutToString = (txOutList) => {
  let result = ''
  for (let txOut of txOutList) {
    const { lovelace, ...assets } = txOut.value
    result += `--tx-out "${txOut.address}+${lovelace}`

    for (let asset of Object.keys(assets)) {
      result += `+${txOut.value[asset]} ${asset}`
    }

    result += `" `

    if (txOut.datumHash) {
      result += `--tx-out-datum-hash ${txOut.datumHash}`
    }
  }

  return result
}

export default txOutToString
