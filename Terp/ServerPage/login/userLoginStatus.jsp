<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" session="false" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="kr.terp.TobeSessionManager" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="java.util.Iterator" %>

<%

	response.setContentType("text/html; charset=utf-8");
	TobeSessionManager ts = new TobeSessionManager();
	TobeCommonFunction tcf = new TobeCommonFunction();
	JSONArray jsonArray;
	Iterator iterator = null;
	String id_user = "";
	Boolean resultBoolean = true;
	PrintWriter outResult = response.getWriter();
	String strErrorMessage = "";
	HttpSession sessionCheck = request.getSession();


	try {

		resultBoolean = ts.isLogon(sessionCheck);

//		System.out.println("======================================");
//		System.out.println(sessionCheck.getId() + " check");
//		System.out.println("======================================");
		/*
		if (request.getParameter("sendData") != null) {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			iterator = jsonArray.iterator();
		}


		while (iterator.hasNext()) {
			JSONObject jsonObject = (JSONObject) iterator.next();
			id_user = (String) tcf.getJsonValue("string", jsonObject, "loginIduser");

			//            System.out.println(sessionCheck.isNew());
			//            System.out.println(ts.isUsing( id_user ));

			if (sessionCheck.isNew() || !ts.isUsing(id_user)) {
				resultBoolean = false;
			}
			else {
				resultBoolean = true;
			}

			//            System.out.println(resultBoolean);
		}
		*/
	}
	catch (Exception e) {
		resultBoolean = false;
	}
	finally {
		//resultBoolean = true;
		outResult.println("{\"success\":" + resultBoolean + ", \"data\": [] , \"msg\": \"" + strErrorMessage + "\"}");
	}

%>
