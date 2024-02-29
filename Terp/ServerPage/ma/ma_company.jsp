<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="kr.terp.TobeCommonFunction" %>


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


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("all")) {
				queryString = queryString + "exec usp_ma_company 'all' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";

			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_ma_company 'm' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";

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
