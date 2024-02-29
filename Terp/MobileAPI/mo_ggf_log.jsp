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

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("select")) {
				queryString = queryString + "exec usp_mo_ggf_log @p_docu = 'select' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_fcm_token = " + tcf.getJsonValueSimple("string", jsonObject, "fcm_token");
				queryString = queryString + ", @p_id_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "id_ggf");
				queryString = queryString + ", @p_dc_type = " + tcf.getJsonValueSimple("string", jsonObject, "dc_type");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("alluser")) {
				queryString = queryString + "exec usp_mo_ggf_log @p_docu = 'alluser' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_fcm_token = " + tcf.getJsonValueSimple("string", jsonObject, "fcm_token");
				queryString = queryString + ", @p_id_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "id_ggf");
				queryString = queryString + ", @p_dc_type = " + tcf.getJsonValueSimple("string", jsonObject, "dc_type");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("monmy")) {
				queryString = queryString + "exec usp_mo_ggf_log @p_docu = 'monmy' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_ym_log = " + tcf.getJsonValueSimple("string", jsonObject, "ym_log");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_id_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "id_ggf");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("mon")) {
				queryString = queryString + "exec usp_mo_ggf_log @p_docu = 'mon' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_ym_log = " + tcf.getJsonValueSimple("string", jsonObject, "ym_log");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_id_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "id_ggf");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("log")) {
				queryString = queryString + "exec usp_mo_ggf_log @p_docu = 'log' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_fcm_token = " + tcf.getJsonValueSimple("string", jsonObject, "fcm_token");
				queryString = queryString + ", @p_id_ggf = " + tcf.getJsonValueSimple("string", jsonObject, "id_ggf");
				queryString = queryString + ", @p_dt_log = " + tcf.getJsonValueSimple("string", jsonObject, "dt_log");
				queryString = queryString + ", @p_dc_type = " + tcf.getJsonValueSimple("string", jsonObject, "dc_type");
				queryString = queryString + ", @p_dc_latitude = " + tcf.getJsonValueSimple("string", jsonObject, "dc_latitude");
				queryString = queryString + ", @p_dc_longitude = " + tcf.getJsonValueSimple("string", jsonObject, "dc_longitude");
				queryString = queryString + ", @p_dc_photo_path = " + tcf.getJsonValueSimple("string", jsonObject, "dc_photo_path");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				queryString = queryString + ", @p_id_writer = " + tcf.getJsonValueSimple("string", jsonObject, "id_writer");
				queryString = queryString + ", @p_dc_version = " + tcf.getJsonValueSimple("string", jsonObject, "dc_version");
				queryString = queryString + ", @p_fg_data = " + tcf.getJsonValueSimple("string", jsonObject, "fg_data");
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("lognew")) {
				queryString = queryString + "exec usp_mo_ggf_log @p_docu = 'lognew' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_dc_latitude = " + tcf.getJsonValueSimple("string", jsonObject, "dc_latitude");
				queryString = queryString + ", @p_dc_longitude = " + tcf.getJsonValueSimple("string", jsonObject, "dc_longitude");
				queryString = queryString + ", @p_id_writer = " + tcf.getJsonValueSimple("string", jsonObject, "id_writer");
				queryString = queryString + ", @p_dc_version = " + tcf.getJsonValueSimple("string", jsonObject, "dc_version");

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
