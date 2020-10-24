package com.pi.transactiontesting;

import com.pi.dao.AbstractDAOFactory;
import com.pi.entity.Role;
import com.pi.entity.User;

public class UserTransactionTest {

	public static void main(String[] args) {

		User user1 = new User("lui@gmail.com","123456","Billy");
		Role r = new Role();
//		r.setId(12);
		user1.setRole(r);

        // le nom employé ici doit toujours être le même que dans le 
        // fichier XML => 'persistence.xml'
//        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("MAVEN_HIBJPA_V1");
//        EntityManager entityManager = entityManagerFactory.createEntityManager();

        
        AbstractDAOFactory.getFactory(AbstractDAOFactory.JPA_DAO).getUserDAO().create(user1);

        // commencement de la transaction
//        entityManager.getTransaction().begin();
//        entityManager.persist(user1);
//        entityManager.getTransaction().commit();

        // Ces classes n'implémentent pas l'interface AutoCloseable
        // donc => appel de close()
//        entityManager.close();
//        entityManagerFactory.close();

        System.out.println("User object was persisted");

        

	}

}
