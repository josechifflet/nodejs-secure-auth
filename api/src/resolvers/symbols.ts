import { Query, Resolver } from 'type-graphql';

import { db } from '../db';
import { Symbol } from '../db/models/symbol.model';

@Resolver()
export class SymbolResolver {
  @Query(() => [Symbol])
  async symbols() {
    const symbols = await db.repositories.symbol.find();
    return symbols;
  }
}
