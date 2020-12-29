import {HttpClient} from '@angular/common/http';

export function initializeFlamingo(httpService: HttpClient): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-console
      console.info('Startup Flamingo Services');
      resolve();
    });
  };
}

