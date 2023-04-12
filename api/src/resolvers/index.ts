import { CacheResolver } from './cache';
import { SymbolResolver } from './symbols';
import { TraderResolver } from './trader';

export const resolvers = [TraderResolver, CacheResolver, SymbolResolver];
