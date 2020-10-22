import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import * as jQuery from '../../../node_modules/jquery';
import { User } from '../models/user';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private http: HttpClient
	) { }

	ngOnInit(): void {
	}
}
