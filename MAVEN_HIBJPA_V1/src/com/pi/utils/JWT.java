package com.pi.utils;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWT {
	
	private static String SECRET_KEY = "oeRaYY7Wo24sDqKSX3IM9ASGmdGPmkTd9jo1QTy4b7P9Ze5"
	+ "_9hKolVX8xNrQDcNRfVEdTZNOuOyqEGhXEbdJI-ZQ19k_o9MI0y3eZN2lp9jow55FfXMiINEdt1XR85Vi"
	+ "pRLSOkT6kSpzs2x-jbLDiz9iFVzkd81YKxMgPA7VfZeQUm4n-mOmnWMaVX30zGFU4L3oPBctYKkl4dYfqY"
	+ "WqRNfrgPJVi5DGFjywgxx0ASEiJHtV72paI3fDR2XwlSkyhhmY-ICjCRmsJN4fX1pdoL8a18-aQrvyu4j0O"
	+ "s6dVPYIoPvvY0SAZtWYKHfM15g7A3HD4cVREf9cUsprCRK93w";
	
	/**
	 * 
	 * @param id  (Integer)
	 * @param issuer  (String)
	 * @param subject (String)
	 * @param ttlMillis (long)
	 * @return String
	 */
	public static String createJWT(String id, String issuer, String subject, long ttlMillis) {
		
		SignatureAlgorithm signatureAlgo = SignatureAlgorithm.HS256;
		long now = System.currentTimeMillis();
		Date dateNow = new Date(now);
		byte[] keyByte = DatatypeConverter.parseBase64Binary(SECRET_KEY);
		Key signinkey = new SecretKeySpec(keyByte, signatureAlgo.getJcaName());

		JwtBuilder builder = Jwts.builder().setId(id)
				.setIssuedAt(dateNow)
				.setSubject(subject)
				.setIssuer(issuer)
				.signWith(signinkey,signatureAlgo);
		
		
		if(ttlMillis >= 0) {
			long expMillis = now + ttlMillis;
			Date expDate = new Date(expMillis);
			builder.setExpiration(expDate);
		}
				
		return builder.compact();
		
	}
	
	public static Claims decodeJWT(String jwt) {
		
		try {
			Claims claims = Jwts.parserBuilder()
					.setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
					.build().parseClaimsJws(jwt).getBody();

			return claims;
		} catch (Exception e) {
			return null;
		}
		
	}
}
