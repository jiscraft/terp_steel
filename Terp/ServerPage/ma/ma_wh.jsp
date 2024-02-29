<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
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


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_ma_wh 'm' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_yn_use = '" + tcf.getJsonValue("string", jsonObject, "yn_use") + "'";
				queryString = queryString + ", @p_fg_w = '" + tcf.getJsonValue("string", jsonObject, "fg_w") + "'";
			}
			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("help")) {
				queryString = queryString + "exec usp_ma_wh 'help' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_yn_use = '" + tcf.getJsonValue("string", jsonObject, "yn_use") + "'";
				queryString = queryString + ", @p_cd_w = '" + tcf.getJsonValue("string", jsonObject, "cd_w") + "'";
				queryString = queryString + ", @p_fg_w = '" + tcf.getJsonValue("string", jsonObject, "fg_w") + "'";
				queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "p_search");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ma_wh 's' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_w = '" + tcf.getJsonValue("string", jsonObject, "cd_w") + "'";
				queryString = queryString + ", @p_nm_w = '" + tcf.getJsonValue("string", jsonObject, "nm_w") + "'";
				queryString = queryString + ", @p_fg_w = '" + tcf.getJsonValue("string", jsonObject, "fg_w") + "'";
				queryString = queryString + ", @p_cd_b = '" + tcf.getJsonValue("string", jsonObject, "cd_b") + "'";
				queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string", jsonObject, "cd_o") + "'";
				queryString = queryString + ", @p_dc_remark = '" + tcf.getJsonValue("string", jsonObject, "dc_remark") + "'";

				queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
				queryString = queryString + ", @p_dc_encharge = '" + tcf.getJsonValue("string", jsonObject, "dc_encharge") + "'";
				queryString = queryString + ", @p_dc_addr = '" + tcf.getJsonValue("string", jsonObject, "dc_addr") + "'";
				queryString = queryString + ", @p_dc_fax = '" + tcf.getJsonValue("string", jsonObject, "dc_fax") + "'";
				queryString = queryString + ", @p_dc_tel = '" + tcf.getJsonValue("string", jsonObject, "dc_tel") + "'";
				queryString = queryString + ", @p_dc_mail = '" + tcf.getJsonValue("string", jsonObject, "dc_mail") + "'";
				queryString = queryString + ", @p_yn_location = '" + tcf.getJsonValue("string", jsonObject, "yn_location") + "'";
				queryString = queryString + ", @p_yn_use = '" + tcf.getJsonValue("string", jsonObject, "yn_use") + "'";

				queryString = queryString + ", @p_id_row = '" + tcf.getJsonValue("string", jsonObject, "id_row") + "'";

			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_ma_wh 'd' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_w = '" + tcf.getJsonValue("string", jsonObject, "cd_w") + "'";

			}

			query.add(queryString);

		}

		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (SQLException e) {
		e.printStackTrace();
		resultString = "{\"success\":" + false + ", \"data\": [] , \"msg\": \"" + e.toString() + "\"}";
	}
	finally {
		outResult.println(resultString);
	}

%>
