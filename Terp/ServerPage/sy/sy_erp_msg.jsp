<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
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
				queryString = queryString + "exec usp_sy_erp_msg @p_docu = 'select' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_rcv");
				queryString = queryString + ", @p_fg_sy200 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy200");
				queryString = queryString + ", @p_no_erpkey = " + tcf.getJsonValueSimple("string", jsonObject, "no_erpkey");
				queryString = queryString + ", @p_ln_erpkey = " + tcf.getJsonValueSimple("string", jsonObject, "ln_erpkey");
                queryString = queryString + ", @p_yn_push = " + tcf.getJsonValueSimple("string", jsonObject, "yn_push");
                queryString = queryString + ", @p_yn_push_sent = " + tcf.getJsonValueSimple("string", jsonObject, "yn_push_sent");
                queryString = queryString + ", @p_yn_confirm = " + tcf.getJsonValueSimple("string", jsonObject, "yn_confirm");
				queryString = queryString + ", @p_id_msg_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_sy_erp_msg @p_docu = 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_rcv");
				queryString = queryString + ", @p_fg_sy200 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy200");
				queryString = queryString + ", @p_no_erpkey = " + tcf.getJsonValueSimple("string", jsonObject, "no_erpkey");
				queryString = queryString + ", @p_ln_erpkey = " + tcf.getJsonValueSimple("string", jsonObject, "ln_erpkey");
				queryString = queryString + ", @p_cd_e_send = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_send");
				queryString = queryString + ", @p_cd_o_send = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o_send");
				queryString = queryString + ", @p_id_user_send = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_send");
				queryString = queryString + ", @p_cd_o_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o_rcv");
				queryString = queryString + ", @p_cd_e_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_rcv");
				queryString = queryString + ", @p_cd_p_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p_rcv");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_dc_msg = " + tcf.getJsonValueSimple("string", jsonObject, "dc_msg");
				queryString = queryString + ", @p_yn_push = " + tcf.getJsonValueSimple("string", jsonObject, "yn_push");
                queryString = queryString + ", @p_yn_push_sent = " + tcf.getJsonValueSimple("string", jsonObject, "yn_push_sent");
				queryString = queryString + ", @p_yn_confirm = " + tcf.getJsonValueSimple("string", jsonObject, "yn_confirm");
				queryString = queryString + ", @p_tm_confirm = " + tcf.getJsonValueSimple("string", jsonObject, "tm_confirm");
				queryString = queryString + ", @p_dc_confirm_comment = " + tcf.getJsonValueSimple("string", jsonObject, "dc_confirm_comment");
				queryString = queryString + ", @p_id_msg_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_sy_erp_msg @p_docu = 'delete' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_rcv");
				queryString = queryString + ", @p_fg_sy200 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy200");
				queryString = queryString + ", @p_no_erpkey = " + tcf.getJsonValueSimple("string", jsonObject, "no_erpkey");
				queryString = queryString + ", @p_ln_erpkey = " + tcf.getJsonValueSimple("string", jsonObject, "ln_erpkey");
				queryString = queryString + ", @p_id_msg_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("instance")) {
				queryString = queryString + "exec usp_sy_erp_msg @p_docu = 'instance' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");

			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("erpcfm")) {
				queryString = queryString + "exec usp_sy_erp_msg @p_docu = 'erpcfm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_id_msg_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
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
