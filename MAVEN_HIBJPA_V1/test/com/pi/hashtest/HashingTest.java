package com.pi.hashtest;

import java.security.NoSuchAlgorithmException;

import org.junit.Test;

import com.pi.utils.Hash;

public class HashingTest {

	@Test
	public void testEncrypt() {
		String s = "123456";
		
		try {
			String hs = Hash.encrypt(s, "MD5");
			System.out.println(hs);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
