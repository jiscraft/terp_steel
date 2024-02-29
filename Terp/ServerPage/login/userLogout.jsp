<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeSessionManager" %>
<%@ page import="kr.terp.session.WebCookieUtil" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
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

		if (ts.isUsing(id_user)) {
//			ts.removeSession(id_user);
//			System.out.println("======================================");
//			System.out.println(loginSession.getId() + " logout");
//			System.out.println("======================================");

			String siteId = loginSession.getServletContext().getInitParameter("SiteId");
			WebCookieUtil.delCookie(request.getCookies(), siteId + "LON", response);
			loginSession.removeAttribute(siteId + "LON");
			loginSession.invalidate();
		}
		else {
			System.out.println("======================================");
			System.out.println(id_user + "이미 접속이 끊어져 있는 상태입니다");
			System.out.println("======================================");
		}

//        ts.setSession(loginSession, id_user  );

		resultString = "{\"success\":" + true + ", \"data\": [] , \"msg\": \"" + strErrorMessage + "\"}";

	}
	catch (Exception ex) {
		resultString = "{\"success\":" + false + ", \"data\": [] , \"msg\": \"세션 바인딩 실패 " + strErrorMessage + "\"}";
	}
	finally {
		outResult.println(resultString.trim());
	}

%>
