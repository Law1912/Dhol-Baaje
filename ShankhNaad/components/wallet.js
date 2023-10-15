const { Seed, WalletServer } = require('cardano-wallet-js');

async function getNetworkInformation() {
  try {
    let walletServer = WalletServer.init('http://localhost:7070/v2');
    let recoveryPhrase = Seed.generateRecoveryPhrase();
    console.log(recoveryPhrase);
    let mnemonic_sentence = Seed.toMnemonicList(recoveryPhrase);
    console.log(mnemonic_sentence);

    

    let passphrase = '123456@Div';
    let name = 'DholBaaje-wallet';
    // let wallets = await walletServer.wallets();
    // let wallet = wallets[1];
    // console.log(await wallet.getUsedAddresses());
    // console.log(wallet.id);
    let wallet = await walletServer.createOrRestoreShelleyWallet(name, mnemonic_sentence, passphrase);

    // let wallet = await walletServer.createOrRestoreShelleyWallet(name, mnemonic_sentence, passphrase);
    // console.log(wallet);
    console.log(wallet.id);
    console.log(await wallet.getUnusedAddresses());


  } catch (error) {
    console.error('Error:', error);
  }
}

getNetworkInformation();