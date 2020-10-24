package com.pi.dao;

import javax.persistence.EntityManager;

public abstract class JpaDAO{
	
	// JPA
	protected EntityManager entityManager;
	
	// pour l'instant je ne travaille qu'avec l'entityManager (JPA)
	public JpaDAO(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	 
}
