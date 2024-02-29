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

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("period")) {
				queryString = queryString + "exec usp_pj_gs_report_b 'period' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_fr = " + tcf.getJsonValueSimple("string", jsonObject, "ym_fr");
				queryString = queryString + ", @p_ym_to = " + tcf.getJsonValueSimple("string", jsonObject, "ym_to");

			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("site")) {
				queryString = queryString + "exec usp_pj_gs_report_b 'site' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_fr = " + tcf.getJsonValueSimple("string", jsonObject, "ym_fr");
				queryString = queryString + ", @p_ym_to = " + tcf.getJsonValueSimple("string", jsonObject, "ym_to");

			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("partner")) {
				queryString = queryString + "exec usp_pj_gs_report_b 'partner' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_fr = " + tcf.getJsonValueSimple("string", jsonObject, "ym_fr");
				queryString = queryString + ", @p_ym_to = " + tcf.getJsonValueSimple("string", jsonObject, "ym_to");

			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("pj010")) {
				queryString = queryString + "exec usp_pj_gs_report_b 'pj010' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_fr = " + tcf.getJsonValueSimple("string", jsonObject, "ym_fr");
				queryString = queryString + ", @p_ym_to = " + tcf.getJsonValueSimple("string", jsonObject, "ym_to");

			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("pj020")) {
				queryString = queryString + "exec usp_pj_gs_report_b 'pj020' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_fr = " + tcf.getJsonValueSimple("string", jsonObject, "ym_fr");
				queryString = queryString + ", @p_ym_to = " + tcf.getJsonValueSimple("string", jsonObject, "ym_to");

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
