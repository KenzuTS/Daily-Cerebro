package com.pi.entity;

import java.io.Serializable;

public class Credential implements Serializable {


	private static final long serialVersionUID = 8132623921154390840L;
	
	private String token;
	private User user;
	
	public Credential(String token, User user) {
		this.token = token;
		this.user = user;
	}
	
	public String getToken() {
		return this.token;
	}
	
	public void setToken(String token) {
		this.token = token;
	}
	
	public User getUser() {
		return this.user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
}
