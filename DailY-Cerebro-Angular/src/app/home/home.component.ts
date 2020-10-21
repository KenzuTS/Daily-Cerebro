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

	testCallService() {

		// this.http.get("http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/getAll").subscribe(
		// 	data => {console.log(data);},
		// 	error => {console.log(error);}
		// )
		// return;

		this.http.get<User>(`http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/get/1`).subscribe(
			data => {console.log(data);},
			error => {console.log(error);}
		)
		return;

		jQuery.ajax({

			url: "http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/getAll",
			crossDomain: true,
			type: "GET",

			contentType: 'application/json; charset=utf-8',
			dataType: 'JSON',
			async: false, //VERY IMPORTANT

			success: function (resultData) {
				console.log(resultData);
				//alert("success");

			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert("failed");
			},
			timeout: 120000,
		});
	}
}
