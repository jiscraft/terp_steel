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

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("mcon")) {
				queryString = queryString + "exec usp_sm_er 'mcon' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site_sale = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site_sale");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("mcondetail")) {
				queryString = queryString + "exec usp_sm_er 'mcondetail' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site_sale = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site_sale");
				queryString = queryString + ", @p_cd_p_con = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p_con");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_sm_er 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIdUser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_er = " + tcf.getJsonValueSimple("string", jsonObject, "no_er");
				queryString = queryString + ", @p_cd_p_con = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p_con");
				queryString = queryString + ", @p_cd_site_sale = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site_sale");
				queryString = queryString + ", @p_dc_er = " + tcf.getJsonValueSimple("string", jsonObject, "dc_er");
				queryString = queryString + ", @p_dt_er = " + tcf.getJsonValueSimple("string", jsonObject, "dt_er");
				queryString = queryString + ", @p_fg_er = " + tcf.getJsonValueSimple("string", jsonObject, "fg_er");
				queryString = queryString + ", @p_dt_hs = " + tcf.getJsonValueSimple("string", jsonObject, "dt_hs");
				queryString = queryString + ", @p_dt_issue = " + tcf.getJsonValueSimple("string", jsonObject, "dt_issue");
				queryString = queryString + ", @p_dc_competition = " + tcf.getJsonValueSimple("string", jsonObject, "dc_competition");
				queryString = queryString + ", @p_fg_sm010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sm010");
				queryString = queryString + ", @p_dc_encharge = " + tcf.getJsonValueSimple("string", jsonObject, "dc_encharge");
				queryString = queryString + ", @p_dc_encharge_contact = " + tcf.getJsonValueSimple("string", jsonObject, "dc_encharge_contact");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_dc_notice = " + tcf.getJsonValueSimple("string", jsonObject, "dc_notice");
                queryString = queryString + ", @p_at_er = " + tcf.getJsonValueSimple("number", jsonObject, "at_er");
                queryString = queryString + ", @p_wt_er = " + tcf.getJsonValueSimple("number", jsonObject, "wt_er");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_sm_er 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIdUser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_er = " + tcf.getJsonValueSimple("string", jsonObject, "no_er");

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
