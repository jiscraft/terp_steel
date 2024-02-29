<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.common.util.Common" %>
<%@ page import="kr.terp.common.util.FileUtil" %>
<%@ page import="kr.terp.common.util.HtmlUtil" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.io.File" %>
<%@ page import="org.jsoup.Jsoup" %>
<%

	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	TobeCommonFunction tcf = new TobeCommonFunction();
	String resultString = "";

	try {
		JSONArray jsonArray = null;
		if (request.getParameter("sendData") != null) {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
		}

		JSONObject jsonObject = (JSONObject) jsonArray.get(0);
		String path = FileUtil.getRealPath(jsonObject.get("dc_save_path").toString());
		String fn = jsonObject.get("dc_save_name").toString();

		File f = new File(path, fn);
		if (f.exists()) {
			String html = HtmlUtil.readHtmlFile2HtmlBodyTag(fn, path);
			if (Common.isEmpty(html)) html = "<p>&nbsp;</p>";
			html = html.replaceAll("\\\\","\\\\\\\\");
			html = html.replaceAll("\"","\\\\\"");
			html = html.replaceAll("\r","");
			html = html.replaceAll("\n","");
			//System.out.println(html);
			if (Common.isEmpty(html)) {
				resultString = "{\"success\": false, \"data\": [] , \"msg\": \"저장하신 내용을 정상적으로 불러오지 못했습니다!\"}";
			}
			else {
				resultString = "{\"success\": true, \"data\": \"" + html + "\" , \"msg\": \"\"}";
			}
		}
		else {
			resultString = "{\"success\": false, \"data\": [] , \"msg\": \"내용이 저장된 HTML 파일이 존재하지 않습니다!\"}";
		}
	}
	catch (Exception e) {
		e.printStackTrace();
		resultString = "{\"success\": false, \"data\": [] , \"msg\": \"" + e.getLocalizedMessage() + "\"}";
	}
	finally {
		outResult.println(resultString);
	}

%>
