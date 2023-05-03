import {UserFlowContext, UserFlowInteractionsFn, UserFlowOptions, UserFlowProvider,} from '@push-based/user-flow';

import {mergeBudgets} from '../internals/test-sets';
import {ToolBarUfo} from "../ufo/desktop/tool-bar.ufo";
import {TmdbUfo} from "../ufo/desktop/tmdb.ufo";

const flowOptions: UserFlowOptions = {
  name: 'Basic user flow to ensure basic functionality',
};

const interactions: UserFlowInteractionsFn = async (
  ctx: UserFlowContext
): Promise<any> => {
  const {page, flow, collectOptions} = ctx;
  const url = `${collectOptions.url}/list/category/popular`;
  const toolbar = new ToolBarUfo(ctx);
  const tmdpPage = new TmdbUfo(ctx);

  await page.setCacheEnabled(false);

  await flow.navigate(url, {
    stepName: '🧭 Initial navigation',
    config: {
      extends: 'lighthouse:default',
      settings: {
        budgets: mergeBudgets([
          "./projects/movies-user-flows/src/configs/angular.budgets.json",
          "./projects/movies-user-flows/src/configs/general-timing.budgets.json",
          "./projects/movies-user-flows/src/configs/movie-list.budgets.json"
        ]),
      },
    },
  });

  await flow.startTimespan({
    stepName: '🔑 Log in',
  });
  await toolbar.goToTmDbLogin();

  await flow.endTimespan();

  await tmdpPage.login();

  await toolbar.ensureLoginDone();


  return Promise.resolve();
};

const userFlowProvider: UserFlowProvider = {
  flowOptions,
  interactions,
  launchOptions: {
    headless: false,
    defaultViewport: {width: 1280, height: 1600},
    userDataDir: "./tmp"
  }
};

module.exports = userFlowProvider;
