package com.pi.simpledaotesting;

import java.io.Serializable;
import java.util.List;

public interface GenericDAO<T, K extends Serializable> {
    T create(T entity);
    T update(T entity);
    T get(K id);
    void delete(K id);
    List<T> getAll();
    long getCount();
}