import { HttpClient } from '@angular/common/http';
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
}
