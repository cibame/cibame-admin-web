import {InjectionToken} from '@angular/core';

export const FLAMINGO_APP_CONFIG = new InjectionToken<string>('FlamingoAppConfig');

export interface FlamingoAppConfig {
  storagePrefix: string;
}
