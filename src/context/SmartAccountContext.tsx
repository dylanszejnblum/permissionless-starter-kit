import ABI from "@/utils/721Abi.json"
import { createSmartAccountClient } from "permissionless"
import {
  privateKeyToSafeSmartAccount,
  privateKeyToSimpleSmartAccount,
  signerToEcdsaKernelSmartAccount,
} from "permissionless/accounts"
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico"
import React, { ReactNode, useContext, useState } from "react"
import {
  createPublicClient,
  formatEther,
  http,
  PrivateKeyAccount,
} from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { sepolia } from "viem/chains"

// Context
export const SmartAccountContext = React.createContext({
  privateKey: "",
  Eoa: "",
  smartAddress: "",
  selectedAccount: "",
  kernelAccountAddress: "",
  balance: "",
  smartAccountClient: null,
  generatePrivateKeys: async () => {},
  createSimpleAccount: async () => {},
  createKernelAccount: async () => {},
  createSafeAccount: async () => {},
  getSmartAccountBalance: async () => {},
  mintErc721: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  importPrivateKeyToAccount: async (_importedPrivateKey: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendUserOp: async (_data: string) => {},
})

// Provider Props Type
interface SmartAccountProviderProps {
  children: ReactNode
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SmartAccountClientType = any

// Provider
export const SmartAccountProvider: React.FC<SmartAccountProviderProps> = ({
  children,
}) => {
  const [privateKey, setPrivateKey] = useState<string>("")
  const [Eoa, setEoa] = useState<string>("")
  const [account, setAccount] = useState<PrivateKeyAccount>()
  const [smartAddress, setSmartAddress] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [kernelAccountAddress, setKernelAccountAddress] = useState("")
  const [smartAccountClient, setSmartAccountClient] =
    useState<SmartAccountClientType | null>(null)
  const [balance, setBalance] = useState("")

  const paymasterClient = createPimlicoPaymasterClient({
    transport: http(
      `https://api.pimlico.io/v2/sepolia/rpc?apikey=YOUR-API-KEY`,
    ),
  })

  const bundlerClient = createPimlicoBundlerClient({
    transport: http(
      `https://api.pimlico.io/v1/sepolia/rpc?apikey=YOUR-API-KEY`,
    ),
  })

  const publicClient = createPublicClient({
    transport: http(
      "YOUR-ALCHEMY-CLIENT-URL",
    ),
  })

  const generatePrivateKeys = async () => {
    const ownerPrivateKey = generatePrivateKey()
    setPrivateKey(ownerPrivateKey)
    const account = privateKeyToAccount(ownerPrivateKey)
    setAccount(account)
    setEoa(account.address)
  }

  const importPrivateKeyToAccount = async (importedPrivateKey: string) => {
    const formattedPrivateKey = `${importedPrivateKey}` as `0x${string}`
    setPrivateKey(formattedPrivateKey)
    const account = privateKeyToAccount(formattedPrivateKey)
    setAccount(account)
    setEoa(account.address)
  }

  const createSimpleAccount = async () => {
    const simpleAccount = await privateKeyToSimpleSmartAccount(publicClient, {
      privateKey: privateKey,
      factoryAddress: "0x9406Cc6185a346906296840746125a0E44976454",
      entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // global entrypoint
    })

    setKernelAccountAddress(simpleAccount.address)
    setSelectedAccount("Simple Account")

    const smartAccountClient = createSmartAccountClient({
      account: simpleAccount,
      chain: sepolia,
      transport: http(
        `https://api.pimlico.io/v1/sepolia/rpc?apikey=YOUR-API-KEY`,
      ),
      sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
    })

    setSmartAccountClient(smartAccountClient)
    setSmartAddress(simpleAccount.address)
  }
  const createKernelAccount = async () => {
    const kernelAccount = await signerToEcdsaKernelSmartAccount(publicClient, {
      entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
      signer: account,
      index: 0n,
    })

    setKernelAccountAddress(kernelAccount.address)
    setSelectedAccount("Kernel Account")

    const smartAccountClient = createSmartAccountClient({
      account: kernelAccount,
      chain: sepolia,
      transport: http(
        `https://api.pimlico.io/v1/sepolia/rpc?apikey=YOUR-API-KEY`,
      ),
      sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
    })

    setSmartAccountClient(smartAccountClient)
    setSmartAddress(kernelAccount.address)
  }
  const createSafeAccount = async () => {
    const safeAccount = await privateKeyToSafeSmartAccount(publicClient, {
      privateKey: privateKey,
      safeVersion: "1.4.1",
      entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // global entrypoint
      saltNonce: 0n, // optional
    })

    setSelectedAccount("Safe Account")

    const smartAccountClient = createSmartAccountClient({
      account: safeAccount,
      chain: sepolia,
      transport: http(
        `https://api.pimlico.io/v1/sepolia/rpc?apikey=YOUR-API-KEY`,
      ),
      sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
    })

    setSmartAccountClient(smartAccountClient)
    setSmartAddress(safeAccount.address)
  }

  const getSmartAccountBalance = async () => {
    try {
      const balance = await publicClient.getBalance({
        address: smartAddress,
      })
      setBalance(formatEther(balance))
    } catch (error) {
      console.error("Failed to parse data or send transaction:", error)
    }
  }

  const mintErc721 = async () => {
    try {
      console.log("not working yet")
    } catch (error) {
      console.error("Failed to parse data or send transaction:", error)
    }
  }

  const sendUserOp = async (data: string) => {
    try {
      const gasPrices = await bundlerClient.getUserOperationGasPrice()
      const formatedData = JSON.parse(data)
      const tx = await smartAccountClient.sendTransaction({
        ...formatedData, // Include all properties from 'data'
        maxFeePerGas: gasPrices.fast.maxFeePerGas, // if using Pimlico
        maxPriorityFeePerGas: gasPrices.fast.maxPriorityFeePerGas, // if using Pimlico
      })
      console.log("Transaction sent successfully:", tx)
    } catch (error) {
      console.error("Failed to parse data or send transaction:", error)
    }
  }

  return (
    <SmartAccountContext.Provider
      value={{
        privateKey,
        Eoa,
        smartAddress,
        balance,
        getSmartAccountBalance,
        selectedAccount,
        createSimpleAccount,
        kernelAccountAddress,
        mintErc721,
        createSafeAccount,
        smartAccountClient,
        generatePrivateKeys,
        importPrivateKeyToAccount,
        createKernelAccount,
        sendUserOp,
      }}
    >
      {children}
    </SmartAccountContext.Provider>
  )
}

// Hook
export const useSmartAccountContext = () => useContext(SmartAccountContext)
