<%--
현장시공등록 20160705 jiscraft
--%>


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
	HttpSession sessionCheck = request.getSession();

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


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_sy_excellimport 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_import = " + tcf.getJsonValueSimple("string", jsonObject, "no_import");
				queryString = queryString + ", @p_dc_a = " + tcf.getJsonValueSimple("string", jsonObject, "dc_a");
				queryString = queryString + ", @p_dc_b = " + tcf.getJsonValueSimple("string", jsonObject, "dc_b");
				queryString = queryString + ", @p_dc_c = " + tcf.getJsonValueSimple("string", jsonObject, "dc_c");
				queryString = queryString + ", @p_dc_d = " + tcf.getJsonValueSimple("string", jsonObject, "dc_d");
				queryString = queryString + ", @p_dc_e = " + tcf.getJsonValueSimple("string", jsonObject, "dc_e");
				queryString = queryString + ", @p_dc_f = " + tcf.getJsonValueSimple("string", jsonObject, "dc_f");
				queryString = queryString + ", @p_dc_g = " + tcf.getJsonValueSimple("string", jsonObject, "dc_g");
				queryString = queryString + ", @p_dc_h = " + tcf.getJsonValueSimple("string", jsonObject, "dc_h");
				queryString = queryString + ", @p_dc_i = " + tcf.getJsonValueSimple("string", jsonObject, "dc_i");
				queryString = queryString + ", @p_dc_j = " + tcf.getJsonValueSimple("string", jsonObject, "dc_j");
				queryString = queryString + ", @p_dc_k = " + tcf.getJsonValueSimple("string", jsonObject, "dc_k");
				queryString = queryString + ", @p_dc_l = " + tcf.getJsonValueSimple("string", jsonObject, "dc_l");
				queryString = queryString + ", @p_dc_m = " + tcf.getJsonValueSimple("string", jsonObject, "dc_m");
				queryString = queryString + ", @p_dc_n = " + tcf.getJsonValueSimple("string", jsonObject, "dc_n");
				queryString = queryString + ", @p_dc_o = " + tcf.getJsonValueSimple("string", jsonObject, "dc_o");
				queryString = queryString + ", @p_dc_p = " + tcf.getJsonValueSimple("string", jsonObject, "dc_p");
				queryString = queryString + ", @p_dc_q = " + tcf.getJsonValueSimple("string", jsonObject, "dc_q");
				queryString = queryString + ", @p_dc_r = " + tcf.getJsonValueSimple("string", jsonObject, "dc_r");
				queryString = queryString + ", @p_dc_s = " + tcf.getJsonValueSimple("string", jsonObject, "dc_s");
				queryString = queryString + ", @p_dc_t = " + tcf.getJsonValueSimple("string", jsonObject, "dc_t");
				queryString = queryString + ", @p_dc_u = " + tcf.getJsonValueSimple("string", jsonObject, "dc_u");
				queryString = queryString + ", @p_dc_v = " + tcf.getJsonValueSimple("string", jsonObject, "dc_v");
				queryString = queryString + ", @p_dc_w = " + tcf.getJsonValueSimple("string", jsonObject, "dc_w");
				queryString = queryString + ", @p_dc_x = " + tcf.getJsonValueSimple("string", jsonObject, "dc_x");
				queryString = queryString + ", @p_dc_y = " + tcf.getJsonValueSimple("string", jsonObject, "dc_y");
				queryString = queryString + ", @p_dc_z = " + tcf.getJsonValueSimple("string", jsonObject, "dc_z");
			}



			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("as")) {
				queryString = queryString + "exec usp_sy_excellimport 'as' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_import = " + tcf.getJsonValueSimple("string", jsonObject, "no_import");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("budget")) {
				queryString = queryString + "exec usp_sy_excellimport 'budget' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_import = " + tcf.getJsonValueSimple("string", jsonObject, "no_import");
			}



			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("mmb")) {
				queryString = queryString + "exec usp_sy_excellimport 'mmb' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_import = " + tcf.getJsonValueSimple("string", jsonObject, "no_import");

			}
			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("mmc")) {
				queryString = queryString + "exec terp.usp_sy_excellimport 'mmc' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_import = " + tcf.getJsonValueSimple("string", jsonObject, "no_import");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}
			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("mmd")) {
				queryString = queryString + "exec terp.usp_sy_excellimport 'mmd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_import = " + tcf.getJsonValueSimple("string", jsonObject, "no_import");
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
