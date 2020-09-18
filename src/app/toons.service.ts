import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { Toon } from './toon';
import { MessageService } from './message.service';
import { ToonDetails } from './toonDetails';
import { Item } from './item';

@Injectable({ providedIn: 'root' })
export class ToonsService {
  private toonsUrl = '/api/toons'; // URL to web api
  toons: Toon[] = [];
  loading = false;
  equipmentLoaded = false;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.retrieveToons();
  }

  /** GET toons from the server */
  private retrieveToons(): void {
    this.loading = true;
    this.http.get<Toon[]>(this.toonsUrl).pipe(
      tap((_) => this.log('fetched toons!')),
      catchError(this.handleError<Toon[]>('getToons', []))
    ).subscribe((toons) => {
      this.toons = toons;
      forkJoin(
        toons.map((toon: Toon) =>
          this.getToonDetail(
            toon.realm.slug,
            toon.name.toLowerCase()
          )
        )
      ).subscribe((toonsDetails) => {
        toons.forEach((toon, index) => {
          toon.details = toonsDetails[index];
        });
        this.toons = toons.sort(
          (a: Toon, b: Toon) =>
            b.details.profile.averageItemLevel -
            a.details.profile.averageItemLevel
        );
        this.loading = false;
      });
    });
  }

  retrieveToonsEquipment(){
    console.group('items');
    forkJoin(this.toons.map(toon => {
      if(!toon.items){
        return this.getToonEquipment(toon.realm.slug, toon.name)
      }else{
        return [toon.items];
      }
    })).subscribe((items) => {
      this.toons.forEach((toon, index) => {
        toon.items = items[index] as Item[];
      });
    });
  }

  getToons() : Toon[] {
    return this.toons;
  }

  getToonsWithEquipment() : Toon[] {
    this.retrieveToonsEquipment();
    this.equipmentLoaded = true;
    return this.toons;
  }
  getToon(realmSlug: string, toonName: string) : Toon {
    const foundToon =  this.toons.find(toon => (toon.name.toLowerCase() === toonName.toLowerCase() && toon.realm.slug === realmSlug) );
    if (!foundToon?.items) {
      this.getToonEquipment(realmSlug,toonName).subscribe((items: Item[]) => {
        foundToon.items = items;
      })
    }
    return foundToon;
  }

  /** GET toon by realmSlug, toonName. Will 404 if id not found */
  getToonDetail(realmSlug: string, toonName: string): Observable<ToonDetails> {
    const url = `${this.toonsUrl}/${realmSlug}/${toonName}`;
    return this.http.get<ToonDetails>(url).pipe(
      tap((_) => this.log(`fetched toon details id: ${realmSlug}-${toonName}`)),
      retry(2),
      catchError(
        this.handleError<ToonDetails>(
          `getToonDetails id=${realmSlug}-${toonName}`
        )
      )
    );
  }

  getToonEquipment(realmSlug: string, toonName: string): Observable<Item[]> {
    const url = `${this.toonsUrl}/${realmSlug}/${toonName.toLowerCase()}/items`;
    return this.http.get<Item[]>(url).pipe(
      tap((_) => this.log(`fetched toon items id: ${realmSlug}-${toonName}`)),
      retry(2),
      catchError(
        this.handleError<Item[]>(
          `getToonEquipment id=${realmSlug}-${toonName}`
        )
      )
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
