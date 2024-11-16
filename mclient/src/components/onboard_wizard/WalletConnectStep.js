// WalletConnectStep.js
import React from 'react';
import { useWallet, ConnectButton, Avatar, Address } from '@coinbase/wallet-sdk-react';
import { updateUserDetails } from '../utils/api'; // Adjust import based on your project structure

export default function WalletConnectStep({ userType, nextStep, prevStep }) {
  const [walletAddress, setWalletAddress] = React.useState('');
  const { connected, accounts, connect } = useWallet();

  React.useEffect(() => {
    if (connected && accounts.length > 0) {
      setWalletAddress(accounts[0]);
    } else {
      setWalletAddress('');
    }
  }, [connected, accounts]);

  const handleNext = async () => {
    const payload = {
      userType,
      walletAddress,
    };
    await updateUserDetails(payload);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
      <div className="space-y-4">
        <div>
          {/* ConnectButton from OnChainKit */}
          <ConnectButton onClick={connect} />
        </div>

        {/* Display Avatar and Address when connected */}
        {walletAddress && (
          <div className="mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Wallet Address</label>
              <Address address={walletAddress} />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium mb-1">Avatar</label>
              <Avatar address={walletAddress} />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!walletAddress}
            className={`${
              walletAddress ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
            } text-white font-bold py-2 px-4 rounded`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}