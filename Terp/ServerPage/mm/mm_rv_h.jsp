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

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("r")) {
				queryString = queryString + "exec usp_mm_rv_h 'r' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_rv = " + tcf.getJsonValueSimple("string", jsonObject, "no_rv");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sall")) {
				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("hData")) {
					queryString = queryString + "exec usp_mm_rv_h 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_no_rv = " + tcf.getJsonValueSimple("string", jsonObject, "no_rv");
					queryString = queryString + ", @p_dt_rv = " + tcf.getJsonValueSimple("string", jsonObject, "dt_rv");
					queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
					queryString = queryString + ", @p_cd_w_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "cd_w_rcv");
					queryString = queryString + ", @p_cd_e_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_rcv");
					queryString = queryString + ", @p_dc_carno = " + tcf.getJsonValueSimple("string", jsonObject, "dc_carno");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				}

				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("lData")) {
					queryString = queryString + "exec usp_mm_rv_l 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_no_rv = " + tcf.getJsonValueSimple("string", jsonObject, "no_rv");
					queryString = queryString + ", @p_ln_rv = " + tcf.getJsonValueSimple("string", jsonObject, "ln_rv");
					queryString = queryString + ", @p_fg_po = " + tcf.getJsonValueSimple("string", jsonObject, "fg_po");
					queryString = queryString + ", @p_cd_i = " + tcf.getJsonValueSimple("string", jsonObject, "cd_i");
					queryString = queryString + ", @p_fg_mm090 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm090");
					queryString = queryString + ", @p_cd_spec = " + tcf.getJsonValueSimple("string", jsonObject, "cd_spec");
					queryString = queryString + ", @p_nb_size = " + tcf.getJsonValueSimple("number", jsonObject, "nb_size");
					queryString = queryString + ", @p_qt_rcv = " + tcf.getJsonValueSimple("number", jsonObject, "qt_rcv");
					queryString = queryString + ", @p_qt_rcv_spec = " + tcf.getJsonValueSimple("number", jsonObject, "qt_rcv_spec");
					queryString = queryString + ", @p_at_rv = " + tcf.getJsonValueSimple("number", jsonObject, "at_rv");
					queryString = queryString + ", @p_at_rv_vat = " + tcf.getJsonValueSimple("number", jsonObject, "at_rv_vat");
					queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
					queryString = queryString + ", @p_no_po = " + tcf.getJsonValueSimple("string", jsonObject, "no_po");
					queryString = queryString + ", @p_ln_po = " + tcf.getJsonValueSimple("string", jsonObject, "ln_po");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				}


			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("dall")) {
				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("lData")) {
					queryString = queryString + "exec usp_mm_rv_l 'd' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
					queryString = queryString + ", @p_no_rv = " + tcf.getJsonValueSimple("string", jsonObject, "no_rv");
					queryString = queryString + ", @p_ln_rv = " + tcf.getJsonValueSimple("string", jsonObject, "ln_po");
				}


				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("hData")) {
					queryString = queryString + "exec usp_mm_rv_h 'd' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "cd_c");
					queryString = queryString + ", @p_no_rv = " + tcf.getJsonValueSimple("string", jsonObject, "no_rv");
				}
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
