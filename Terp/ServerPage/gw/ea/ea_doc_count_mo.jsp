<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.common.util.FileUtil" %>
<%@ page import="kr.terp.common.util.HtmlUtil" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="kr.terp.common.util.Common" %>
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

		boolean isValid = true;
		String sendData = request.getParameter("sendData");
		JSONArray jsonArray = null;
		JSONObject jsonObject = null;

		if ((sendData == null) || (sendData.trim().length() <= 0)) {
			isValid = false;
		}
		else {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			jsonObject = (JSONObject) jsonArray.get(0);
		}
		if (isValid) {
			queryString = "exec usp_ea_doc_count @p_docu = 'mo'";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_apro");
			query.add(queryString);
		}
		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (Exception e) {
		e.printStackTrace();
		resultString = "{\"success\": false, \"data\": [] , \"msg\": \"" + e.getLocalizedMessage() + "\"}";
	}
	finally {
		outResult.println(resultString);
	}

%>
