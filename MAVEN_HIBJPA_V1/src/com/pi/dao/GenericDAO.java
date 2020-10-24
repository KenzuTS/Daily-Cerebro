package com.pi.dao;

import java.io.Serializable;
import java.util.List;

public interface GenericDAO<T, K extends Serializable> {
	T create(T entity);
	T update(T entity);
	T get(K id);
	void delete(int id);
	List<T> getAll();
	long getCount();
}
