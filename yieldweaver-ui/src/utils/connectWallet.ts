import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { ethers } from 'ethers';

const APP_NAME = 'YieldWeaver';
const APP_LOGO_URL = 'https://example.com/logo.png';
const ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/75237055932f40cd93ed8004eacf611c';
const CHAIN_ID = 1;

interface WalletConnection {
  provider: ethers.BrowserProvider;
  account: string;
}

export const connectCoinbaseWallet = async (): Promise<WalletConnection | null> => {
  try {
    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
    });

        const provider = coinbaseWallet.makeWeb3Provider({
            url: ETH_JSONRPC_URL,
            chainId: CHAIN_ID,
            options: 'all'
        });
    const ethersProvider = new ethers.BrowserProvider(provider, 'any');

    const signer = await ethersProvider.getSigner();
    const accounts = [await signer.getAddress()];

    if (accounts.length > 0) {
      console.log('Connected account:', accounts[0]);
      return {
        provider: ethersProvider,
        account: accounts[0],
      };
    } else {
      console.log('No accounts found.');
      return null;
    }
  } catch (error) {
    console.error('Failed to connect to Coinbase Wallet:', error);
    return null;
  }
};