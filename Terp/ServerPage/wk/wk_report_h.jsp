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
		System.out.println('1');
		while (iterator.hasNext()) {
			JSONObject jsonObject = (JSONObject) iterator.next();
			queryString = "";

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_wk_report_h 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_wr = " + tcf.getJsonValueSimple("string", jsonObject, "no_wr");
				queryString = queryString + ", @p_dt_wr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_wr");
				queryString = queryString + ", @p_fg_wk050 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_wk050");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_cd_o = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o");
				queryString = queryString + ", @p_fg_main = " + tcf.getJsonValueSimple("string", jsonObject, "fg_main");
				queryString = queryString + ", @p_fg_activity = " + tcf.getJsonValueSimple("string", jsonObject, "fg_activity");
				queryString = queryString + ", @p_fg_bo = " + tcf.getJsonValueSimple("string", jsonObject, "fg_bo");
				queryString = queryString + ", @p_dc_wr = " + tcf.getJsonValueSimple("string", jsonObject, "dc_wr");
				queryString = queryString + ", @p_dc_nextplan = " + tcf.getJsonValueSimple("string", jsonObject, "dc_nextplan");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");

				queryString = queryString + ", @p_fg_cj = " + tcf.getJsonValueSimple("string", jsonObject, "fg_cj");
				queryString = queryString + ", @p_dt_fr_cj = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr_cj");
				queryString = queryString + ", @p_dt_to_cj = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to_cj");
				queryString = queryString + ", @p_dc_cj = " + tcf.getJsonValueSimple("string", jsonObject, "dc_cj");
			}



			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_wk_report_h 'm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sitelist")) {
				queryString = queryString + "exec usp_wk_report_h 'sitelist' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_site_sale = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site_sale");
				queryString = queryString + ", @p_cont_rev = " + tcf.getJsonValueSimple("number", jsonObject, "cont_rev");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("r")) {
				queryString = queryString + "exec usp_wk_report_h 'r' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_no_wr = " + tcf.getJsonValueSimple("string", jsonObject, "no_wr");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("gather")) {
				queryString = queryString + "exec usp_wk_report_h 'gather' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_o = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o");
				queryString = queryString + ", @p_dt_wr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_wr");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_wk_report_h 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_wr = " + tcf.getJsonValueSimple("string", jsonObject, "no_wr");
			}

			query.add(queryString);
		}


		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (Exception e) {
		System.out.println(e);
		e.printStackTrace();
	}
	finally {
		outResult.println(resultString);
	}

%>
