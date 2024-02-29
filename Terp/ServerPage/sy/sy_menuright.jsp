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
				queryString = queryString + "exec usp_sy_menuright 'm' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_fg_sy030 = '" + tcf.getJsonValue("string", jsonObject, "fg_sy030") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_sy_menuright 's' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "cd_c") + "'";
				queryString = queryString + ", @p_fg_sy030 = '" + tcf.getJsonValue("string", jsonObject, "fg_sy030") + "'";
				queryString = queryString + ", @p_id_menu = '" + tcf.getJsonValue("string", jsonObject, "id_menu") + "'";
				queryString = queryString + ", @p_yn_use = '" + tcf.getJsonValue("string", jsonObject, "yn_use") + "'";
				queryString = queryString + ", @p_yn_insert = '" + tcf.getJsonValue("string", jsonObject, "yn_insert") + "'";
				queryString = queryString + ", @p_yn_delete = '" + tcf.getJsonValue("string", jsonObject, "yn_delete") + "'";
				queryString = queryString + ", @p_yn_modify = '" + tcf.getJsonValue("string", jsonObject, "yn_modify") + "'";
				queryString = queryString + ", @p_yn_save = '" + tcf.getJsonValue("string", jsonObject, "yn_save") + "'";
				queryString = queryString + ", @p_yn_print = '" + tcf.getJsonValue("string", jsonObject, "yn_print") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_sy_menuright 'delete' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "cd_c") + "'";
				queryString = queryString + ", @p_fg_sy030 = '" + tcf.getJsonValue("string", jsonObject, "fg_sy030") + "'";
				queryString = queryString + ", @p_id_menu = '" + tcf.getJsonValue("string", jsonObject, "id_menu") + "'";
			}


			query.add(queryString);

		}


		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (Exception e) {
		System.out.println(e);
		e.printStackTrace();
	}
	finally {
		outResult.println(resultString);
	}

%>
