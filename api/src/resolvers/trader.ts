import { Arg, Query, Resolver } from 'type-graphql';

import { Trader } from '../db/models/trader.model';
import { services } from '../services';
import PaginatedResponse, { Paginated } from '../util/pagination';

const GetTradersPaginatedType = PaginatedResponse(Trader);

@Resolver()
export class TraderResolver {
  @Query(() => GetTradersPaginatedType)
  async traders(
    @Arg('page') page: number,
    @Arg('take') take: number,
    @Arg('param', { nullable: true }) param: string
  ): Promise<Paginated<Trader>> {
    const traders = await services.trader.findAllPaginated({
      page,
      take,
      param,
    });

    return traders;
  }
}
