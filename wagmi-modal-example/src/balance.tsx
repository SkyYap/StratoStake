import { useAccount, useBalance, useSignTypedData } from "wagmi"
import { formatUnits } from 'viem'

export function Balance() {
  const { address } = useAccount();
  const { signTypedData, data, error, isError } = useSignTypedData();

  console.log({ data, error, isError });

  const { data: default_ } = useBalance({ address });
  const { data: account_ } = useBalance({ address });

  return (
    <div>
      <h2>Balance</h2>

      {/* <div>Balance (Default Chain): {default_?.formatted}</div>
      <div>Balance (Account Chain): {account_?.formatted}</div> */}
      <div>Balance (Default Chain): {formatUnits(default_?.value ?? 0n, default_?.decimals ?? 18)}</div>
      <div>Balance (Account Chain): {formatUnits(account_?.value ?? 0n, account_?.decimals ?? 18)}</div>

      <br />
      <button
        onClick={() => {
          signTypedData({
            types: {
              Person: [
                { name: "name", type: "string" },
                { name: "wallet", type: "address" },
              ],
              Mail: [
                { name: "from", type: "Person" },
                { name: "to", type: "Person" },
                { name: "contents", type: "string" },
              ],
            },
            primaryType: "Mail",
            message: {
              from: {
                name: "Cow",
                wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
              },
              to: {
                name: "Bob",
                wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              },
              contents: "Hello, Bob!",
            },
          });
        }}
      >
        Sign message using useSignTypedData
      </button>
    </div>
  );
}
