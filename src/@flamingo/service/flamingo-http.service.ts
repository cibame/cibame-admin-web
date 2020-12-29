import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlamingoHttpService {
  private readonly commonHeaders: HttpHeaders;
  private readonly baseUrl;

  constructor(private http: HttpClient) {
    this.commonHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.baseUrl = environment.baseUrl || '';
  }

  public get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const URL = this.baseUrl + url;

    return this.http.get<T>(URL, {
      headers: headers ? headers : this.commonHeaders,
      params,
      responseType: 'json'
    });
  }

  public post<T>(
    url: string,
    body?: any | null,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    const URL = this.baseUrl + url;

    return this.http.post<T>(URL, body, {
      headers: headers ? headers : this.commonHeaders,
      params,
      responseType: 'json'
    });
  }

  public put<T>(
    url: string,
    body?: any | null,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    const URL = this.baseUrl + url;

    return this.http.put<T>(URL, body, {
      headers: headers ? headers : this.commonHeaders,
      params,
      responseType: 'json'
    });
  }

  public patch<T>(
    url: string,
    body?: any | null,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    const URL = this.baseUrl + url;

    return this.http.put<T>(URL, body, {
      headers: headers ? headers : this.commonHeaders,
      params,
      responseType: 'json'
    });
  }

  public delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const URL = this.baseUrl + url;

    return this.http.delete<T>(URL, {
      headers: headers ? headers : this.commonHeaders,
      params,
      responseType: 'json'
    });
  }

}
