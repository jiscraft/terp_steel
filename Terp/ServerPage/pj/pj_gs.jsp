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

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("msite")) {
				queryString = queryString + "exec usp_pj_gs 'msite' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("msitePlan")) {
				queryString = queryString + "exec usp_pj_gs 'msitePlan' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("gs")) {
				queryString = queryString + "exec usp_pj_gs 'gs' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_gs = " + tcf.getJsonValueSimple("string", jsonObject, "no_gs");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("gsbase")) {
				queryString = queryString + "exec usp_pj_gs 'gsbase' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("new")) {
				queryString = queryString + "exec usp_pj_gs 'new' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_pj_gs 's' ";
				queryString = queryString + "exec usp_pj_gs 's' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_gs = " + tcf.getJsonValueSimple("string", jsonObject, "no_gs");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_ym_gs = " + tcf.getJsonValueSimple("string", jsonObject, "ym_gs");
				queryString = queryString + ", @p_fg_tax = " + tcf.getJsonValueSimple("string", jsonObject, "fg_tax");
				queryString = queryString + ", @p_at_gs = " + tcf.getJsonValueSimple("number", jsonObject, "at_gs");
				queryString = queryString + ", @p_at_gs_vat = " + tcf.getJsonValueSimple("number", jsonObject, "at_gs_vat");
				queryString = queryString + ", @p_dt_tax = " + tcf.getJsonValueSimple("string", jsonObject, "dt_tax");
				queryString = queryString + ", @p_dt_req = " + tcf.getJsonValueSimple("string", jsonObject, "dt_req");
				queryString = queryString + ", @p_fg_pj100 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj100");
				queryString = queryString + ", @p_dt_inmoney = " + tcf.getJsonValueSimple("string", jsonObject, "dt_inmoney");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_at_m1 = " + tcf.getJsonValueSimple("number", jsonObject, "m1");
				queryString = queryString + ", @p_at_m2 = " + tcf.getJsonValueSimple("number", jsonObject, "m2");
				queryString = queryString + ", @p_at_m3 = " + tcf.getJsonValueSimple("number", jsonObject, "m3");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}



			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sall")) {
				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("hData")) {
					queryString = queryString + "exec usp_pj_gs 's' ";
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_no_gs = " + tcf.getJsonValueSimple("string", jsonObject, "no_gs");
					queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
					queryString = queryString + ", @p_ym_gs = " + tcf.getJsonValueSimple("string", jsonObject, "ym_gs");
					queryString = queryString + ", @p_fg_tax = " + tcf.getJsonValueSimple("string", jsonObject, "fg_tax");
					queryString = queryString + ", @p_at_gs = " + tcf.getJsonValueSimple("number", jsonObject, "at_gs");
					queryString = queryString + ", @p_at_gs_vat = " + tcf.getJsonValueSimple("number", jsonObject, "at_gs_vat");
					queryString = queryString + ", @p_dt_tax = " + tcf.getJsonValueSimple("string", jsonObject, "dt_tax");
					queryString = queryString + ", @p_dt_req = " + tcf.getJsonValueSimple("string", jsonObject, "dt_req");
					queryString = queryString + ", @p_fg_pj100 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj100");
					queryString = queryString + ", @p_dt_inmoney = " + tcf.getJsonValueSimple("string", jsonObject, "dt_inmoney");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
					queryString = queryString + ", @p_at_m1 = " + tcf.getJsonValueSimple("number", jsonObject, "at_m1");
					queryString = queryString + ", @p_at_m2 = " + tcf.getJsonValueSimple("number", jsonObject, "at_m2");
					queryString = queryString + ", @p_at_m3 = " + tcf.getJsonValueSimple("number", jsonObject, "at_m3");
					queryString = queryString + ", @p_fg_docu = " + tcf.getJsonValueSimple("string", jsonObject, "fg_docu");
					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				}

				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("lData")) {
					queryString = queryString + "exec usp_pj_gs_deduct 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_no_gs = " + tcf.getJsonValueSimple("string", jsonObject, "no_gs");
					queryString = queryString + ", @p_fg_pj110 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj110");
					queryString = queryString + ", @p_at_deduct = " + tcf.getJsonValueSimple("number", jsonObject, "at_deduct");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");

				}
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_pj_gs 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_gs = " + tcf.getJsonValueSimple("string", jsonObject, "no_gs");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("modifyInMoney")) {
				queryString = queryString + "exec usp_pj_gs 'modifyInMoney' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_gs = " + tcf.getJsonValueSimple("string", jsonObject, "no_gs");
				queryString = queryString + ", @p_dt_inmoney_modify = " + tcf.getJsonValueSimple("string", jsonObject, "dt_inmoney_modify");
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
