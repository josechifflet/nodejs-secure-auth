import { CandleChartInterval_LT } from 'binance-api-node';

export const timeFrameToMilliseconds = (timeFrame: CandleChartInterval_LT) => {
  switch (timeFrame) {
    case '1m':
      return 60000;
    case '3m':
      return 180000;
    case '5m':
      return 300000;
    case '15m':
      return 900000;
    case '30m':
      return 1800000;
    case '1h':
      return 3600000;
    case '2h':
      return 7200000;
    case '4h':
      return 14400000;
    case '6h':
      return 21600000;
    case '8h':
      return 28800000;
    case '12h':
      return 43200000;
    case '1d':
      return 86400000;
    case '3d':
      return 259200000;
    case '1w':
      return 604800000;
    case '1M':
      return 2629743830;
    default:
      throw new Error(`Invalid time frame: ${timeFrame}`);
  }
};
