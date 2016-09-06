import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";


import { SearchService, SearchResult } from "./search.service";

@Component({
  selector: 'my-app',
  templateUrl: 'dist/app.html',
  providers: [
    SearchService
  ]
})
export class AppComponent implements OnInit {
  text: FormControl = new FormControl();
  month: FormControl = new FormControl();
  months: Array<string> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  searchResults: Array<SearchResult> = [];

  stuff: Array<string> = [];

  addToStuff(label: string, v: any) {
    this.stuff.push(`${label}: ${v}`);
  }

  constructor(private service: SearchService) {
  }

  ngOnInit() {
    const search = (v: any) => { return this.service.searchFor(...v); };
    const log = (l: string) => { return (v) => this.addToStuff(l, v); };
    const addToDisplay = (r: SearchResult) => { this.searchResults.push(r); };

    Observable
      .combineLatest(
        this.text.valueChanges.do(log("text")),
        this.month.valueChanges.do(log("month")))
      .switchMap(search)
      .subscribe(addToDisplay);

    // set defaults
    this.text.setValue("foo");
    this.month.setValue("December");
  }
}
