package kr.terp.session;

import com.google.gson.JsonObject;
import kr.terp.TobeSessionManager;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.StringTokenizer;


public class WebSessionFilter implements Filter {

	private String SITE_ID;
	private String GATE_URL;
	private ArrayList<String> avoidUrlList;
	private TobeSessionManager tbSessionManager = new TobeSessionManager();

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpSession session = httpRequest.getSession(false);

		String reqUri = httpRequest.getRequestURI();
		String timeoutUrl = httpRequest.getContextPath() + GATE_URL;
		//boolean allowedRequest = avoidUrlList.contains(reqUri.substring(reqUri.lastIndexOf("/")+1)) || (reqUri.substring(reqUri.lastIndexOf(".")+1).equalsIgnoreCase("json"));
		boolean allowedRequest = avoidUrlList.contains(reqUri.substring(reqUri.lastIndexOf("/")+1));
		boolean isLogon = tbSessionManager.isLogon(session);

//System.out.println("===== start of WebSessionFilter.doFilter");
//System.out.println(reqUri.substring(reqUri.lastIndexOf("/")));
//System.out.println("uri="+reqUri);
//System.out.println("isLogon="+isLogon);
//System.out.println("allowedRequest="+allowedRequest);
//System.out.println("===== end of WebSessionFilter.doFilter");

		if (!allowedRequest) {
			JsonObject sessJson = new JsonObject();
			if (isLogon) {
				//session.setAttribute("MaxAge", session.getMaxInactiveInterval());
				//session.setAttribute("Last", session.getLastAccessedTime());
				sessJson.addProperty("age", session.getMaxInactiveInterval());
				sessJson.addProperty("last", session.getLastAccessedTime());
			}
			else {
				WebCookieUtil.delCookie(httpRequest.getCookies(), SITE_ID + "LON", httpResponse);
				sessJson.addProperty("last", 0);
			}
			WebCookieUtil.setCookie(SITE_ID + "SS", sessJson.toString(), 100, httpResponse);
		}

		filterChain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		SITE_ID = config.getServletContext().getInitParameter("SiteId");
		GATE_URL = config.getInitParameter("GateUrl");
		String avoidUrls = config.getInitParameter("AvoidUrls");
		StringTokenizer token = new StringTokenizer(avoidUrls, ",");
		avoidUrlList = new ArrayList<String>();
		while (token.hasMoreTokens()) {
			avoidUrlList.add(token.nextToken().trim());
		}
//System.out.println("===== start of WebSessionFilter.init");
//System.out.println(avoidUrlList);
//System.out.println("===== end of WebSessionFilter.init");
	}

	@Override
	public void destroy() {
	}

}
