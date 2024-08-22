import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term:'',countries: []},
    byCountry: {term:'',countries: []},
    byRegion: {term:'',countries: []}
  }
  constructor(private http : HttpClient) {
    this.loadFromLocalStorage();
  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
          .pipe(
        catchError(() => of([])),
      );
  }

  searchCountryByAlphaCode( alphaCode: string ): Observable<Country | null>{
    return this.http.get<Country[]>(`${ this.apiUrl }/alpha/${ alphaCode }` )
    .pipe(
      map(countries => countries.length >0 ? countries[0] : null),
      catchError(() => of(null))
    );
}

  searchCapital( term: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest( url )
    .pipe(
      tap(countries => this.cacheStore.byCapital= {term, countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry( term: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ term }` ;
    return this.getCountriesRequest( url )
    .pipe(
      tap(countries => this.cacheStore.byCountry= {term, countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion( term: Region ): Observable<Country[]>{
    const url = `${ this.apiUrl }/region/${ term }`;
    return this.getCountriesRequest( url )
    .pipe(
      tap(countries => this.cacheStore.byRegion= {term, countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  private saveToLocalStorage(){
    localStorage.setItem( 'cacheStore' , JSON.stringify( this.cacheStore ) );
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem( 'cacheStore' )) return;
    this.cacheStore= JSON.parse( localStorage.getItem( 'cacheStore' )!);
  }

}
