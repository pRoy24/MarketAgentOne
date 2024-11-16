import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';

import React from 'react';

export default function WalletPreview(props) {
  const { address } = props; 
  console.log(address);

  return (
    <div>
      <Identity
        address={address}
        schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
      >
        <Avatar />
        <Name>
          <Badge />
        </Name>
        <Address />
      </Identity>

    </div>
  )
}