package com.pi.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import com.pi.entity.User;

public class UserDAO extends BaseJpaDAO implements GenericDAO<User, Integer>, IUserAuth {
	
	public UserDAO() {}

	@Override
	public User create(User entity) {
		EntityManager em = getEntityManager();
		em.getTransaction().begin();
		em.persist(entity);
		em.flush();
		em.refresh(entity);
		em.getTransaction().commit();
		em.close();
		return entity;
	}

	@Override
	public User update(User entity) {
		EntityManager em = getEntityManager();
		em.getTransaction().begin();
		User user = em.find(User.class, entity.getID());
		user = em.merge(entity);
		em.getTransaction().commit();
		em.close();
		return user;
	}

	@Override
	public User get(Integer id) {
		EntityManager em = getEntityManager();
		User user = em.find(User.class, id);
//		em.refresh(user);
		em.close();
		return user;
	}

	@Override
    public void delete(int id) {
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        User u = em.find(User.class, id);
        em.remove(u);
        em.getTransaction().commit();
        em.close();
    }

	@Override
	public List<User> getAll() {
		EntityManager em = getEntityManager();
		List<User> users = em.createQuery("from User",  User.class).getResultList();
		em.close();
		return users;
	}

	@Override
	public long getCount() {
		EntityManager em = getEntityManager();
		long count = em.createQuery("from User",  User.class).getResultList().size();
		em.close();
		return count;
	}

	public User userValidation(String email, String password) {
		
		EntityManager em = getEntityManager();
		TypedQuery<User> query = em.createQuery("Select u FROM User u WHERE u.email = :email AND"
                + " u.password = :password ", User.class);
        query.setParameter("email", email);
        query.setParameter("password", password);
        
        User user = query.getSingleResult();
        em.close();

        return user;
	}

}
