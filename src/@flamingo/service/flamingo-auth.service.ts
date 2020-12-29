import {Inject, Injectable} from '@angular/core';
import {FLAMINGO_APP_CONFIG, FlamingoAppConfig} from '../flaming.config';

export enum StorageMode {
  session,
  local
}

export enum TokenType {
  basic,
  bearer
}

@Injectable({
  providedIn: 'root',
})
export class FlamingoAuthService {
  private storagePrefix: string;

  constructor(@Inject(FLAMINGO_APP_CONFIG) config?: FlamingoAppConfig) {
    this.storagePrefix = config?.storagePrefix ? config?.storagePrefix : 'flamingo_';
  }

  get hasAuthorizationToken(): boolean {
    return !!this.authorizationToken;
  }

  get authorizationToken(): string | null {
    return this.getToken('authorization');
  }

  get hasRefreshToken(): boolean {
    return !!this.refreshToken;
  }

  get refreshToken(): string | null {
    return this.getToken('refresh_token');
  }

  getToken(tokenId: string): string | null {
    return sessionStorage.getItem(this.storagePrefix + tokenId) || localStorage.getItem(this.storagePrefix + tokenId) || null;
  }

  setAuthorizationToken(value: string, storageMode: StorageMode, type: TokenType): void {
    this.setToken('authorization', value, storageMode, type);
  }

  setRefreshToken(value: string, storageMode: StorageMode): void {
    this.setToken('refresh_token', value, storageMode);

  }

  private setToken(tokenId: string, value: string, storageMode: StorageMode, type?: TokenType): void {
    this.clearStorage(tokenId);

    switch (type) {
      case TokenType.basic:
        value = 'Basic ' + value;
        break;
      case TokenType.bearer:
        value = 'Bearer ' + value;
        break;
      default:
        break;
    }
    this.store(value, tokenId, storageMode);
  }

  private store(value: string, suffix: string, storageMode: StorageMode): void {
    if (storageMode === StorageMode.session) {
      sessionStorage.setItem(this.storagePrefix + suffix, value);
    } else {
      localStorage.setItem(this.storagePrefix + suffix, value);
    }
  }

  public generateBasicToken(username: string, password: string): string {
    return btoa(`${username}:${password}`);
  }

  private clearStorage(tokenId: string): void {
    sessionStorage.removeItem(this.storagePrefix + tokenId);
    localStorage.removeItem(this.storagePrefix + tokenId);
  }

  public logout(): void {
    Object.entries(sessionStorage)
      .map(x => x[0])
      .filter(x => x.substring(0, this.storagePrefix.length) === this.storagePrefix)
      .map(x => sessionStorage.removeItem(x));

    Object.entries(localStorage)
      .map(x => x[0])
      .filter(x => x.substring(0, this.storagePrefix.length) === this.storagePrefix)
      .map(x => localStorage.removeItem(x));
  }
}
