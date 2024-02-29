package kr.terp.session;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.text.SimpleDateFormat;
import java.util.Date;

public class WebSessionListener implements HttpSessionListener {

	private static int activeSessions = 0;
	private String urlGate;

	Date startTime;
	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		startTime = new Date();
		activeSessions++;
//System.out.println("===== start of WebSessionListener.sessionCreated");
//System.out.println("sessionID: " + se.getSession().getId());
//System.out.println("createdTime: " + df.format(startTime) + " (" + startTime.getTime() + ")");
//System.out.println("===== end of WebSessionListener.sessionCreated");
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		Date endTime = new Date();
		//long diffTime = endTime.getTime() - startTime.getTime();
//System.out.println("===== start of WebSessionListener.sessionDestroyed");
//System.out.println("sessionID: " + se.getSession().getId());
//System.out.println("destroyed: " + df.format(endTime) + " (" + endTime.getTime() + ")");
//System.out.println("===== end of WebSessionListener.sessionDestroyed");

		HttpSession session = se.getSession();
		boolean isLogon = WebSessionManager.isLogon(session);
		if (isLogon) {
			session.removeAttribute(session.getServletContext().getInitParameter("SiteId")+"LON");
			session.removeAttribute(session.getServletContext().getInitParameter("SiteId")+"SS");
		}
		session.invalidate();

		if (activeSessions > 0) {
			activeSessions--;
		}
	}

}
