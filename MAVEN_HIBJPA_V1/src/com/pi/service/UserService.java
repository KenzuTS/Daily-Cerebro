package com.pi.service;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.pi.dao.AbstractDAOFactory;
import com.pi.entity.Credential;
import com.pi.entity.Role;
import com.pi.entity.User;
import com.pi.service.filter.Secured;
import com.pi.utils.Hash;
import com.pi.utils.JWT;

@Path("/user")
public class UserService {

	@GET
	@Path("/get/{userID}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(@PathParam("userID") int userID) {
		try {
			return AbstractDAOFactory.getFactory(AbstractDAOFactory.JPA_DAO).getUserDAO().get(userID);
		} catch (Exception e) {
			return null;
		}

	}

	@GET
	@Secured
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getAllUsers() {

		try {
			return AbstractDAOFactory.getFactory(AbstractDAOFactory.JPA_DAO).getUserDAO().getAll();
		} catch (Exception e) {
			return null;
		}
	}

	@POST
	@Path("/register")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createUser(User user) {
		try {
			String s = Hash.encrypt(user.getPassword(), "MD5");
			user.setPassword(s);
			user.setRole(new Role());
			AbstractDAOFactory.getFactory(AbstractDAOFactory.JPA_DAO).getUserDAO().create(user);
			return Response.status(Response.Status.CREATED).build();

		} catch (Exception e) {
			return Response.status(Response.Status.EXPECTATION_FAILED).build();
		}
	}

	@PUT
	@Secured
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateUser(User user) {
		try {
			AbstractDAOFactory.getFactory(AbstractDAOFactory.JPA_DAO).getUserDAO().update(user);
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Secured
	@Path("/delete/{userID}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteUser(@PathParam("userID") int id) {
		try {
			AbstractDAOFactory.getFactory(AbstractDAOFactory.JPA_DAO).getUserDAO().delete(id);
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Path("/auth")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response authenticateUser(User user) {

		try {
			String s = Hash.encrypt(user.getPassword(), "MD5");
			user.setPassword(s);
			User userResponse = authenticate(user.getEmail(), user.getPassword());
			String token = generateToken(userResponse);
			Credential cred = new Credential(token, userResponse);

			return Response.status(Response.Status.OK).entity(cred).build();

		} catch (SQLException | NoSuchAlgorithmException e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}

	}

	private User authenticate(String email, String password) throws SQLException {

		User user = null;
		user = AbstractDAOFactory.getFactory(AbstractDAOFactory.JPA_DAO).getUserDAO().userValidation(email, password);
		if (user != null)
			return user;

		throw new SQLException("user doesn't exist");
	}

	private String generateToken(User user) {
		return JWT.createJWT(String.valueOf(user.getID()), "MAVHIB_RESTSERV", user.getEmail(), 180000000); // 1 800 000 = 30 mins
	}

}
