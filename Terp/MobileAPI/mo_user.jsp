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
				queryString = queryString + "exec usp_mo_user @p_docu = 'select' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_nm_user = " + tcf.getJsonValueSimple("string", jsonObject, "nm_user");
				queryString = queryString + ", @p_fg_user = " + tcf.getJsonValueSimple("string", jsonObject, "fg_user");
				queryString = queryString + ", @p_dc_pw = " + tcf.getJsonValueSimple("string", jsonObject, "dc_pw");
				queryString = queryString + ", @p_dc_photo_path = " + tcf.getJsonValueSimple("string", jsonObject, "dc_photo_path");
				queryString = queryString + ", @p_fcm_token = " + tcf.getJsonValueSimple("string", jsonObject, "fcm_token");
				queryString = queryString + ", @p_dc_device_id = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_id");
				queryString = queryString + ", @p_dc_device_model = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_model");
				queryString = queryString + ", @p_dc_device_os = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_os");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("exists")) {
				queryString = queryString + "exec usp_mo_user @p_docu = 'exists' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");

			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("site")) {
				queryString = queryString + "exec usp_mo_user @p_docu = 'site' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_nm_user = " + tcf.getJsonValueSimple("string", jsonObject, "nm_user");
				queryString = queryString + ", @p_fg_user = " + tcf.getJsonValueSimple("string", jsonObject, "fg_user");
				queryString = queryString + ", @p_dc_pw = " + tcf.getJsonValueSimple("string", jsonObject, "dc_pw");
				queryString = queryString + ", @p_dc_photo_path = " + tcf.getJsonValueSimple("string", jsonObject, "dc_photo_path");
				queryString = queryString + ", @p_fcm_token = " + tcf.getJsonValueSimple("string", jsonObject, "fcm_token");
				queryString = queryString + ", @p_dc_device_id = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_id");
				queryString = queryString + ", @p_dc_device_model = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_model");
				queryString = queryString + ", @p_dc_device_os = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_os");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_mo_user @p_docu = 's' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_nm_user = " + tcf.getJsonValueSimple("string", jsonObject, "nm_user");
				queryString = queryString + ", @p_fg_user = " + tcf.getJsonValueSimple("string", jsonObject, "fg_user");
				queryString = queryString + ", @p_dc_jumin = " + tcf.getJsonValueSimple("string", jsonObject, "dc_jumin");
				queryString = queryString + ", @p_dc_tel = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel");
				queryString = queryString + ", @p_dc_addr = " + tcf.getJsonValueSimple("string", jsonObject, "dc_addr");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_yn_agree = " + tcf.getJsonValueSimple("string", jsonObject, "yn_agree");
				queryString = queryString + ", @p_dt_agree = " + tcf.getJsonValueSimple("string", jsonObject, "dt_agree");
				queryString = queryString + ", @p_dc_pw = " + tcf.getJsonValueSimple("string", jsonObject, "dc_pw");
				queryString = queryString + ", @p_dc_photo_path = " + tcf.getJsonValueSimple("string", jsonObject, "dc_photo_path");
				queryString = queryString + ", @p_fcm_token = " + tcf.getJsonValueSimple("string", jsonObject, "fcm_token");
				queryString = queryString + ", @p_dc_device_id = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_id");
				queryString = queryString + ", @p_dc_device_model = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_model");
				queryString = queryString + ", @p_dc_device_os = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_os");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("usite")) {
				queryString = queryString + "exec usp_mo_user @p_docu = 'usite' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_nm_user = " + tcf.getJsonValueSimple("string", jsonObject, "nm_user");
				queryString = queryString + ", @p_dc_jumin = " + tcf.getJsonValueSimple("string", jsonObject, "dc_jumin");
				queryString = queryString + ", @p_dc_tel = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel");
				queryString = queryString + ", @p_dc_addr = " + tcf.getJsonValueSimple("string", jsonObject, "dc_addr");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_yn_use_site = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use_site");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_mo_user @p_docu = 'delete' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_nm_user = " + tcf.getJsonValueSimple("string", jsonObject, "nm_user");
				queryString = queryString + ", @p_fg_user = " + tcf.getJsonValueSimple("string", jsonObject, "fg_user");
				queryString = queryString + ", @p_dc_pw = " + tcf.getJsonValueSimple("string", jsonObject, "dc_pw");
				queryString = queryString + ", @p_dc_photo_path = " + tcf.getJsonValueSimple("string", jsonObject, "dc_photo_path");
				queryString = queryString + ", @p_fcm_token = " + tcf.getJsonValueSimple("string", jsonObject, "fcm_token");
				queryString = queryString + ", @p_dc_device_id = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_id");
				queryString = queryString + ", @p_dc_device_model = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_model");
				queryString = queryString + ", @p_dc_device_os = " + tcf.getJsonValueSimple("string", jsonObject, "dc_device_os");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("login")) {
				queryString = queryString + "exec usp_mo_user @p_docu = 'login' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_dc_pw = " + tcf.getJsonValueSimple("string", jsonObject, "dc_pw");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("token")) {
				queryString = queryString + "exec usp_mo_user @p_docu = 'token' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
				queryString = queryString + ", @p_fcm_token = " + tcf.getJsonValueSimple("string", jsonObject, "fcm_token");
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
