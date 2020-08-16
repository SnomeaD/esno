import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Toon } from './toon';
import { MessageService } from './message.service';
import { ToonDetails } from './toonDetails';

@Injectable({ providedIn: 'root' })
export class ToonsService {
  private toonsUrl = '/api/toons'; // URL to web api

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
