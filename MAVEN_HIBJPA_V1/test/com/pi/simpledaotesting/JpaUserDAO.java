package com.pi.simpledaotesting;

import java.util.List;

import javax.persistence.EntityManager;

import com.pi.entity.User;

public class JpaUserDAO extends JpaDAO implements GenericDAO<User, Integer> {

    public JpaUserDAO(EntityManager entityManager) {
        super(entityManager);
    }

    @Override
    public User create(User entity) {
        entityManager.getTransaction().begin();
        entityManager.persist(entity);
        entityManager.flush();
        entityManager.refresh(entity);
        entityManager.getTransaction().commit();
        return entity;
    }

    @Override
    public User update(User entity) {
        entityManager.getTransaction().begin();
        entity = entityManager.merge(entity);
        entityManager.getTransaction().commit();
        return entity;
    }

    @Override
    public User get(Integer id) {
        User user = entityManager.find(User.class, id);
        entityManager.refresh(user);
        return user;
    }

    @Override
    public void delete(Integer id) {
        // TODO Auto-generated method stub

    }

    @Override
    public List<User> getAll() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public long getCount() {
        // TODO Auto-generated method stub
        return 0;
    }

}