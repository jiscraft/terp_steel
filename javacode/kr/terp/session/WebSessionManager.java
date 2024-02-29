package kr.terp.session;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Hashtable;

public class WebSessionManager implements HttpSessionBindingListener {

	private static WebSessionManager webSessionManager = null;
	private static Hashtable loginUsers = new Hashtable();

	public static String getSiteId(HttpSession httpSession) {
		if (httpSession == null) return null;
		else return httpSession.getServletContext().getInitParameter("SiteId");
	}

	public static boolean isLogon(HttpSession httpSession) {
		if (httpSession == null) return false;
		boolean ret = true;
		String siteId = httpSession.getServletContext().getInitParameter("SiteId");
		return (httpSession.getAttribute(siteId+"LON") != null) && (httpSession.getAttribute(siteId+"LON") == "1");
	}

	public static Object getLogonSessionInfo(HttpSession httpSession) {
		Object ret = null;
		if (isLogon(httpSession)) {
			ret = httpSession.getAttribute(httpSession.getServletContext().getInitParameter("SiteId")+"LDT");
		}
		return ret;
	}

	public static synchronized WebSessionManager getInstance() {
		if (webSessionManager == null) {
			webSessionManager = new WebSessionManager();
		}
		return webSessionManager;
	}

	@Override
	public void valueBound(HttpSessionBindingEvent se) {
		loginUsers.put(se.getSession(), se.getName());
//		System.out.println(se.getName() + "님이 로그인 하셨습니다."+se.getSession().getId());
//		System.out.println("현재 접속자 수 : " +  getUserCount());
//		System.out.println(loginUsers.toString());
//		printloginUsers();
	}

	@Override
	public void valueUnbound(HttpSessionBindingEvent se) {
		loginUsers.remove(se.getSession());
//		System.out.println(se.getName() + "님이 로그아웃 하셨습니다."+se.getSession().getId());
//		System.out.println("현재 접속자 수 : " +  getUserCount());
//		System.out.println(loginUsers.toString());
//		printloginUsers();
	}

	public void setSession(HttpSession session, String userId) {
		session.setAttribute(userId, this);
	}

	public void removeSession(String userId) {
		Enumeration e = loginUsers.keys();
		HttpSession session = null;
		while (e.hasMoreElements()) {
			session = (HttpSession) e.nextElement();
			if (loginUsers.get(session).equals(userId)) {
//				System.out.println(session.getId()+":"+userId);
				session.invalidate();
			}
		}
	}

	public boolean isValid(String userId, String userPw) {
		return true;
	}

	public boolean isUsing(String userId) {
//		System.out.println(loginUsers.toString());
		return loginUsers.containsValue(userId);
	}

	public String getUserId(HttpSession session) {
//		System.out.println(loginUsers.toString());
		return (String)loginUsers.get(session);
	}

	public int getUserCount() {
		return loginUsers.size();
	}

	public Collection getUsers() {
		Collection collection = loginUsers.values();
		return collection;
	}

	public void printloginUsers() {
		Enumeration e = loginUsers.keys();
		HttpSession session = null;

		System.out.println("===========================================");
		int i = 0;
		while(e.hasMoreElements()) {
			session = (HttpSession)e.nextElement();
			System.out.println((++i) + ". 접속자 : " +  loginUsers.get(session));
		}
		System.out.println("===========================================");

	}

}