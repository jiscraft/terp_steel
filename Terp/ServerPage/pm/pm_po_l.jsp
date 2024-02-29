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
				queryString = queryString + "exec usp_pm_po_l 'm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_po = " + tcf.getJsonValueSimple("string", jsonObject, "no_po");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("s")) {
				queryString = queryString + "exec usp_pm_po_l 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
				queryString = queryString + ", @p_no_po = " + tcf.getJsonValueSimple("string", jsonObject, "no_po");
				queryString = queryString + ", @p_ln_po = " + tcf.getJsonValueSimple("string", jsonObject, "ln_po");
				queryString = queryString + ", @p_cd_i = " + tcf.getJsonValueSimple("string", jsonObject, "cd_i");
				queryString = queryString + ", @p_fg_mm090 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm090");
				queryString = queryString + ", @p_cd_spec = " + tcf.getJsonValueSimple("string", jsonObject, "cd_spec");
				queryString = queryString + ", @p_nb_size = " + tcf.getJsonValueSimple("number", jsonObject, "nb_size");
				queryString = queryString + ", @p_qt_po = " + tcf.getJsonValueSimple("number", jsonObject, "qt_po");
				queryString = queryString + ", @p_qt_po_spec = " + tcf.getJsonValueSimple("number", jsonObject, "qt_po_spec");
				queryString = queryString + ", @p_up_po = " + tcf.getJsonValueSimple("number", jsonObject, "up_po");
				queryString = queryString + ", @p_at_po = " + tcf.getJsonValueSimple("number", jsonObject, "at_po");
				queryString = queryString + ", @p_at_po_vat = " + tcf.getJsonValueSimple("number", jsonObject, "at_po_vat");
				queryString = queryString + ", @p_at_po_ttl = " + tcf.getJsonValueSimple("number", jsonObject, "at_po_ttl");

				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_no_wo = " + tcf.getJsonValueSimple("string", jsonObject, "no_wo");
				queryString = queryString + ", @p_no_pr = " + tcf.getJsonValueSimple("string", jsonObject, "no_pr");
				queryString = queryString + ", @p_ln_order = " + tcf.getJsonValueSimple("string", jsonObject, "ln_order");
				queryString = queryString + ", @p_dt_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "dt_rcv");

				queryString = queryString + ", @p_cd_w = " + tcf.getJsonValueSimple("string", jsonObject, "cd_w");
				queryString = queryString + ", @p_cd_wloc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_wloc");
				queryString = queryString + ", @p_dc_address = " + tcf.getJsonValueSimple("string", jsonObject, "dc_address");
				queryString = queryString + ", @p_dt_close = " + tcf.getJsonValueSimple("string", jsonObject, "dt_close");
				queryString = queryString + ", @p_cd_e_close = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_close");

				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_pm_po_l 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_po = " + tcf.getJsonValueSimple("string", jsonObject, "no_po");
				queryString = queryString + ", @p_ln_po = " + tcf.getJsonValueSimple("string", jsonObject, "ln_po");

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
