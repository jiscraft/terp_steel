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

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_pj_contract 'm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("new")) {
				queryString = queryString + "exec usp_pj_contract 'new' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_pj_contract 's' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_sq_rev = " + tcf.getJsonValueSimple("number", jsonObject, "sq_rev");
				queryString = queryString + ", @p_nm_cont = " + tcf.getJsonValueSimple("string", jsonObject, "nm_cont");
				queryString = queryString + ", @p_dt_cont = " + tcf.getJsonValueSimple("string", jsonObject, "dt_cont");
				queryString = queryString + ", @p_fg_cont = " + tcf.getJsonValueSimple("string", jsonObject, "fg_cont");
				queryString = queryString + ", @p_fg_pj040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj040");

				queryString = queryString + ", @p_at_cont_tax = " + tcf.getJsonValueSimple("number", jsonObject, "at_cont_tax");
				queryString = queryString + ", @p_at_cont_free = " + tcf.getJsonValueSimple("number", jsonObject, "at_cont_free");
				queryString = queryString + ", @p_at_cont_vat = " + tcf.getJsonValueSimple("number", jsonObject, "at_cont_vat");

				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_f");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");

				queryString = queryString + ", @p_fg_pj030 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj030");
				queryString = queryString + ", @p_fg_pj070 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj070");
				queryString = queryString + ", @p_fg_pj080 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj080");

				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");

				queryString = queryString + ", @p_qt_cont = " + tcf.getJsonValueSimple("number", jsonObject, "qt_cont");
				queryString = queryString + ", @p_at_budget = " + tcf.getJsonValueSimple("number", jsonObject, "at_budget");
				queryString = queryString + ", @p_fg_mm010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm010");

				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}



			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sall")) {
				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("hData")) {
					queryString = queryString + "exec usp_pj_contract 's' ";
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
					queryString = queryString + ", @p_sq_rev = " + tcf.getJsonValueSimple("number", jsonObject, "sq_rev");
					queryString = queryString + ", @p_nm_cont = " + tcf.getJsonValueSimple("string", jsonObject, "nm_cont");
					queryString = queryString + ", @p_dt_cont = " + tcf.getJsonValueSimple("string", jsonObject, "dt_cont");
					queryString = queryString + ", @p_fg_cont = " + tcf.getJsonValueSimple("string", jsonObject, "fg_cont");
					queryString = queryString + ", @p_fg_pj040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj040");

					queryString = queryString + ", @p_at_cont_tax = " + tcf.getJsonValueSimple("number", jsonObject, "at_cont_tax");
					queryString = queryString + ", @p_at_cont_free = " + tcf.getJsonValueSimple("number", jsonObject, "at_cont_free");
					queryString = queryString + ", @p_at_cont_vat = " + tcf.getJsonValueSimple("number", jsonObject, "at_cont_vat");

					queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
					queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");

					queryString = queryString + ", @p_fg_pj030 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj030");
					queryString = queryString + ", @p_fg_pj070 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj070");
					queryString = queryString + ", @p_fg_pj080 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj080");

					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");

					queryString = queryString + ", @p_qt_cont = " + tcf.getJsonValueSimple("number", jsonObject, "qt_cont");
					queryString = queryString + ", @p_at_budget = " + tcf.getJsonValueSimple("number", jsonObject, "at_budget");
					queryString = queryString + ", @p_fg_mm010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm010");

					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				}

				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("lData")) {
					queryString = queryString + "exec usp_pj_guarantee 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
//				queryString = queryString + ", @p_ln_contract = " + tcf.getJsonValueSimple("string", jsonObject, "ln_contract");
//				queryString = queryString + ", @p_ln_contract_rev = " + tcf.getJsonValueSimple("string", jsonObject, "ln_contract_rev");
					queryString = queryString + ", @p_fg_sm070 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sm070");
					queryString = queryString + ", @p_fg_sm090 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sm090");
					queryString = queryString + ", @p_at_guarantee = " + tcf.getJsonValueSimple("number", jsonObject, "at_guarantee");
					queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
					queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				}
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_pj_contract 'd' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_sq_rev = " + tcf.getJsonValueSimple("number", jsonObject, "sq_rev");
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
