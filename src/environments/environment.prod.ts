import { getConfig } from './environment.common';

export const environment = {
  production: true,
  config: {
    ...getConfig()
  }
};