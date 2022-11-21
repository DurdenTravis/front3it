import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from "rxjs";
import { Poll } from "../models/poll";
import { PollRequest } from "../models/pollRequest";


@Injectable({
    providedIn: 'root'
  })
  export class ApiRestService {
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    springURL = environment.springURL;

    constructor(
        private httpClient: HttpClient
      ) { }

      public getPollsPercents(): Observable<any> {
      
        return this.httpClient.get(this.springURL + 'polls/', { responseType: 'json' }).pipe(
          map((response: any) => {
            (response as Poll[]).map(poll => {
               return poll;
            });
            return response;
          }),
        );
      }

      public createPoll(poll: PollRequest): Observable<PollRequest> {
        return this.httpClient.post(this.springURL + 'polls/poll', poll, { headers: this.httpHeaders })
            .pipe(
                map((response: any) => response.poll as PollRequest),
                catchError(e => {
                    if (e.status == 400) {
                        return throwError(e);
                    }
                    console.error(e.error.mensaje);
                    return throwError(e);
                })
            );
    }

  }