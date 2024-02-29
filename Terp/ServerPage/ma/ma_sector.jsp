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
			queryString = queryString + "exec usp_ma_sector ";
			queryString = queryString + " @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
			queryString = queryString + ", @p_cd_sector = '" + tcf.getJsonValue("string", jsonObject, "cd_sector") + "'";
			queryString = queryString + ", @p_nm_sector = '" + tcf.getJsonValue("string", jsonObject, "nm_sector") + "'";
			queryString = queryString + ", @p_dc_sector = '" + tcf.getJsonValue("string", jsonObject, "dc_sector") + "'";
			queryString = queryString + ", @p_yn_use = '" + tcf.getJsonValue("string", jsonObject, "yn_use") + "'";
			queryString = queryString + ", @p_search = '" + tcf.getJsonValue("string", jsonObject, "search") + "'";
			query.add(queryString);
		}

		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (SQLException e) {
		e.printStackTrace();
		resultString = "{\"success\":" + false + ", \"data\": [] , \"msg\": \"" + e.toString() + "\"}";
	}
	finally {
		outResult.println(resultString);
	}

%>
