<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
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

		JSONArray jsonArray;

		if (request.getParameter("sendData") != null) {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			iterator = jsonArray.iterator();
			int iteCount = 0;
		}

		while (iterator.hasNext()) {
			JSONObject jsonObject = (JSONObject) iterator.next();
			queryString = "";

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 'm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
				queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "p_search");

			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("mainboardm")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 'mainboardm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("mainboardm")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 'mainboardm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("mainboardminfo")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 'mainboardminfo' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("cntmainboard")) {
				queryString = queryString + "exec usp_bb_ntc  @p_docu = 'cntmainboard' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("mainboard")) {
				queryString = queryString + "exec usp_bb_boarddisp @p_docu = 'mainboard' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
			}

//			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("mainboardi")) {
//				queryString = queryString + "exec usp_bb_boarddisp_1 @p_docu = 'mainboardi' ";
//				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
//				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
//				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
//				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
//				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
//			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("r")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 'r' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_ntc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_ntc");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("home")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 'home' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_ntc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_ntc");
				queryString = queryString + ", @p_dc_title = " + tcf.getJsonValueSimple("string", jsonObject, "dc_title");
				queryString = queryString + ", @p_dc_cont_sch = " + tcf.getJsonValueSimple("string", jsonObject, "dc_cont_sch");
				queryString = queryString + ", @p_fg_target = " + tcf.getJsonValueSimple("string", jsonObject, "fg_target");
//				queryString = queryString + ", @p_yn_cmt = " + tcf.getJsonValueSimple("string", jsonObject, "yn_cmt");

				queryString = queryString + ", @p_yn_up= " + tcf.getJsonValueSimple("string", jsonObject, "yn_up");
				queryString = queryString + ", @p_dt_gs= " + tcf.getJsonValueSimple("string", jsonObject, "dt_gs");

				queryString = queryString + ", @p_cd_ntc_p= " + tcf.getJsonValueSimple("string", jsonObject, "cd_ntc_p");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_ntc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_ntc");
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("read")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 'read' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_ntc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_ntc");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("rusr")) {
				queryString = queryString + "exec usp_bb_ntc @p_docu = 'rusr' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_ntc = " + tcf.getJsonValueSimple("string", jsonObject, "cd_ntc");
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
