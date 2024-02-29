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

		JSONObject jsonDocData = null;
		JSONArray jsonAproData = null;
		JSONArray jsonAttachData = null;
		JSONObject jsonErpData = null;
		JSONArray jsonRefData = null;

		if ((sendData == null) || (sendData.trim().length() <= 0)) {
			isValid = false;
		}
		else {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			jsonObject = (JSONObject) jsonArray.get(0);
		}

		if (isValid) {
			// 기안문서정보
			jsonDocData = (JSONObject) jsonObject.get("docData");
			if ((jsonDocData == null) || jsonDocData.isEmpty()) {
				isValid = false;
			}
		}

		if (isValid) {

			// 기존 기안문서정보 삭제
			queryString = "exec usp_ea_doc @p_docu = 'delete' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_doc");
			query.add(queryString);

			// 기존 결재라인정보 삭제
			queryString = "exec usp_ea_doc_apro @p_docu = 'delete' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_doc");
			query.add(queryString);

			// 기존 첨부파일정보 삭제
			queryString = "exec usp_sy_files @p_docu = 'eadel' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_id_row_src = " + tcf.getJsonValueSimple("string", jsonDocData, "id_row");
			query.add(queryString);

			// 기존 ERP연동정보 삭제
			queryString = "exec usp_ea_doc_erp @p_docu = 'eadel' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_doc");
			query.add(queryString);

			// 기존 관련문서정보 삭제
			queryString = "exec usp_ea_doc_ref @p_docu = 'delete' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_doc");
			query.add(queryString);





			// 결재라인정보 추가
			jsonAproData = (JSONArray) jsonObject.get("aproData");
			if ((jsonAproData != null) && !jsonAproData.isEmpty()) {
				for (int i = 0; i < jsonAproData.size(); i++) {
					JSONObject json = (JSONObject) jsonAproData.get(i);
					queryString = "exec usp_ea_doc_apro @p_docu = 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_doc");
					queryString = queryString + ", @p_ln_apro = " + tcf.getJsonValueSimple("string", json, "ln_apro");
					queryString = queryString + ", @p_sq_apro = " + tcf.getJsonValueSimple("int", json, "sq_apro");
					queryString = queryString + ", @p_fg_ea050 = " + tcf.getJsonValueSimple("string", json, "fg_ea050");
					queryString = queryString + ", @p_fg_ea002 = " + tcf.getJsonValueSimple("string", json, "fg_ea002");
					queryString = queryString + ", @p_dc_apro = " + tcf.getJsonValueSimple("string", json, "dc_apro");
					queryString = queryString + ", @p_dt_apro = " + tcf.getJsonValueSimple("string", json, "dt_apro");
					queryString = queryString + ", @p_id_user_apro = " + tcf.getJsonValueSimple("string", json, "id_user_apro");
					queryString = queryString + ", @p_cd_e_apro = " + tcf.getJsonValueSimple("string", json, "cd_e_apro");
					queryString = queryString + ", @p_nm_e_apro = " + tcf.getJsonValueSimple("string", json, "nm_e_apro");
					queryString = queryString + ", @p_cd_o_apro = " + tcf.getJsonValueSimple("string", json, "cd_o_apro");
					queryString = queryString + ", @p_nm_o_apro = " + tcf.getJsonValueSimple("string", json, "nm_o_apro");
					queryString = queryString + ", @p_fg_hr010_apro = " + tcf.getJsonValueSimple("string", json, "fg_hr010_apro");
					queryString = queryString + ", @p_nm_hr010_apro = " + tcf.getJsonValueSimple("string", json, "nm_hr010_apro");
					queryString = queryString + ", @p_fg_hr020_apro = " + tcf.getJsonValueSimple("string", json, "fg_hr020_apro");
					queryString = queryString + ", @p_nm_hr020_apro = " + tcf.getJsonValueSimple("string", json, "nm_hr020_apro");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", json, "dc_remark");
					queryString = queryString + ", @p_yn_chk = " + tcf.getJsonValueSimple("string", json, "yn_chk");
					query.add(queryString);
				}
			}

			// 기안문서정보 추가
			queryString = "exec usp_ea_doc @p_docu = 's' ";
			queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_doc");
			queryString = queryString + ", @p_fg_ea001 = " + tcf.getJsonValueSimple("string", jsonDocData, "fg_ea001");
			queryString = queryString + ", @p_dt_doc = " + tcf.getJsonValueSimple("string", jsonDocData, "dt_doc");
			queryString = queryString + ", @p_dc_title = " + tcf.getJsonValueSimple("string", jsonDocData, "dc_title");
			queryString = queryString + ", @p_am_doc = " + tcf.getJsonValueSimple("number", jsonDocData, "am_doc");
			queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_site");
			queryString = queryString + ", @p_fg_ea010 = " + tcf.getJsonValueSimple("string", jsonDocData, "fg_ea010");
			queryString = queryString + ", @p_fg_ea020 = " + tcf.getJsonValueSimple("string", jsonDocData, "fg_ea020");
			queryString = queryString + ", @p_fg_ea030 = " + tcf.getJsonValueSimple("string", jsonDocData, "fg_ea030");
			queryString = queryString + ", @p_fg_ea040 = " + tcf.getJsonValueSimple("string", jsonDocData, "fg_ea040");
			queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_e");
			queryString = queryString + ", @p_nm_e = " + tcf.getJsonValueSimple("string", jsonDocData, "nm_e");
			queryString = queryString + ", @p_cd_o = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_o");
			queryString = queryString + ", @p_nm_o = " + tcf.getJsonValueSimple("string", jsonDocData, "nm_o");
			queryString = queryString + ", @p_fg_hr010 = " + tcf.getJsonValueSimple("string", jsonDocData, "fg_hr010");
			queryString = queryString + ", @p_nm_hr010 = " + tcf.getJsonValueSimple("string", jsonDocData, "nm_hr010");
			queryString = queryString + ", @p_fg_hr020 = " + tcf.getJsonValueSimple("string", jsonDocData, "fg_hr020");
			queryString = queryString + ", @p_nm_hr020 = " + tcf.getJsonValueSimple("string", jsonDocData, "nm_hr020");
			queryString = queryString + ", @p_fg_prior = " + tcf.getJsonValueSimple("string", jsonDocData, "fg_prior");
			queryString = queryString + ", @p_yn_erp = " + tcf.getJsonValueSimple("string", jsonDocData, "yn_erp");
			queryString = queryString + ", @p_yn_re = " + tcf.getJsonValueSimple("string", jsonDocData, "yn_re");
			queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonDocData, "dc_remark");
			queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonDocData, "id_row");
			queryString = queryString + ", @p_yn_add = " + tcf.getJsonValueSimple("string", jsonDocData, "yn_add");
			queryString = queryString + ", @p_yn_single = " + tcf.getJsonValueSimple("string", jsonDocData, "yn_single");
			queryString = queryString + ", @p_yn_safe = " + tcf.getJsonValueSimple("string", jsonDocData, "yn_safe");
			query.add(queryString);



			// 첨부파일정보 추가
			jsonAttachData = (JSONArray) jsonObject.get("attachData");
			if ((jsonAttachData != null) && !jsonAttachData.isEmpty()) {
				for (int i = 0; i < jsonAttachData.size(); i++) {
					JSONObject json = (JSONObject) jsonAttachData.get(i);
					queryString = "exec usp_sy_files @p_docu = 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_no_af = " + tcf.getJsonValueSimple("string", json, "no_af");
					queryString = queryString + ", @p_id_row_src = " + tcf.getJsonValueSimple("string", json, "id_row_src");
					queryString = queryString + ", @p_fg_sy210 = " + tcf.getJsonValueSimple("string", json, "fg_sy210");
					queryString = queryString + ", @p_fg_sy210_ll = " + tcf.getJsonValueSimple("string", json, "fg_sy210_ll");
					queryString = queryString + ", @p_dc_save_path = " + tcf.getJsonValueSimple("string", json, "dc_save_path");
					queryString = queryString + ", @p_dc_src_name = " + tcf.getJsonValueSimple("string", json, "dc_src_name");
					queryString = queryString + ", @p_dc_src_mime = " + tcf.getJsonValueSimple("string", json, "dc_src_mime");
					queryString = queryString + ", @p_dc_src_size = " + tcf.getJsonValueSimple("number", json, "dc_src_size");
					queryString = queryString + ", @p_dc_key1 = " + tcf.getJsonValueSimple("string", json, "dc_key1");
					queryString = queryString + ", @p_dc_key2 = " + tcf.getJsonValueSimple("string", json, "dc_key2");
					queryString = queryString + ", @p_dc_key3 = " + tcf.getJsonValueSimple("string", json, "dc_key3");
					queryString = queryString + ", @p_dc_key4 = " + tcf.getJsonValueSimple("string", json, "dc_key4");
					queryString = queryString + ", @p_dc_key5 = " + tcf.getJsonValueSimple("string", json, "dc_key5");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", json, "dc_remark");
					queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", json, "yn_use");
					query.add(queryString);
				}
			}

			// ERP연동정보 추가
			jsonErpData = (JSONObject) jsonObject.get("erpData");
			if ((jsonErpData != null) && !jsonErpData.isEmpty()) {
				queryString = "exec usp_ea_doc_erp @p_docu = 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_doc");
				queryString = queryString + ", @p_id_row_erp = " + tcf.getJsonValueSimple("string", jsonErpData, "id_row_erp");
				queryString = queryString + ", @p_fg_ea040 = " + tcf.getJsonValueSimple("string", jsonErpData, "fg_ea040");
				queryString = queryString + ", @p_dc_key1 = " + tcf.getJsonValueSimple("string", jsonErpData, "dc_key1");
				queryString = queryString + ", @p_dc_key2 = " + tcf.getJsonValueSimple("string", jsonErpData, "dc_key2");
				queryString = queryString + ", @p_dc_key3 = " + tcf.getJsonValueSimple("string", jsonErpData, "dc_key3");
				query.add(queryString);
			}

			// 관련문서정보 추가
			jsonRefData = (JSONArray) jsonObject.get("refData");
			if ((jsonRefData != null) && !jsonRefData.isEmpty()) {
				for (int i = 0; i < jsonRefData.size(); i++) {
					JSONObject json = (JSONObject) jsonRefData.get(i);
					queryString = "exec usp_ea_doc_ref @p_docu = 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_cd_doc = " + tcf.getJsonValueSimple("string", jsonDocData, "cd_doc");
					queryString = queryString + ", @p_cd_doc_ref = " + tcf.getJsonValueSimple("string", json, "cd_doc_ref");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", json, "dc_remark");
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
