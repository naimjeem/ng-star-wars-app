import { getConfig } from './environment.common';

export const environment = {
  production: false,
  config: {
    ...getConfig()
  }
};

