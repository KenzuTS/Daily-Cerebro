import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, setTestabilityGetter } from '@angular/core';
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

	initDB() {
		let users = [
			{
				id: 1,
				username: "seba",
				password: "123456",
				firstName: "sebastien",
				lastName: "tonneau"
			},

			{
				id: 2,
				username: "seba2",
				password: "123456",
				firstName: "sestien",
				lastName: "nnau"
			},

			{
				id: 3,
				username: "seba3",
				password: "123456",
				firstName: "sebast",
				lastName: "tneau"
			},
		];
		this.http.post(`https://testuser-9c352.firebaseio.com/users.json`, users).subscribe(
			() => {
				console.log("post done");
			},
			(error) => {
				console.log(error);
			}
		);
	}

	testCallService(){
		const proxyurl = "https://cors-anywhere.herokuapp.com/";

		let headersOption = new HttpHeaders();
		headersOption = headersOption.append('Access-Control-Allow-Origin', '*');
		headersOption = headersOption.append('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH']);
		headersOption = headersOption.append('Access-Control-Allow-Headers', '*');
		headersOption = headersOption.append('Access-Control-Expose-Headers', '*');

		console.log(headersOption);
		console.log(headersOption.getAll('Access-Control-Allow-Origin'));
		console.log(headersOption.getAll('Access-Control-Allow-Methods'));
		console.log(headersOption.getAll('Access-Control-Allow-Headers'));
		console.log(headersOption.getAll('Access-Control-Expose-Headers'));

		// http://localhost:8080/MAVEN_HIBJPA_V1/test
		this.http.get<any>("http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/getAll", {
			headers: headersOption
		}).subscribe(
			(response) => {
				console.log(response);
				console.log(this.http);
			},
			(error) => {
				console.log(error);
				console.log(this.http);
			}
		)
	}
}
