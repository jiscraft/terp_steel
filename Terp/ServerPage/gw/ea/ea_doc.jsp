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
				queryString = queryString + "exec usp_ea_doc @p_docu = 'select' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
				queryString = queryString + ", @p_fg_ea001 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea001");
				queryString = queryString + ", @p_dt_doc = " + tcf.getJsonValueSimple("string", jsonObject, "dt_doc");
				queryString = queryString + ", @p_dc_title = " + tcf.getJsonValueSimple("string", jsonObject, "dc_title");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_fg_ea010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea010");
				queryString = queryString + ", @p_fg_ea020 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea020");
				queryString = queryString + ", @p_fg_ea030 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea030");
				queryString = queryString + ", @p_fg_ea040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea040");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_nm_e = " + tcf.getJsonValueSimple("string", jsonObject, "nm_e");
				queryString = queryString + ", @p_cd_o = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o");
				queryString = queryString + ", @p_nm_o = " + tcf.getJsonValueSimple("string", jsonObject, "nm_o");
				queryString = queryString + ", @p_fg_prior = " + tcf.getJsonValueSimple("string", jsonObject, "fg_prior");
				queryString = queryString + ", @p_yn_erp = " + tcf.getJsonValueSimple("string", jsonObject, "yn_erp");
				queryString = queryString + ", @p_yn_re = " + tcf.getJsonValueSimple("string", jsonObject, "yn_re");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "search");
				queryString = queryString + ", @p_dt_doc_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_doc_fr");
				queryString = queryString + ", @p_dt_doc_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_doc_to");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("tempdoc")) {
				queryString = queryString + "exec usp_ea_doc @p_docu = 'tempdoc' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
				queryString = queryString + ", @p_dc_title = " + tcf.getJsonValueSimple("string", jsonObject, "dc_title");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "search");
				queryString = queryString + ", @p_dt_doc_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_doc_fr");
				queryString = queryString + ", @p_dt_doc_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_doc_to");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("siteselect")) {
				queryString = queryString + "exec usp_ea_doc @p_docu = 'siteselect' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_site_sale = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site_sale");
				queryString = queryString + ", @p_cont_rev = " + tcf.getJsonValueSimple("number", jsonObject, "cont_rev");
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("addselect")) {
				queryString = queryString + "exec usp_ea_doc @p_docu = 'addselect' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("safeselect")) {
				queryString = queryString + "exec usp_ea_doc @p_docu = 'safeselect' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ea_doc @p_docu = 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
				queryString = queryString + ", @p_fg_ea001 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea001");
				queryString = queryString + ", @p_dt_doc = " + tcf.getJsonValueSimple("string", jsonObject, "dt_doc");
				queryString = queryString + ", @p_dc_title = " + tcf.getJsonValueSimple("string", jsonObject, "dc_title");
				queryString = queryString + ", @p_am_doc = " + tcf.getJsonValueSimple("number", jsonObject, "am_doc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_fg_ea010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea010");
				queryString = queryString + ", @p_fg_ea020 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea020");
				queryString = queryString + ", @p_fg_ea030 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea030");
				queryString = queryString + ", @p_fg_ea040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea040");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_nm_e = " + tcf.getJsonValueSimple("string", jsonObject, "nm_e");
				queryString = queryString + ", @p_cd_o = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o");
				queryString = queryString + ", @p_nm_o = " + tcf.getJsonValueSimple("string", jsonObject, "nm_o");
				queryString = queryString + ", @p_fg_hr010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_hr010");
				queryString = queryString + ", @p_nm_hr010 = " + tcf.getJsonValueSimple("string", jsonObject, "nm_hr010");
				queryString = queryString + ", @p_fg_hr020 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_hr020");
				queryString = queryString + ", @p_nm_hr020 = " + tcf.getJsonValueSimple("string", jsonObject, "nm_hr020");
				queryString = queryString + ", @p_fg_prior = " + tcf.getJsonValueSimple("string", jsonObject, "fg_prior");
				queryString = queryString + ", @p_yn_erp = " + tcf.getJsonValueSimple("string", jsonObject, "yn_erp");
				queryString = queryString + ", @p_yn_re = " + tcf.getJsonValueSimple("string", jsonObject, "yn_re");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				queryString = queryString + ", @p_yn_add = " + tcf.getJsonValueSimple("string", jsonObject, "yn_add");
				queryString = queryString + ", @p_yn_single = " + tcf.getJsonValueSimple("string", jsonObject, "yn_single");
				queryString = queryString + ", @p_yn_safe = " + tcf.getJsonValueSimple("string", jsonObject, "yn_safe");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_ea_doc @p_docu = 'delete' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("add")) {
				queryString = queryString + "exec usp_ea_doc @p_docu = 'add' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("single")) {
				queryString = queryString + "exec usp_ea_doc @p_docu = 'single' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("safe")) {
				queryString = queryString + "exec usp_ea_doc @p_docu = 'safe' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
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
