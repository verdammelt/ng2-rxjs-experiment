import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

export class SearchResult {
  constructor(public args: Array<string> = []) { };
  toString(): string {
    return this.args.join("-");
  }
}

@Injectable()
export class SearchService {
  searchFor(...args: Array<any>): Observable<SearchResult> {
    return Observable.create((o) => {
      const delay = Math.random() * 5000;

      setTimeout(() => {
        o.next(new SearchResult(args));
        o.complete();
      }, delay);
    });
  }
}
