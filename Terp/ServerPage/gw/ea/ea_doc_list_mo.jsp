<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.common.util.FileUtil" %>
<%@ page import="kr.terp.common.util.HtmlUtil" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="kr.terp.common.util.Common" %>
<%

	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	TobeQueryExec execQuery = new TobeQueryExec();
	TobeCommonFunction tcf = new TobeCommonFunction();
	List<String> query = new ArrayList<String>();
	String queryString = "";
	String resultString = "";
	Iterator iterator = null;

	try {

		String pageParamStr = request.getParameter("page");
		String startParamStr = request.getParameter("start");
		String limitParamStr = request.getParameter("limit");

		int pageParam = Common.isEmpty(pageParamStr) ? 1 : Integer.parseInt(pageParamStr);
		int startParam = Common.isEmpty(startParamStr) ? 0 : Integer.parseInt(startParamStr);
		int limitParam = Common.isEmpty(limitParamStr) ? 25 : Integer.parseInt(limitParamStr);

		boolean isValid = true;
		String sendData = request.getParameter("sendData");
		JSONArray jsonArray = null;
		JSONObject jsonObject = null;

		if ((sendData == null) || (sendData.trim().length() <= 0)) {
			isValid = false;
		}
		else {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			jsonObject = (JSONObject) jsonArray.get(0);
		}
		if (isValid) {
			queryString = "exec usp_ea_doc_list_mo @p_docu = " + tcf.getJsonValueSimple("string", jsonObject, "actiondata");
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_apro");
			queryString = queryString + ", @p_yn_apro300 = " + tcf.getJsonValueSimple("string", jsonObject, "yn_apro300");
			queryString = queryString + ", @p_yn_apro900 = " + tcf.getJsonValueSimple("string", jsonObject, "yn_apro900");
			queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "search");
			queryString = queryString + ", @p_page = " + tcf.getJsonValueSimple("number", jsonObject, "page");
//			queryString = queryString + ", @p_page = " + pageParam;
//			queryString = queryString + ", @p_start = " + startParam;
//			queryString = queryString + ", @p_limit = " + limitParam;
			query.add(queryString);
		}
		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (Exception e) {
		e.printStackTrace();
		resultString = "{\"success\": false, \"data\": [] , \"msg\": \"" + e.getLocalizedMessage() + "\"}";
	}
	finally {
		outResult.println(resultString);
	}

%>
