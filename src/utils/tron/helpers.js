import {
  TRON_CHAIN_ID_HEX,
  TRON_MAINNET_CHAIN_ID,
} from "./constants";

export const toDeadline = (expiration) => {
  return Math.floor((Date.now() + expiration) / 1000);
};

export const getDeadline = (years = 1) =>
  toDeadline(1000 * 60 * 60 * 24 * 365 * years);

const parseDomainChainId = (chainId) => {
  if (chainId == null) return null;
  if (typeof chainId === "string" && chainId.startsWith("0x")) {
    return BigInt(chainId);
  }
  if (typeof chainId === "bigint") return chainId;
  return BigInt(chainId);
};

const isTronMainnetEip712ChainId = (chainId) =>
  parseDomainChainId(chainId) === BigInt(TRON_MAINNET_CHAIN_ID);

/** Domain chainId differs from active Tron network — TronLink adapter rejects signing. */
const isBridgedEip712Domain = (domain = {}) => {
  const parsed = parseDomainChainId(domain.chainId);
  return parsed != null && !isTronMainnetEip712ChainId(parsed);
};

const getPrimaryType = (types = {}) =>
  Object.keys(types).find((key) => key !== "EIP712Domain");

/** Normalize EIP-712 / TIP-712 domain for TronLink (hex chainId). */
export const normalizeTronTypedDataDomain = (domain = {}) => {
  const normalized = { ...domain };
  if (normalized.chainId != null) {
    const chainIdBigInt = parseDomainChainId(normalized.chainId);
    normalized.chainId =
      typeof normalized.chainId === "string" &&
      normalized.chainId.startsWith("0x")
        ? normalized.chainId
        : "0x" + chainIdBigInt.toString(16);
  } else {
    normalized.chainId = TRON_CHAIN_ID_HEX;
  }
  return normalized;
};

/**
 * Sign TIP-712 typed data via TronLink-injected TronWeb or wallet adapter.
 * Includes bridged-domain fallback (_signTypedData) for non-mainnet chainIds.
 */
export const signTronTypedData = async (
  tronWeb,
  wallet,
  { domain, types, message }
) => {
  if (!tronWeb?.trx) {
    throw new Error("TronWeb is not available");
  }

  const normalizedDomain = normalizeTronTypedDataDomain(domain);
  const primaryType = getPrimaryType(types);
  const trx = tronWeb.trx;

  if (isBridgedEip712Domain(normalizedDomain)) {
    console.log(
      "bridged EIP-712 domain chainId",
      normalizedDomain.chainId,
      "— using tronWeb.trx._signTypedData"
    );
    if (typeof trx._signTypedData === "function") {
      return await trx._signTypedData(normalizedDomain, types, message);
    }
    if (typeof trx.signTypedData === "function") {
      return await trx.signTypedData(normalizedDomain, types, message);
    }
    throw new Error(
      "TronWeb typed-data signing unavailable for bridged token domain"
    );
  }

  if (wallet?.adapter?.signTypedData) {
    const result = await wallet.adapter.signTypedData({
      domain: normalizedDomain,
      types,
      primaryType,
      message,
    });
    return typeof result === "string" ? result : result?.signature;
  }

  if (typeof trx.signTypedData === "function") {
    return await trx.signTypedData(normalizedDomain, types, message);
  }

  const signature = await trx._signTypedData(normalizedDomain, types, message);
  return signature;
};

export const createApprovalObject = (
  tokenData,
  { address, chainId, owner },
  hash,
  handleType
) => ({
  address,
  chainId,
  tokenData,
  transactionHash: hash,
  handleType,
  owner,
});
