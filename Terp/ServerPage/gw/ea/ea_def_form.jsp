<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.common.util.Common" %>
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
				queryString = queryString + "exec usp_ea_def_form @p_docu = 'select' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_form = " + tcf.getJsonValueSimple("string", jsonObject, "cd_form");
				queryString = queryString + ", @p_nm_form = " + tcf.getJsonValueSimple("string", jsonObject, "nm_form");
				queryString = queryString + ", @p_fg_ea010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea010");
				queryString = queryString + ", @p_fg_ea020 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea020");
				queryString = queryString + ", @p_fg_ea030 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea030");
				queryString = queryString + ", @p_fg_ea040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea040");
				queryString = queryString + ", @p_yn_open = " + tcf.getJsonValueSimple("string", jsonObject, "yn_open");
				queryString = queryString + ", @p_yn_sys = " + tcf.getJsonValueSimple("string", jsonObject, "yn_sys");
				queryString = queryString + ", @p_dc_cont_sch = " + tcf.getJsonValueSimple("string", jsonObject, "dc_cont_sch");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("list")) {
				queryString = queryString + "exec usp_ea_def_form @p_docu = 'list' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_form = " + tcf.getJsonValueSimple("string", jsonObject, "cd_form");
				queryString = queryString + ", @p_nm_form = " + tcf.getJsonValueSimple("string", jsonObject, "nm_form");
				queryString = queryString + ", @p_fg_ea010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea010");
				queryString = queryString + ", @p_fg_ea020 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea020");
				queryString = queryString + ", @p_fg_ea030 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea030");
				queryString = queryString + ", @p_fg_ea040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea040");
				queryString = queryString + ", @p_yn_open = " + tcf.getJsonValueSimple("string", jsonObject, "yn_open");
				queryString = queryString + ", @p_yn_sys = " + tcf.getJsonValueSimple("string", jsonObject, "yn_sys");
				queryString = queryString + ", @p_dc_cont_sch = " + tcf.getJsonValueSimple("string", jsonObject, "dc_cont_sch");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ea_def_form @p_docu = 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_form = " + tcf.getJsonValueSimple("string", jsonObject, "cd_form");
				queryString = queryString + ", @p_nm_form = " + tcf.getJsonValueSimple("string", jsonObject, "nm_form");
				queryString = queryString + ", @p_fg_ea010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea010");
				queryString = queryString + ", @p_fg_ea020 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea020");
				queryString = queryString + ", @p_fg_ea030 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea030");
				queryString = queryString + ", @p_fg_ea040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea040");
				queryString = queryString + ", @p_yn_open = " + tcf.getJsonValueSimple("string", jsonObject, "yn_open");
				queryString = queryString + ", @p_yn_sys = " + tcf.getJsonValueSimple("string", jsonObject, "yn_sys");
				queryString = queryString + ", @p_dc_cont_sch = " + tcf.getJsonValueSimple("string", jsonObject, "dc_cont_sch");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_ea_def_form @p_docu = 'delete' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_form = " + tcf.getJsonValueSimple("string", jsonObject, "cd_form");
			}

			if (isValid) query.add(queryString);
		}

		if (isValid) resultString = execQuery.queryExec(query, "terp", "json");
		else resultString = "{\"success\": false, \"data\": [] , \"msg\": \"양식내용을 정상적으로 저장하지 못하였습니다!\"}";
	}
	catch (Exception e) {
		e.printStackTrace();
		resultString = "{\"success\": false, \"data\": [] , \"msg\": \"" + e.getLocalizedMessage() + "\"}";
	}
	finally {
		outResult.println(resultString);
	}

%>
