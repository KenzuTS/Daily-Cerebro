package com.pi.dao;

public abstract class AbstractDAOFactory {
	
	public static final int JPA_DAO = 0x0;
	// and more if necessary...
	
	public abstract UserDAO  getUserDAO();
	public abstract RoleDAO getRoleDAO();
	public abstract StatsDAO getStatsDAO();
	public abstract GamesDAO getGamesDAO();
	public abstract CategoryDAO getCategoryDAO();
	
	public static AbstractDAOFactory getFactory(int factoryCode) {
		
		switch (factoryCode) {
		case JPA_DAO:
			return new JPADaoFactory();
			
		default:
			throw new IllegalArgumentException("Unexpected value: " + factoryCode);
		}
	}
	
}
