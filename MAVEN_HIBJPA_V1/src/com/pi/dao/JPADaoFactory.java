package com.pi.dao;

public class JPADaoFactory extends AbstractDAOFactory{

	@Override
	public UserDAO getUserDAO() {
		return new UserDAO();
	}

	@Override
	public RoleDAO getRoleDAO() {
		return new RoleDAO();
	}

	@Override
	public StatsDAO getStatsDAO() {
		return new StatsDAO();
	}

	@Override
	public GamesDAO getGamesDAO() {
		return new GamesDAO();
	}

	@Override
	public CategoryDAO getCategoryDAO() {
		return new CategoryDAO();
	}
	
}
