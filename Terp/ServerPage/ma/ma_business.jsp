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


	//    if (!request.getMethod().equalsIgnoreCase("POST")) {
	//        out.print(Common.getErrorJson("허용되지 않는 접근방식입니다!"));
	//        if (true) return;
	//    }


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

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("all")) {
				queryString = queryString + "exec usp_ma_business 'm' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_yn_use = 'Y'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_ma_business 'm' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_search = '%" + tcf.getJsonValue("string", jsonObject, "h_search") + "%'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ma_business 's' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_b = '" + tcf.getJsonValue("string", jsonObject, "cd_b") + "'";
				queryString = queryString + ", @p_nm_b = '" + tcf.getJsonValue("string", jsonObject, "nm_b") + "'";
				queryString = queryString + ", @p_no_b = '" + tcf.getJsonValue("string", jsonObject, "no_b") + "'";
				queryString = queryString + ", @p_dc_boss = '" + tcf.getJsonValue("string", jsonObject, "dc_boss") + "'";
				queryString = queryString + ", @p_yn_use = '" + tcf.getJsonValue("string", jsonObject, "yn_use") + "'";
				queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string", jsonObject, "cd_o") + "'";
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_ma_business 'delete' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_b = '" + tcf.getJsonValue("string", jsonObject, "cd_b") + "'";
			}

			query.add(queryString);

		}


		resultString = execQuery.queryExec(query, "terp", "json");


	}
	catch (Exception e) {
		e.printStackTrace();
		resultString = "{\"success\":false, \"data\":[] , \"msg\":\"" + e.getLocalizedMessage() + "\"}";
	}
	finally {
		outResult.println(resultString);
	}

%>
