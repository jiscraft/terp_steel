<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Objects" %>

<%

	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	TobeQueryExec execQuery = new TobeQueryExec();
	TobeCommonFunction tcf = new TobeCommonFunction();
	List<String> query = new ArrayList<String>();
	String queryString = "";
	String resultString = "";
	String strErrorMessage = "";
	Iterator iterator = null;
	HttpSession sessionCheck = request.getSession();


	try {

		JSONArray jsonArray;

		if (request.getParameter("sendData") != null) {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			iterator = jsonArray.iterator();
			int iteCount = 0;
		}


		while (iterator.hasNext()) {
			JSONObject jsonObject = (JSONObject) iterator.next();
			queryString = "";

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("select")) {
				queryString = queryString + "exec usp_sy_config 'select' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_sy_config 's' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
//				숫자타입은 파라미터를 number or int 로 넘기고 싱글쿼테이션 빼고 처리
				queryString = queryString + ", @p_dy_login_pwinterval = " + tcf.getJsonValue("number", jsonObject, "dy_login_pwinterval") + "";
				queryString = queryString + ", @p_dc_login_pwinit = '" + tcf.getJsonValue("string", jsonObject, "dc_login_pwinit") + "'";
				queryString = queryString + ", @p_nb_login_pwlength = " + tcf.getJsonValue("int", jsonObject, "nb_login_pwlength") + "";
			}

			query.add(queryString);
		}


		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (Exception e) {
		e.printStackTrace();
		resultString = "{\"success\":false, \"data\":[] , \"msg\":\"" + e.getLocalizedMessage() + "\"}";
	}
	finally {
		outResult.println(resultString);
	}




%>
