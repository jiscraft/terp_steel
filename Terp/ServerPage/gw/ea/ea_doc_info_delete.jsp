<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.common.util.Common" %>
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

			// 기존 기안문서정보 삭제
			queryString = "exec usp_ea_doc @p_docu = 'delete' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
			query.add(queryString);

			// 기존 결재라인정보 삭제
			queryString = "exec usp_ea_doc_apro @p_docu = 'delete' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
			query.add(queryString);

			// 기존 첨부파일정보 삭제
			queryString = "exec usp_sy_files @p_docu = 'eadel' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_id_row_src = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
			query.add(queryString);

			// 기존 ERP연동정보 삭제
			queryString = "exec usp_ea_doc_erp @p_docu = 'eadel' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
			query.add(queryString);

			// 기존 관련문서정보 삭제
			queryString = "exec usp_ea_doc_ref @p_docu = 'delete' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_doc");
			query.add(queryString);

			resultString = execQuery.queryExec(query, "terp", "json");
		}
		else {
			resultString = "{\"success\": false, \"data\": [] , \"msg\": \"데이터를 정상적으로 처리하지 못하였습니다!\"}";
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
