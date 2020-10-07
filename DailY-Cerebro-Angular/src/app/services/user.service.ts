import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get<User[]>(`urlServer/users`);
	}

	getById(id: number) {
		return this.http.get(`urlServer/users/${id}`);
	}

	register(user: User) {
		return this.http.post(`urlServer/users/register`, user);
	}

	update(user: User) {
		return this.http.put(`urlServer/users/${user.id}`, user);
	}

	delete(id: number) {
		return this.http.delete(`urlServer/users/${id}`);
	}
}
