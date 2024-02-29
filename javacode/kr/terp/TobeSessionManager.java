package kr.terp;

import javax.servlet.http.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by jiscraft on 2015-12-11.
 */
public class TobeSessionManager implements HttpSessionBindingListener {


	private static TobeSessionManager tobeSessionManager = null;

	//로그인한 접속자를 담기위한 해시테이블
	//    private static Hashtable loginUsers = new Hashtable();
	public static ConcurrentHashMap loginUsers = new ConcurrentHashMap();

	/*
	* 싱글톤 패턴 사용
	*/
	public static synchronized TobeSessionManager getInstance() {
		if (tobeSessionManager == null) {
			tobeSessionManager = new TobeSessionManager();
		}
		return tobeSessionManager;
	}


	SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	/*
	* 이 메소드는 세션이 연결되을때 호출된다.(session.setAttribute("login", this))
	* Hashtable에 세션과 접속자 아이디를 저장한다.
	*/
	public void valueBound(HttpSessionBindingEvent event) {
		//session값을 put한다.
		Date t = new Date();
		t.setTime(event.getSession().getCreationTime());


		loginUsers.put(event.getSession(), event.getName());
		System.out.println("======================================");
		System.out.println(event.getName() + " Login  " + sf.format(t));
		//System.out.println("현재 접속자 수 : " + getUserCount());
		System.out.println("======================================");
	}


	/*
	* 이 메소드는 세션이 끊겼을때 호출된다.(invalidate)
	* Hashtable에 저장된 로그인한 정보를 제거해 준다.
	*/
	public void valueUnbound(HttpSessionBindingEvent event) {
		//session값을 찾아서 없애준다.
		//        t.setTime(event.getSession().getCreationTime());
		Date t = new Date();

		loginUsers.remove(event.getSession());
		System.out.println("======================================");
		System.out.println(" " + event.getName() + " Logout  " + sf.format(t));
		//System.out.println("현재 접속자 수 : " + getUserCount());
		System.out.println("======================================");
	}

	/*
	* 로그인을 완료한 사용자의 아이디를 세션에 저장하는 메소드
	* @param session 세션 객체
	* @param userID 사용자 아이디
	*/
	public void setSession(HttpSession session, String userId) {
		//이순간에 Session Binding이벤트가 일어나는 시점
		//name값으로 userId, value값으로 자기자신(HttpSessionBindingListener를 구현하는 Object)
		Object r = this;
		session.setAttribute(userId, this);//login에 자기자신을 집어넣는다.
	}

	/*
	* 입력받은 아이디를 해시테이블에서 삭제.
	* @param userID 사용자 아이디
	* @return void
	*/
	public void removeSession(String userId) {
		Enumeration e = loginUsers.keys();
		HttpSession session = null;
		while (e.hasMoreElements()) {
			session = (HttpSession) e.nextElement();
			if (loginUsers.get(session).equals(userId)) {
				//세션이 invalidate될때 HttpSessionBindingListener를
				//구현하는 클레스의 valueUnbound()함수가 호출된다.
				session.invalidate();
			}
		}
	}


	/*
	* 해당 아이디의 동시 사용을 막기위해서
	* 이미 사용중인 아이디인지를 확인한다.
	* @param userID 사용자 아이디
	* @return boolean 이미 사용 중인 경우 true, 사용중이 아니면 false
	*/
	public boolean isUsing(String userId) {
		return loginUsers.containsValue(userId);
	}


	/*
	* 입력받은 세션Object로 아이디를 리턴한다.
	* @param session : 접속한 사용자의 session Object
	* @return String : 접속자 아이디
	*/
	public String getUserID(HttpSession session) {
		return (String) loginUsers.get(session);
	}


	/*
	* 현재 접속한 총 사용자 수
	* @return int 현재 접속자 수
	*/
	public int getUserCount() {
		//        System.out.println(loginUsers.size());
		return loginUsers.size();
	}


	/*
	* 현재 접속중인 모든 사용자 아이디를 출력
	* @return void
	*/
	public String printloginUsers() {
		StringBuilder temp = new StringBuilder();
		temp.append("[");

		Date t = new Date();
		Enumeration e = loginUsers.keys();
		HttpSession session = null;

		int i = 0;
		while (e.hasMoreElements()) {
			session = (HttpSession) e.nextElement();
			if (i != 0) {
				temp.append(",");
			}
			temp.append("{\"id_user\" :\"").append(loginUsers.get(session)).append("\", \"tm_access\" :\"");
			t.setTime(session.getCreationTime());
			temp.append(sf.format(t)).append("\", \"tm_last\" :\"");
			t.setTime(session.getLastAccessedTime());
			temp.append(sf.format(t)).append("\", \"id\" :\"").append(session.getId()).append("\"}");

			i++;
		}

		return temp.append("]").toString();
	}

	/*
	* 현재 접속중인 모든 사용자리스트를 리턴
	* @return list
	*/
	public Collection getUsers() {
		Collection collection = loginUsers.values();
		return collection;
	}



	public String getSiteId(HttpSession httpSession) {
		if (httpSession == null) return null;
		else return httpSession.getServletContext().getInitParameter("SiteId");
	}

	public boolean isLogon(HttpSession httpSession) {
		if (httpSession == null) return false;
		boolean ret = true;
		String siteId = httpSession.getServletContext().getInitParameter("SiteId");
		return (httpSession.getAttribute(siteId+"LON") != null) && (httpSession.getAttribute(siteId+"LON") == "1");
	}

	public Object getLogonSessionInfo(HttpSession httpSession) {
		Object ret = null;
		if (isLogon(httpSession)) {
			ret = httpSession.getAttribute(httpSession.getServletContext().getInitParameter("SiteId")+"LDT");
		}
		return ret;
	}


}

