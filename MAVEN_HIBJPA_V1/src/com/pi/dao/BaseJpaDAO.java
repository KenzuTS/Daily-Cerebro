package com.pi.dao;

import javax.persistence.EntityManager;

public class BaseJpaDAO {

	protected EntityManager getEntityManager() {
		return EntityManagerHandler.createEntityManager();
	}
	
}
