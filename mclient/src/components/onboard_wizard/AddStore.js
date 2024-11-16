// src/components/onboard_wizard/AddStore.js

import React, { useState } from 'react';

export default function AddStore({ nextStep, prevStep, setMerchantStoreLink }) {
  const [storeLink, setStoreLink] = useState('');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Store</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Supported Stores</label>
          <p>Currently, we support connecting with Shopify stores.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Shopify Store Link</label>
          <input
            type="text"
            value={storeLink}
            onChange={(e) => setStoreLink(e.target.value)}
            placeholder="https://yourstore.myshopify.com"
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => {
              setMerchantStoreLink(storeLink);
              nextStep();
            }}
            disabled={!storeLink}
            className={`${
              storeLink
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 cursor-not-allowed'
            } text-white font-bold py-2 px-4 rounded`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}