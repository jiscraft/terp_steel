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
				queryString = queryString + "exec usp_ea_doc_apro @p_docu = 'select' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
				queryString = queryString + ", @p_ln_apro = " + tcf.getJsonValueSimple("string", jsonObject, "ln_apro");
				queryString = queryString + ", @p_sq_apro = " + tcf.getJsonValueSimple("int", jsonObject, "sq_apro");
				queryString = queryString + ", @p_fg_ea050 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea050");
				queryString = queryString + ", @p_fg_ea002 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea002");
				queryString = queryString + ", @p_dc_apro = " + tcf.getJsonValueSimple("string", jsonObject, "dc_apro");
				queryString = queryString + ", @p_dt_apro = " + tcf.getJsonValueSimple("string", jsonObject, "dt_apro");
				queryString = queryString + ", @p_id_user_apro = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_apro");
				queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_apro");
				queryString = queryString + ", @p_nm_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "nm_e_apro");
				queryString = queryString + ", @p_cd_o_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o_apro");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "p_search");
				queryString = queryString + ", @p_dt_apro_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_apro_fr");
				queryString = queryString + ", @p_dt_apro_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_apro_to");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ea_doc_apro @p_docu = 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
				queryString = queryString + ", @p_ln_apro = " + tcf.getJsonValueSimple("string", jsonObject, "ln_apro");
				queryString = queryString + ", @p_sq_apro = " + tcf.getJsonValueSimple("int", jsonObject, "sq_apro");
				queryString = queryString + ", @p_fg_ea050 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea050");
				queryString = queryString + ", @p_fg_ea002 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea002");
				queryString = queryString + ", @p_dc_apro = " + tcf.getJsonValueSimple("string", jsonObject, "dc_apro");
				queryString = queryString + ", @p_dt_apro = " + tcf.getJsonValueSimple("string", jsonObject, "dt_apro");
				queryString = queryString + ", @p_id_user_apro = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_apro");
				queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_apro");
				queryString = queryString + ", @p_nm_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "nm_e_apro");
				queryString = queryString + ", @p_cd_o_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o_apro");
				queryString = queryString + ", @p_nm_o_apro = " + tcf.getJsonValueSimple("string", jsonObject, "nm_o_apro");
				queryString = queryString + ", @p_fg_hr010_apro = " + tcf.getJsonValueSimple("string", jsonObject, "fg_hr010_apro");
				queryString = queryString + ", @p_nm_hr010_apro = " + tcf.getJsonValueSimple("string", jsonObject, "nm_hr010_apro");
				queryString = queryString + ", @p_fg_hr020_apro = " + tcf.getJsonValueSimple("string", jsonObject, "fg_hr020_apro");
				queryString = queryString + ", @p_nm_hr020_apro = " + tcf.getJsonValueSimple("string", jsonObject, "nm_hr020_apro");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_chk = " + tcf.getJsonValueSimple("string", jsonObject, "yn_chk");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_ea_doc_apro @p_docu = 'delete' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
				queryString = queryString + ", @p_ln_apro = " + tcf.getJsonValueSimple("string", jsonObject, "ln_apro");
				queryString = queryString + ", @p_yn_chk = " + tcf.getJsonValueSimple("string", jsonObject, "yn_chk");
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
