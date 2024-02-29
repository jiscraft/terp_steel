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
		JSONObject htmlSavedInfo = null;

		if ((sendData == null) || (sendData.trim().length() <= 0)) {
			isValid = false;
		}
		else {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			jsonObject = (JSONObject) jsonArray.get(0);
		}

		if (isValid) {

			// 상세정보 삭제
			JSONArray jsonDdData = (JSONArray) jsonObject.get("dd");
			if ((jsonDdData != null) && !jsonDdData.isEmpty()) {
				for (int i = 0; i < jsonDdData.size(); i++) {
					JSONObject json = (JSONObject) jsonDdData.get(i);
					queryString = "exec usp_ea_def_alnd @p_docu = 'delete' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_cd_aln = " + tcf.getJsonValueSimple("string", json, "cd_aln");
					queryString = queryString + ", @p_ln_aln = " + tcf.getJsonValueSimple("string", json, "ln_aln");
					query.add(queryString);
				}
			}

			// 헤더정보 삭제
			JSONArray jsonHdData = (JSONArray) jsonObject.get("hd");
			if ((jsonHdData != null) && !jsonHdData.isEmpty()) {
				for (int i = 0; i < jsonHdData.size(); i++) {
					JSONObject json = (JSONObject) jsonHdData.get(i);
					queryString = "exec usp_ea_def_alnh @p_docu = 'delete' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_cd_aln = " + tcf.getJsonValueSimple("string", json, "cd_aln");
					query.add(queryString);
				}
			}

			// 헤더정보 저장
			JSONArray jsonHsData = (JSONArray) jsonObject.get("hs");
			if ((jsonHsData != null) && !jsonHsData.isEmpty()) {
				for (int i = 0; i < jsonHsData.size(); i++) {
					JSONObject json = (JSONObject) jsonHsData.get(i);
					queryString = "exec usp_ea_def_alnh @p_docu = 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_cd_aln = " + tcf.getJsonValueSimple("string", json, "cd_aln");
					queryString = queryString + ", @p_nm_aln = " + tcf.getJsonValueSimple("string", json, "nm_aln");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", json, "dc_remark");
					queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", json, "yn_use");
					query.add(queryString);
				}
			}

			// 상세정보 저장
			JSONArray jsonDsData = (JSONArray) jsonObject.get("ds");
			if ((jsonDsData != null) && !jsonDsData.isEmpty()) {
				for (int i = 0; i < jsonDsData.size(); i++) {
					JSONObject json = (JSONObject) jsonDsData.get(i);
					queryString = "exec usp_ea_def_alnd @p_docu = 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_cd_aln = " + tcf.getJsonValueSimple("string", json, "cd_aln");
					queryString = queryString + ", @p_ln_aln = " + tcf.getJsonValueSimple("string", json, "ln_aln");
					queryString = queryString + ", @p_sq_apro = " + tcf.getJsonValueSimple("int", json, "sq_apro");
					queryString = queryString + ", @p_fg_ea050 = " + tcf.getJsonValueSimple("string", json, "fg_ea050");
					queryString = queryString + ", @p_id_user_apro = " + tcf.getJsonValueSimple("string", json, "id_user_apro");
					queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", json, "cd_e_apro");
					queryString = queryString + ", @p_nm_e_apro = " + tcf.getJsonValueSimple("string", json, "nm_e_apro");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", json, "dc_remark");
					queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", json, "yn_use");
					query.add(queryString);
				}
			}

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
