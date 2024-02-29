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

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("getYm")) {
				queryString = queryString + "exec usp_pj_gs_report_a 'getYm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_gs = " + tcf.getJsonValueSimple("string", jsonObject, "ym_gs");

			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("form16month")) {
				queryString = queryString + "exec usp_pj_gs_report_a 'form16month' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_gs = " + tcf.getJsonValueSimple("string", jsonObject, "ym_gs");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("form1this")) {
				queryString = queryString + "exec usp_pj_gs_report_a 'form1this' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_gs = " + tcf.getJsonValueSimple("string", jsonObject, "ym_gs");
				queryString = queryString + ", @p_ym_fr = " + tcf.getJsonValueSimple("string", jsonObject, "ym_fr");
				queryString = queryString + ", @p_ym_to = " + tcf.getJsonValueSimple("string", jsonObject, "ym_to");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("gs")) {
				queryString = queryString + "exec usp_pj_gs_report_a 'gs' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_gs = " + tcf.getJsonValueSimple("string", jsonObject, "ym_gs");
				queryString = queryString + ", @p_ym_fr = " + tcf.getJsonValueSimple("string", jsonObject, "ym_fr");
				queryString = queryString + ", @p_ym_to = " + tcf.getJsonValueSimple("string", jsonObject, "ym_to");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("form1bf")) {
				queryString = queryString + "exec usp_pj_gs_report_a 'form1bf' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_ym_gs = " + tcf.getJsonValueSimple("string", jsonObject, "ym_gs");
				queryString = queryString + ", @p_ym_fr = " + tcf.getJsonValueSimple("string", jsonObject, "ym_fr");
				queryString = queryString + ", @p_ym_to = " + tcf.getJsonValueSimple("string", jsonObject, "ym_to");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
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
