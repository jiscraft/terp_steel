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
				queryString = queryString + "exec usp_ea_def_alnd @p_docu = 'select' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_aln = " + tcf.getJsonValueSimple("string", jsonObject, "cd_aln");
				queryString = queryString + ", @p_ln_aln = " + tcf.getJsonValueSimple("string", jsonObject, "ln_aln");
				queryString = queryString + ", @p_sq_apro = " + tcf.getJsonValueSimple("int", jsonObject, "sq_apro");
				queryString = queryString + ", @p_fg_ea050 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea050");
				queryString = queryString + ", @p_id_user_apro = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_apro");
				queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_apro");
				queryString = queryString + ", @p_nm_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "nm_e_apro");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("aln")) {
				queryString = queryString + "exec usp_ea_def_alnd @p_docu = 'aln' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_aln = " + tcf.getJsonValueSimple("string", jsonObject, "cd_aln");
				queryString = queryString + ", @p_ln_aln = " + tcf.getJsonValueSimple("string", jsonObject, "ln_aln");
				queryString = queryString + ", @p_sq_apro = " + tcf.getJsonValueSimple("int", jsonObject, "sq_apro");
				queryString = queryString + ", @p_id_user_apro = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_apro");
				queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_apro");
				queryString = queryString + ", @p_nm_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "nm_e_apro");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("rcv")) {
				queryString = queryString + "exec usp_ea_def_alnd @p_docu = 'rcv' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_aln = " + tcf.getJsonValueSimple("string", jsonObject, "cd_aln");
				queryString = queryString + ", @p_ln_aln = " + tcf.getJsonValueSimple("string", jsonObject, "ln_aln");
				queryString = queryString + ", @p_sq_apro = " + tcf.getJsonValueSimple("int", jsonObject, "sq_apro");
				queryString = queryString + ", @p_id_user_apro = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_apro");
				queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_apro");
				queryString = queryString + ", @p_nm_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "nm_e_apro");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ea_def_alnd @p_docu = 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_aln = " + tcf.getJsonValueSimple("string", jsonObject, "cd_aln");
				queryString = queryString + ", @p_ln_aln = " + tcf.getJsonValueSimple("string", jsonObject, "ln_aln");
				queryString = queryString + ", @p_sq_apro = " + tcf.getJsonValueSimple("int", jsonObject, "sq_apro");
				queryString = queryString + ", @p_fg_ea050 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea050");
				queryString = queryString + ", @p_id_user_apro = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_apro");
				queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_apro");
				queryString = queryString + ", @p_nm_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "nm_e_apro");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_ea_def_alnd @p_docu = 'delete' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_aln = " + tcf.getJsonValueSimple("string", jsonObject, "cd_aln");
				queryString = queryString + ", @p_ln_aln = " + tcf.getJsonValueSimple("string", jsonObject, "ln_aln");
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
