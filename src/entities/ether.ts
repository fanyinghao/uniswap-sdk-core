import invariant from 'tiny-invariant'
import { Currency } from './currency'
import { NativeCurrency } from './nativeCurrency'
import { Token } from './token'
import { WETH9 } from './weth9'

/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeCurrency {
  protected constructor(chainId: number, decimals?: number, symbol?: string, name?: string) {
    super(chainId, decimals ?? 18, symbol ?? 'ETH', name ?? 'Ether')
  }

  public get wrapped(): Token {
    const weth9 = WETH9[this.chainId]
    invariant(!!weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: number]: Ether } = {}

  public static onChain(chainId: number, decimals?: number, symbol?: string, name?: string): Ether {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Ether(chainId, decimals, symbol, name))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
