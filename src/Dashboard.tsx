import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSmartAccountContext } from "@/context/SmartAccountContext"
import { useState } from "react"
import { parseEther } from "viem"

const Dashboard = () => {
  const [localPrivateKey, setLocalPrivateKey] = useState<string>("")
  const {
    generatePrivateKeys,
    smartAddress,
    Eoa,
    privateKey,
    createKernelAccount,
    sendUserOp,
    selectedAccount,
    importPrivateKeyToAccount,
    createSimpleAccount,
    createSafeAccount,
    getSmartAccountBalance,
    balance,
    mintErc721,
  } = useSmartAccountContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPrivateKey(e.target.value)
  }
  return (
    <>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Playground</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Eoa Setup</CardTitle>
              </CardHeader>
              <CardContent className="pl-2 flex flex-col ">
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={() => {
                      generatePrivateKeys()
                    }}
                  >
                    Generate Private Key
                  </Button>
                  <span className=" font-bold tracking-tight">
                    Your EOA Address : {Eoa}
                  </span>
                  <span className=" font-bold tracking-tight">
                    EOA Private key {privateKey}
                  </span>
                  <Input
                    type="text"
                    placeholder="Paste Private key"
                    value={localPrivateKey}
                    onChange={handleInputChange}
                  />
                  <Button
                    onClick={() => {
                      importPrivateKeyToAccount(localPrivateKey)
                    }}
                  >
                    Set custom Private key
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Faucet</CardTitle>
                <CardDescription>
                  You are currently connected to Sepolia Testnet for test ETH
                  and tokens please refer to the following faucet
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2">
                <a href="https://sepoliafaucet.com/">
                  <Button variant="outline">Alchemy Faucet</Button>
                </a>
                <a href="https://www.infura.io/faucet/sepolia">
                  <Button variant="outline"> Infura Faucet</Button>
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Smart Account Client</CardTitle>
                <CardDescription>
                  {" "}
                  Selected account:
                  <span className="font-bold text-xl text-purple-500">
                    {" "}
                    {selectedAccount}{" "}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2">
                <span className=" font-bold tracking-tight">
                  Select the account type
                </span>
                <Button
                  onClick={() => {
                    createSimpleAccount()
                  }}
                >
                  Simple Account
                </Button>
                <Button
                  className="bg-blue-500"
                  onClick={() => {
                    createKernelAccount()
                  }}
                >
                  Kernel Account
                </Button>
                <Button
                  onClick={() => {
                    createSafeAccount()
                  }}
                  className="bg-green-500"
                >
                  Safe Account
                </Button>
                <Button disabled={true} className="bg-red-500">
                  Biconomy Account (Coming soon)
                </Button>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Smart Account Actions Actions</CardTitle>
                <CardDescription>
                  Available actions for your smart account
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2">
                <span className=" font-bold tracking-tight">
                  Account address: {smartAddress}
                </span>
                <span className=" font-bold tracking-tight">
                  Current Balance: {balance}
                </span>

                <Button
                  onClick={() => {
                    getSmartAccountBalance()
                  }}
                >
                  Get Balance
                </Button>

                <Button
                  onClick={() => {
                    sendUserOp(
                      JSON.stringify({
                        to: "0x9e51BB5169931ee745d44F01168172c80678B628",
                        value: parseEther("0.05").toString(),
                      }),
                    )
                  }}
                >
                  Send dummy userOP
                </Button>
                <Button disabled={true} onClick={() => {}}>
                  {" "}
                  Mint test ERC-721
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"></div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
