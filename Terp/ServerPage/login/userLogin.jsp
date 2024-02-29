<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeSessionManager" %>
<%@ page import="kr.terp.session.WebCookieUtil" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%

	response.setContentType("text/html; charset=utf-8");
	TobeSessionManager ts = new TobeSessionManager();
	TobeCommonFunction tcf = new TobeCommonFunction();
	JSONArray jsonArray;
	Iterator iterator = null;
	String id_user = "";
	String resultString = "";
	PrintWriter outResult = response.getWriter();
	List<String> query = new ArrayList<String>();
	String strErrorMessage = "";
	HttpSession loginSession = request.getSession(false);

	try {
		if (request.getParameter("sendData") != null) {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			iterator = jsonArray.iterator();
		}


		while (iterator.hasNext()) {
			JSONObject jsonObject = (JSONObject) iterator.next();
			id_user = (String) tcf.getJsonValue("string", jsonObject, "loginIduser");

		}

//		System.out.println(loginSession.getId());
//		System.out.println(ts.getUserID(loginSession));
//		System.out.println(ts.isLogon(loginSession));
//		System.out.println(ts.isUsing(id_user));

		if (ts.isUsing(id_user)) {
//			System.out.println("======================================");
//			System.out.println(id_user + "님은 이미 접속 사용중입니다 기존 접속을 끊고 새로 연결합니다");
			ts.removeSession(id_user);
			loginSession = request.getSession();
		}

		ts.setSession(loginSession, id_user);
//		System.out.println("======================================");
//		System.out.println(loginSession.getId() + " login");
//		System.out.println("======================================");

		String siteId = loginSession.getServletContext().getInitParameter("SiteId");
		loginSession.setAttribute(siteId+"LON", "1");
		WebCookieUtil.setCookie(siteId + "LON", "1", 100, response);

		resultString = "{\"success\":" + true + ", \"data\": [] , \"msg\": \"" + strErrorMessage + "\"}";

	}
	catch (Exception ex) {
		resultString = "{\"success\":" + false + ", \"data\": [] , \"msg\": \"세션 바인딩 실패 " + strErrorMessage + "\"}";
	}
	finally {
		outResult.println(resultString.trim());
	}

%>
