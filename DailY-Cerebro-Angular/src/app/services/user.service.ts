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
		return this.http.post(`https://testuser-9c352.firebaseio.com/users/register`, user);
	}

	update(user: User) {
		return this.http.put(`https://testuser-9c352.firebaseio.com/users/${user.id}`, user);
	}

	delete(id: number) {
		return this.http.delete(`https://testuser-9c352.firebaseio.com/users/${id}`);
	}
}
