package com.pi.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "role")
public class Role implements Serializable {
	
	private static final long serialVersionUID = 2449205372684762653L;
	
	/********************************* VARS ************************************/
	
	@Id
	private String name;
	private int level;
	
	/***************************** CONSTRUCTORS ********************************/
	
	public Role() {
		this("USER", 1);
	}
	
	public Role(String name, int level) {
		this.name = name;
		this.level = level;
	}

	/****************************** PROPERTIES *********************************/


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}
	
	/****************************** OVERRIDDEN *********************************/
	
	@Override
	public String toString() {
		return "Role [name=" + name + ", level=" + level + "]";
	}
	
}
