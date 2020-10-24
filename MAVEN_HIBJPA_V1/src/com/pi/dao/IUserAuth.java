package com.pi.dao;

import com.pi.entity.User;

public interface IUserAuth {
	User userValidation(String mail, String password);
}
