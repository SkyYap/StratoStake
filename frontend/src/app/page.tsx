'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { SendTransaction } from "../sendTransaction";
import { SwitchChain } from "../switchNetwork";
import { Balance } from "../balance";
import { WriteContract } from "../writeContract";

function App() {
  const account = useAccount()
  const { connector, isConnected } = useAccount();
  const { connectors, connect, error } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="main">
        <div className="title">Connected to {connector?.name}</div>
          <div> Addresses: {account.addresses} </div>
          <div> ChainId: {account.chainId} </div>
        <button className="card" onClick={disconnect as any}>
          Disconnect
        </button>
        <SendTransaction />
        <Balance />
        <WriteContract />
        <SwitchChain />
      </div>
    );
  } else {
    return (
      <div className="main">
        {connectors.map((connector) => {
          return (
            <button className="card" key={connector.id} onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          );
        })}
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}

export default App
