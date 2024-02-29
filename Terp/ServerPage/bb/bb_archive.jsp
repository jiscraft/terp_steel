<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
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
				queryString = queryString + "exec usp_bb_archive @p_docu = 'm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_fg_sy220 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy220");
				queryString = queryString + ", @p_fg_file = " + tcf.getJsonValueSimple("string", jsonObject, "fg_file");
				queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "p_search");

			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_bb_archive @p_docu = 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_ac = " + tcf.getJsonValueSimple("string", jsonObject, "no_ac");
				queryString = queryString + ", @p_fg_sy220 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy220");
				queryString = queryString + ", @p_fg_file = " + tcf.getJsonValueSimple("string", jsonObject, "fg_file");
				queryString = queryString + ", @p_dc_title = " + tcf.getJsonValueSimple("string", jsonObject, "dc_title");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");

			}
			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_bb_archive @p_docu = 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_ac = " + tcf.getJsonValueSimple("string", jsonObject, "no_ac");

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
