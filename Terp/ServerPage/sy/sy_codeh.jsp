<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%@ page import="kr.terp.TobeCommonFunction" %>

<%

	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	TobeQueryExec execQuery = new TobeQueryExec();
	TobeCommonFunction tcf = new TobeCommonFunction();
	List<String> query = new ArrayList<String>();
	String queryString = "";
	String resultString = "";
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

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_sy_codeh '" + tcf.getJsonValue("string", jsonObject, "actiondata") + "' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_search = '%" + tcf.getJsonValue("string", jsonObject, "h_search") + "%'";
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("insert")) {
				queryString = queryString + "exec usp_sy_codeh '" + tcf.getJsonValue("string", jsonObject, "actiondata") + "' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_codeh = '" + tcf.getJsonValue("string", jsonObject, "cd_codeh") + "'";
				queryString = queryString + ", @p_nm_codeh = '" + tcf.getJsonValue("string", jsonObject, "nm_codeh") + "'";
			}

			query.add(queryString);

		}

		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (SQLException e) {
		e.printStackTrace();
	}
	finally {
		outResult.println(resultString);
	}

%>
