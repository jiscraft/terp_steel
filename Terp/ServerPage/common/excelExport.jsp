<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.common.util.ExcelUtil" %>
<%@ page import="kr.terp.common.util.FileUtil" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>

<%
	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	TobeQueryExec execQuery = new TobeQueryExec();
	TobeCommonFunction tcf = new TobeCommonFunction();
	List<String> query = new ArrayList<String>();
	String queryString = "";
	String resultString = "";
	Iterator iterator = null;

	JSONArray jsonArray = new JSONArray();
	if (request.getParameter("sendData") != null) {
		jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
	}
	if (jsonArray.size() > 0) {
		JSONObject jsonObject = (JSONObject) jsonArray.get(0);
		String userTempPath = jsonObject.get("loginCdc").toString() + "/" + jsonObject.get("loginIduser").toString();
		String virtualPath = FileUtil.getVirtualPath("export_temp/" + userTempPath, "yyMMdd", null);
		String realPath = FileUtil.getRealPath(virtualPath);
		System.out.println("virtualPath = " + virtualPath + "realPath = " + realPath);

		JSONObject jsonExcel = ExcelUtil.jsonToExcel(jsonObject, realPath);
		String path = URLEncoder.encode(realPath, "UTF-8");
		String xfn = URLEncoder.encode(jsonExcel.get("xfn").toString(), "UTF-8");
		System.out.println("jsonExcel = " + jsonExcel);
		System.out.println("path = " + path);
		System.out.println("xfn = " + xfn);

		if (((int)jsonExcel.get("success")) == 1) {
			resultString = "{ \"success\":true, \"data\":[{ \"path\":\"" + path + "\", \"fn\":\"" + xfn + "\", \"vp\":\"" + virtualPath + "\" }], \"msg\":\"정상적으로 변환하였습니다!\" }";
		}
		else {
			resultString = "{ \"success\":false, \"data\":[] , \"msg\":\"엑셀로 변환하지 못했습니다!\" }";
		}
	}
	else {
		resultString = "{ \"success\":false, \"data\":[] , \"msg\":\"엑셀로 변환할 데이터가 없습니다!\" }";
	}

	System.out.println(resultString);
	outResult.println(resultString);

%>