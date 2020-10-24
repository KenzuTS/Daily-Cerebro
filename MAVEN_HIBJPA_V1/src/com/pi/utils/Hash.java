package com.pi.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Hash {

	public static String encrypt(String password, String encryptType) throws NoSuchAlgorithmException {
		String generatedPassword = null;

		// Create MessageDigest instance for MD5
		MessageDigest md = MessageDigest.getInstance(encryptType);
		// Add password bytes to digest
		md.update(password.getBytes());
		// Get the hash's bytes
		byte[] bytes = md.digest();
		// This bytes[] has bytes in decimal format;
		// Convert it to hexadecimal format
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < bytes.length; i++) {
			sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
		}
		// Get complete hashed password in hex format
		generatedPassword = sb.toString();
		return generatedPassword;

	}
}
