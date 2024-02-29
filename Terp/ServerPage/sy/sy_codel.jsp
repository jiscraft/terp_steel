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

//			if (sessionCheck.isNew() || !ts.isUsing(tcf.getJsonValue("string", jsonObject, "loginIduser").toString())) {
//				strErrorMessage = "다른 시스템에서 로그인했거나 사용시간이 초과되어 서버와 연결이 끊어졌습니다";
//				throw new Exception();
//			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("all")) {
				queryString = queryString + "exec usp_sy_codel 'all' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_sy_codel 'm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_codeh = " + tcf.getJsonValueSimple("string", jsonObject, "cd_codeh");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_sy_codel 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_codeh = " + tcf.getJsonValueSimple("string", jsonObject, "cd_codeh");
				queryString = queryString + ", @p_cd_codel = " + tcf.getJsonValueSimple("string", jsonObject, "cd_codel");
				queryString = queryString + ", @p_nm_codel = " + tcf.getJsonValueSimple("string", jsonObject, "nm_codel");
				queryString = queryString + ", @p_dc_codel = " + tcf.getJsonValueSimple("string", jsonObject, "dc_codel");
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");
				queryString = queryString + ", @p_sq_index = " + tcf.getJsonValueSimple("string", jsonObject, "sq_index");
				queryString = queryString + ", @p_dc_codel1 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_codel1");
				queryString = queryString + ", @p_dc_codel2 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_codel2");
				queryString = queryString + ", @p_dc_codel3 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_codel3");
				queryString = queryString + ", @p_yn_edit = " + tcf.getJsonValueSimple("string", jsonObject, "yn_edit");
				queryString = queryString + ", @p_fg_codel = " + tcf.getJsonValueSimple("string", jsonObject, "fg_codel");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_sy_codel 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_codeh = " + tcf.getJsonValueSimple("string", jsonObject, "cd_codeh");
				queryString = queryString + ", @p_cd_codel = " + tcf.getJsonValueSimple("string", jsonObject, "cd_codel");
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
