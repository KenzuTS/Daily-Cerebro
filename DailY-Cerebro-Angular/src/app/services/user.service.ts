import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get<User[]>(`http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/getAll`);
	}

	getById(id: number) {
		return this.http.get<User>(`http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/get/${id}`);
	}

	register(user: User) {
		return this.http.post(`http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/register`, user);
	}

	update(user: User) {
		return this.http.put(`http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/update`, user);
	}

	delete(id: number) {
		return this.http.delete(`http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/delete/${id}`);
	}
}
