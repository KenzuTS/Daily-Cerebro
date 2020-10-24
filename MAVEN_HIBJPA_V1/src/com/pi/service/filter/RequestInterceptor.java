package com.pi.service.filter;

import java.io.IOException;
import java.util.Date;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import com.pi.utils.JWT;

import io.jsonwebtoken.Claims;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class RequestInterceptor implements ContainerRequestFilter{

    private static final String REALM = "example";
    private static final String AUTHENTICATION_SCHEME = "Bearer";
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		
		String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
		
        // Validate the Authorization header
        if (!isTokenBasedAuth(authHeader)) {
        	abortWithUnauth(requestContext);
            return;
        }

        // Extraire le token provenant du header d'autorisation
        String token = authHeader.substring(AUTHENTICATION_SCHEME.length()).trim();
        
        if (!validateToken(token)) {
			abortWithUnauth(requestContext);
		}
	}
	
	private boolean isTokenBasedAuth(String authHeader) {
		return authHeader != null && authHeader.toLowerCase()
			   .startsWith(AUTHENTICATION_SCHEME.toLowerCase()+ " ");
	}

    private void abortWithUnauth(ContainerRequestContext requestContext) {

        // Abort the filter chain with a 401 status code response
        // The WWW-Authenticate header is sent along with the response
        requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED)
                        .header(HttpHeaders.WWW_AUTHENTICATE, 
                                AUTHENTICATION_SCHEME + " realm=\"" + REALM + "\"")
                        .build());
    }

    private boolean validateToken(String token) {
    	// Vérifier si le token était émis par le serveur et si celui-ci n'a pas expiré
    	
    	Claims claims = JWT.decodeJWT(token);
    	
    	if (claims == null) {
			return false;
		}
    	
    	boolean validity = true;

        //Checking Expiration Claim
        if (claims.getExpiration() != null){
            Date expDate = claims.getExpiration();
            Date date = new Date();
            
            if (expDate.getTime() < date.getTime()) {
                validity = false;
            }
            
        } else {
            validity = false;
        }

       return validity;
    }
	
	
}
