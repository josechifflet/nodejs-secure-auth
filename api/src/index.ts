import App from './core/express/app';
import log from './util/tslog';

(async () => {
  try {
    await App();
  } catch (err) {
    log.error(`Exec file error: ${err}`);
  }
})();
