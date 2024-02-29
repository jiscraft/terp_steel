package kr.terp.session;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Set;


public class WebCookieUtil {

	public static String getCookie(Cookie[] cookies, String name) throws UnsupportedEncodingException {
		if (cookies != null) {
			for(int i=0 ; i<cookies.length; i++){
				if (cookies[i].getName().equals(name.replaceAll("=","%3D"))) {
					return URLDecoder.decode(cookies[i].getValue().replaceAll("%3D","="), "UTF-8");
				}
			}
		}
		return null;
	}

	public static void setCookie(String name, String value, HttpServletResponse response) throws UnsupportedEncodingException {
		Cookie ck = new Cookie(name.replaceAll("=","%3D"), URLEncoder.encode(value.replaceAll("=","%3D"), "UTF-8"));
		ck.setMaxAge(10*24*60*60*24);
		ck.setPath("/");
		response.addCookie(ck);
	}
	public static void setCookie(String name, String value, int age, HttpServletResponse response) throws UnsupportedEncodingException {
		Cookie ck = new Cookie(name.replaceAll("=","%3D"), URLEncoder.encode(value.replaceAll("=","%3D"), "UTF-8"));
		ck.setMaxAge(age*24*60*60);
		ck.setPath("/");
		response.addCookie(ck);
	}
	public static void setCookie(JsonObject jsonObj, HttpServletResponse response) throws UnsupportedEncodingException {
		Set<Map.Entry<String,JsonElement>> entrySet = jsonObj.entrySet();
		for (Map.Entry<String,JsonElement> entry:entrySet) {
			String name = entry.getKey();
			String value = entry.getValue().getAsString();
			setCookie(name, value, response);
		}
	}

	public static void delCookie(Cookie[] cookies, String name, HttpServletResponse response) {
		if (cookies != null) {
			for(int i=0 ; i< cookies.length; i++){
				if (cookies[i].getName().equals(name)) {
					cookies[i].setValue("");
					cookies[i].setMaxAge(0);
					cookies[i].setPath("/");
					response.addCookie(cookies[i]);
				}
			}
		}
	}
	public static void clearCookies(Cookie[] cookies, HttpServletResponse response) {
		if (cookies != null) {
			for(int i=0 ; i< cookies.length; i++){
				cookies[i].setValue("");
				cookies[i].setMaxAge(0);
				cookies[i].setPath("/");
				response.addCookie(cookies[i]);
			}
		}
	}

}
