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
				queryString = queryString + "exec usp_sy_files @p_docu = 'select' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_af = " + tcf.getJsonValueSimple("string", jsonObject, "no_af");
				queryString = queryString + ", @p_id_row_src = " + tcf.getJsonValueSimple("string", jsonObject, "id_row_src");
				queryString = queryString + ", @p_fg_ea040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea040");
				queryString = queryString + ", @p_fg_sy210 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy210");
				queryString = queryString + ", @p_fg_sy210_ll = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy210_ll");
				queryString = queryString + ", @p_dc_save_path = " + tcf.getJsonValueSimple("string", jsonObject, "dc_save_path");
				queryString = queryString + ", @p_dc_src_name = " + tcf.getJsonValueSimple("string", jsonObject, "dc_src_name");
				queryString = queryString + ", @p_dc_src_mime = " + tcf.getJsonValueSimple("string", jsonObject, "dc_src_mime");
				queryString = queryString + ", @p_dc_key1 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key1");
				queryString = queryString + ", @p_dc_key2 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key2");
				queryString = queryString + ", @p_dc_key3 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key3");
				queryString = queryString + ", @p_dc_key4 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key4");
				queryString = queryString + ", @p_dc_key5 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key5");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("selectmo")) {
				queryString = queryString + "exec usp_sy_files @p_docu = 'selectmo' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_af = " + tcf.getJsonValueSimple("string", jsonObject, "no_af");
				queryString = queryString + ", @p_id_row_src = " + tcf.getJsonValueSimple("string", jsonObject, "id_row_src");
				queryString = queryString + ", @p_fg_ea040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ea040");
				queryString = queryString + ", @p_fg_sy210 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy210");
				queryString = queryString + ", @p_fg_sy210_ll = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy210_ll");
				queryString = queryString + ", @p_dc_save_path = " + tcf.getJsonValueSimple("string", jsonObject, "dc_save_path");
				queryString = queryString + ", @p_dc_src_name = " + tcf.getJsonValueSimple("string", jsonObject, "dc_src_name");
				queryString = queryString + ", @p_dc_src_mime = " + tcf.getJsonValueSimple("string", jsonObject, "dc_src_mime");
				queryString = queryString + ", @p_dc_key1 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key1");
				queryString = queryString + ", @p_dc_key2 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key2");
				queryString = queryString + ", @p_dc_key3 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key3");
				queryString = queryString + ", @p_dc_key4 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key4");
				queryString = queryString + ", @p_dc_key5 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key5");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_sy_files @p_docu = 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_af = " + tcf.getJsonValueSimple("string", jsonObject, "no_af");
				queryString = queryString + ", @p_id_row_src = " + tcf.getJsonValueSimple("string", jsonObject, "id_row_src");
				queryString = queryString + ", @p_fg_sy210 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy210");
				queryString = queryString + ", @p_fg_sy210_ll = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy210_ll");
				queryString = queryString + ", @p_dc_save_path = " + tcf.getJsonValueSimple("string", jsonObject, "dc_save_path");
				queryString = queryString + ", @p_dc_src_name = " + tcf.getJsonValueSimple("string", jsonObject, "dc_src_name");
				queryString = queryString + ", @p_dc_src_mime = " + tcf.getJsonValueSimple("string", jsonObject, "dc_src_mime");
				queryString = queryString + ", @p_dc_src_size = " + tcf.getJsonValueSimple("number", jsonObject, "dc_src_size");
				queryString = queryString + ", @p_dc_key1 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key1");
				queryString = queryString + ", @p_dc_key2 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key2");
				queryString = queryString + ", @p_dc_key3 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key3");
				queryString = queryString + ", @p_dc_key4 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key4");
				queryString = queryString + ", @p_dc_key5 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key5");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_sy_files @p_docu = 'delete' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_af = " + tcf.getJsonValueSimple("string", jsonObject, "no_af");
				queryString = queryString + ", @p_id_row_src = " + tcf.getJsonValueSimple("string", jsonObject, "id_row_src");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("fcnt")) {
				queryString = queryString + "exec usp_sy_files @p_docu = 'fcnt' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_af = " + tcf.getJsonValueSimple("string", jsonObject, "no_af");
				queryString = queryString + ", @p_id_row_src = " + tcf.getJsonValueSimple("string", jsonObject, "id_row_src");
				queryString = queryString + ", @p_fg_sy210 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy210");
				queryString = queryString + ", @p_fg_sy210_ll = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy210_ll");
				queryString = queryString + ", @p_dc_save_path = " + tcf.getJsonValueSimple("string", jsonObject, "dc_save_path");
				queryString = queryString + ", @p_dc_src_name = " + tcf.getJsonValueSimple("string", jsonObject, "dc_src_name");
				queryString = queryString + ", @p_dc_src_mime = " + tcf.getJsonValueSimple("string", jsonObject, "dc_src_mime");
				queryString = queryString + ", @p_dc_key1 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key1");
				queryString = queryString + ", @p_dc_key2 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key2");
				queryString = queryString + ", @p_dc_key3 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key3");
				queryString = queryString + ", @p_dc_key4 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key4");
				queryString = queryString + ", @p_dc_key5 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_key5");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
			}

			query.add(queryString);
		}

		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (Exception e) {
		e.printStackTrace();
		resultString = "{\"success\":false, \"data\":[] , \"msg\":\"" + e.getLocalizedMessage() + "\"}";
	}
	finally {
		outResult.println(resultString);
	}

%>
