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

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("isManager")) {
				queryString = queryString + "exec usp_mo_manage @p_docu = 'isManager' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("getSiteList")) {
				queryString = queryString + "exec usp_mo_manage @p_docu = 'getSiteList' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
			}
			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("getPartner")) {
				queryString = queryString + "exec usp_mo_manage @p_docu = 'getPartner' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
			}
			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("setPartner")) {
				queryString = queryString + "exec usp_mo_manage @p_docu = 'setPartner' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
			}
			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("getWorkList")) {
				queryString = queryString + "exec usp_mo_manage @p_docu = 'getWorkList' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_dt_work = " + tcf.getJsonValueSimple("string", jsonObject, "dt_work");
			}
			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("setWork")) {
				queryString = queryString + "exec usp_mo_manage @p_docu = 'setWork' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_id_worker = " + tcf.getJsonValueSimple("string", jsonObject, "id_worker");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_dt_work = " + tcf.getJsonValueSimple("string", jsonObject, "dt_work");
				queryString = queryString + ", @p_nb_work = " + tcf.getJsonValueSimple("number", jsonObject, "nb_work");
			}
			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("getNewWorker")) {
				queryString = queryString + "exec usp_mo_manage @p_docu = 'getNewWorker' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_dt_work = " + tcf.getJsonValueSimple("string", jsonObject, "dt_work");
			}
			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("addNewWorker")) {
				queryString = queryString + "exec usp_mo_manage @p_docu = 'addNewWorker' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_id_worker = " + tcf.getJsonValueSimple("string", jsonObject, "id_worker");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
			}

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
