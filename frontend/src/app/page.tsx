'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { SendTransaction } from "../sendTransaction";
import { SwitchChain } from "../switchNetwork";
import { Balance } from "../balance";
import { WriteContract } from "../writeContract";

function App() {
  const account = useAccount()
  const { address, connector, isConnected } = useAccount();
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  // return (
  //   <>
  //     <div>
  //       <h2>Account</h2>
  //       <div>
  //         status: {account.status}
  //         <br />
  //         addresses: {JSON.stringify(account.addresses)}
  //         <br />
  //         chainId: {account.chainId}
  //       </div>

  //       {account.status === 'connected' && (
  //         <button type="button" onClick={() => disconnect()}>
  //           Disconnect
  //         </button>
  //       )}
  //     </div>

  //     <div>
  //       <h2>Connect</h2>
  //       {connectors.map((connector) => (
  //         <button
  //           key={connector.uid}
  //           onClick={() => connect({ connector })}
  //           type="button"
  //         >
  //           {connector.name}
  //         </button>
  //       ))}
  //       <div>{status}</div>
  //       <div>{error?.message}</div>
  //     </div>
  //   </>
  // )

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
