package com.pi.dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EntityManagerHandler {

	private static final String PERSISTENCE_UNIT_NAME = "MAVEN_HIBJPA_V1";
	
	private static EntityManagerFactory entityManagerFactory;
	
	public static EntityManager createEntityManager() {
		
		if(entityManagerFactory == null) {
			// Thread safe //
			entityManagerFactory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		}
		
		return entityManagerFactory.createEntityManager();
	}
	
	public static void close() {
		entityManagerFactory.close();
	}
	
}
