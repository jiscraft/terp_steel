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
			queryString = "exec usp_ea_doc_list @p_docu = " + tcf.getJsonValueSimple("string", jsonObject, "actiondata");
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

			queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_apro");
			queryString = queryString + ", @p_dt_doc_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_doc_fr");
			queryString = queryString + ", @p_dt_doc_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_doc_to");
			queryString = queryString + ", @p_yn_apro300 = " + tcf.getJsonValueSimple("string", jsonObject, "yn_apro300");
			queryString = queryString + ", @p_yn_apro900 = " + tcf.getJsonValueSimple("string", jsonObject, "yn_apro900");
			queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "search");
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
