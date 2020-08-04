import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Toon } from './toon';
import { MessageService } from './message.service';
import { ToonDetails } from './toonDetails';

@Injectable({ providedIn: 'root' })
export class ToonsService {
  // private toonsUrl = '/api/toons'; // URL to web api
  private toonsUrl = 'http://localhost:4200/api/toons'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET toons from the server */
  getToons(): Observable<Toon[]> {
    return this.http.get<Toon[]>(this.toonsUrl).pipe(
      tap((_) => this.log('fetched toons!')),
      catchError(this.handleError<Toon[]>('getToons', []))
    );
  }
  
  /** GET toon by id. Return `undefined` when id not found */
  getToonNo404<Data>(id: number): Observable<Toon> {
    const url = `${this.toonsUrl}/?id=${id}`;
    return this.http.get<Toon[]>(url).pipe(
      map((toons) => toons[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} toon id=${id}`);
      }),
      catchError(this.handleError<Toon>(`getToon id=${id}`))
    );
  }

  /** GET toon by realmSlug, toonName. Will 404 if id not found */
  getToonDetail(realmSlug: string, toonName: string): Observable<ToonDetails> {
    const url = `${this.toonsUrl}/${realmSlug}/${toonName}`;
    return this.http.get<ToonDetails>(url).pipe(
      tap((_) => this.log(`fetched toon details id=${realmSlug}-${toonName}`)),
      catchError(this.handleError<ToonDetails>(`getToonDetails id=${realmSlug}-${toonName}`))
    );
  }

  /* GET toons whose name contains search term */
  searchToons(term: string): Observable<Toon[]> {
    if (!term.trim()) {
      // if not search term, return empty toon array.
      return of([]);
    }
    return this.http.get<Toon[]>(`${this.toonsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found toons matching "${term}"`)
          : this.log(`no toons matching "${term}"`)
      ),
      catchError(this.handleError<Toon[]>('searchToons', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new toon to the server */
  addToon(toon: Toon): Observable<Toon> {
    return this.http.post<Toon>(this.toonsUrl, toon, this.httpOptions).pipe(
      tap((newToon: Toon) => this.log(`added toon w/ id=${newToon.id}`)),
      catchError(this.handleError<Toon>('addToon'))
    );
  }

  /** DELETE: delete the toon from the server */
  deleteToon(toon: Toon | number): Observable<Toon> {
    const id = typeof toon === 'number' ? toon : toon.id;
    const url = `${this.toonsUrl}/${id}`;

    return this.http.delete<Toon>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted toon id=${id}`)),
      catchError(this.handleError<Toon>('deleteToon'))
    );
  }

  /** PUT: update the toon on the server */
  updateToon(toon: Toon): Observable<any> {
    return this.http.put(this.toonsUrl, toon, this.httpOptions).pipe(
      tap((_) => this.log(`updated toon id=${toon.id}`)),
      catchError(this.handleError<any>('updateToon'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ToonsService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ToonsService: ${message}`);
  }
}
