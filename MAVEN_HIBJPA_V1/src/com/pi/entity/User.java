package com.pi.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User implements Serializable {

	/****************************************
	 * VARS
	 ****************************************/

	private static final long serialVersionUID = -4028834163076891875L;
	
	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int iD;
	private String email;
	private String password;
	private String username;
	@ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name="role_id", nullable = false)
	private Role role;

	/*************************************
	 * CONSTRUCTOR
	 ************************************/

	public User() {
		this("JohnDoe@gmail.com", "cisco", "John Doe");
	}

	public User(String email, String password, String userName ) {
		this.email = email;
		this.password = password;
		this.username = userName;
	}

	/**************************************
	 * PROPERTIES
	 *************************************/


	public int getID() {
		return iD;
	}

	public void setID(int userID) {
		this.iD = userID;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
    public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	/**************************************
	 * OVERRIDDEN
	 *************************************/
	
	@Override
	public String toString() {
		return "User [id=" + iD + ", email=" + email + ", password=" + password + ", username=" + username + ", role="
				+ role + "]";
	}
	
	
}
