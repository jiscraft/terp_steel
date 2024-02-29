<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeSessionManager" %>


<%

	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	TobeQueryExec execQuery = new TobeQueryExec();
	TobeCommonFunction tcf = new TobeCommonFunction();
	TobeSessionManager ts = new TobeSessionManager();
	List<String> query = new ArrayList<String>();
	String queryString = "";
	String resultString = "";
	String strErrorMessage = "";
	Iterator iterator = null;
	HttpSession sessionCheck = request.getSession(false);

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

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("gmlist")) {
				queryString = queryString + "exec usp_pj_gs_getmoney 'gmlist' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_ym_fr = " + tcf.getJsonValueSimple("string", jsonObject, "ym_fr");
				queryString = queryString + ", @p_ym_to = " + tcf.getJsonValueSimple("string", jsonObject, "ym_to");
				queryString = queryString + ", @p_fg_statusString = " + tcf.getJsonValueSimple("string", jsonObject, "fg_statusString");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_pj_gs_getmoney 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_gs = " + tcf.getJsonValueSimple("string", jsonObject, "no_gs");
				queryString = queryString + ", @p_no_gm = " + tcf.getJsonValueSimple("string", jsonObject, "no_gm");
				queryString = queryString + ", @p_fg_pj120 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj120");

				queryString = queryString + ", @p_dt_gm = " + tcf.getJsonValueSimple("string", jsonObject, "dt_gm");
				queryString = queryString + ", @p_dt_bill = " + tcf.getJsonValueSimple("string", jsonObject, "dt_bill");
				queryString = queryString + ", @p_at_gm = " + tcf.getJsonValueSimple("number", jsonObject, "at_gm");
				queryString = queryString + ", @p_at_gm_vat = " + tcf.getJsonValueSimple("number", jsonObject, "at_gm_vat");
				queryString = queryString + ", @p_no_bill = " + tcf.getJsonValueSimple("string", jsonObject, "no_bill");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_pj_gs_getmoney 'm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_gs = " + tcf.getJsonValueSimple("string", jsonObject, "no_gs");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_pj_gs_getmoney 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_gm = " + tcf.getJsonValueSimple("string", jsonObject, "no_gm");
			}

			query.add(queryString);
		}


		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (Exception e) {
		if (strErrorMessage == "") {
			strErrorMessage = e.toString();
		}

		resultString = "{\"success\":" + false + ", \"data\": [] , \"msg\": \"" + strErrorMessage + "\"}";

	}
	finally {
		outResult.print(resultString.trim());
	}


%>
