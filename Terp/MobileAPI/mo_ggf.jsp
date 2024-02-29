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

		System.out.println("sendData: "+request.getParameter("sendData"));
		if (request.getParameter("sendData") != null) {
			System.out.println("sendData: "+request.getParameter("sendData"));
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			iterator = jsonArray.iterator();
			int iteCount = 0;
		}

		while (iterator.hasNext()) {
			JSONObject jsonObject = (JSONObject) iterator.next();
			queryString = "";

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("select")) {
				queryString = queryString + "exec usp_mo_ggf @p_docu = 'select' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_id_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "id_ggf");
				queryString = queryString + ", @p_nm_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "nm_ggf");
				queryString = queryString + ", @p_dc_latitude = " + tcf.getJsonValueSimple("string", jsonObject, "dc_latitude");
				queryString = queryString + ", @p_dc_longitude = " + tcf.getJsonValueSimple("string", jsonObject, "dc_longitude");
				queryString = queryString + ", @p_dc_radius = " + tcf.getJsonValueSimple("string", jsonObject, "dc_radius");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_mo_ggf @p_docu = 's' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_id_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "id_ggf");
				queryString = queryString + ", @p_nm_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "nm_ggf");
				queryString = queryString + ", @p_dc_latitude = " + tcf.getJsonValueSimple("string", jsonObject, "dc_latitude");
				queryString = queryString + ", @p_dc_longitude = " + tcf.getJsonValueSimple("string", jsonObject, "dc_longitude");
				queryString = queryString + ", @p_dc_radius = " + tcf.getJsonValueSimple("string", jsonObject, "dc_radius");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_mo_ggf @p_docu = 'delete' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_id_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "id_ggf");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
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
