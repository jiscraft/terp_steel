<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="kr.terp.TobeCommonFunction" %>


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

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("select")) {
				queryString = queryString + "exec usp_ma_emp 'select' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
				queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string", jsonObject, "cd_o") + "'";
				queryString = queryString + ", @p_yn_in = '" + tcf.getJsonValue("string", jsonObject, "yn_in") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_ma_emp 'm' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
				queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string", jsonObject, "cd_o") + "'";
				queryString = queryString + ", @p_fg_workstatus = '" + tcf.getJsonValue("string", jsonObject, "fg_workstatus") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("r")) {
				queryString = queryString + "exec usp_ma_emp 'r' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_ma_emp 'd' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("erpt")) {
				queryString = queryString + "exec usp_ma_emp 'erpt' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_dt_apply = '" + tcf.getJsonValue("string", jsonObject, "dt_base") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("orpt")) {
				queryString = queryString + "exec usp_ma_emp 'orpt' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_dt_apply = '" + tcf.getJsonValue("string", jsonObject, "dt_base") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("help")) {
				queryString = queryString + "exec usp_ma_emp 'help' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_search = '%" + tcf.getJsonValue("string", jsonObject, "p_search") + "%'";
				queryString = queryString + ", @p_yn_in = '" + tcf.getJsonValue("string", jsonObject, "yn_in") + "'";
				queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string", jsonObject, "cd_o") + "'";
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("ea")) {
				queryString = queryString + "exec usp_ma_emp 'ea' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string", jsonObject, "cd_o") + "'";
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("sd")) {
				queryString = queryString + "exec usp_ma_emp 'sd' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string", jsonObject, "cd_o") + "'";
				queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("sel")) {
				queryString = queryString + "exec usp_ma_emp 'sel' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
				queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string", jsonObject, "cd_o") + "'";
			}



			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ma_emp 's' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
				queryString = queryString + ", @p_nm_e = '" + tcf.getJsonValue("string", jsonObject, "nm_e") + "'";
				queryString = queryString + ", @p_nm_e_eng = '" + tcf.getJsonValue("string", jsonObject, "nm_e_eng") + "'";
				queryString = queryString + ", @p_no_e = '" + tcf.getJsonValue("string", jsonObject, "no_e") + "'";
				queryString = queryString + ", @p_dc_addr = '" + tcf.getJsonValue("string", jsonObject, "dc_addr") + "'";
				queryString = queryString + ", @p_dc_tel = '" + tcf.getJsonValue("string", jsonObject, "dc_tel") + "'";
				queryString = queryString + ", @p_dc_hp = '" + tcf.getJsonValue("string", jsonObject, "dc_hp") + "'";
				queryString = queryString + ", @p_dc_companymail = '" + tcf.getJsonValue("string", jsonObject, "dc_companymail") + "'";
				queryString = queryString + ", @p_dc_companytel = '" + tcf.getJsonValue("string", jsonObject, "dc_companytel") + "'";
				queryString = queryString + ", @p_dc_personalmail = '" + tcf.getJsonValue("string", jsonObject, "dc_personalmail") + "'";
				queryString = queryString + ", @p_dt_birth = '" + tcf.getJsonValue("string", jsonObject, "dt_birth") + "'";
				queryString = queryString + ", @p_fg_sex = '" + tcf.getJsonValue("string", jsonObject, "fg_sex") + "'";
				queryString = queryString + ", @p_fg_sy010 = '" + tcf.getJsonValue("string", jsonObject, "fg_sy010") + "'";

			}
			//
			//
			if ( tcf.getJsonValue("string" , jsonObject , "actiondata" ).toString().equals("sall")) {
				if ( tcf.getJsonValue("string" , jsonObject , "detailactiondata" ).toString().equals("ldata")) {
					queryString = queryString + "exec usp_ma_emp_history 's' ";
					queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string" , jsonObject , "loginIduser" ) + "'";
					queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string" , jsonObject , "loginCdc" ) + "'";
					queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string" , jsonObject , "cd_e" ) + "'";
					queryString = queryString + ", @p_dt_apply = '" + tcf.getJsonValue("string" , jsonObject , "dt_apply" ) + "'";
					queryString = queryString + ", @p_fg_hr030 = '" + tcf.getJsonValue("string" , jsonObject , "fg_hr030" ) + "'";
					queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string" , jsonObject , "cd_o" ) + "'";
					queryString = queryString + ", @p_cd_b = '" + tcf.getJsonValue("string" , jsonObject , "cd_b" ) + "'";
					queryString = queryString + ", @p_fg_hr010 = '" + tcf.getJsonValue("string" , jsonObject , "fg_hr010" ) + "'";
					queryString = queryString + ", @p_fg_hr020 = '" + tcf.getJsonValue("string" , jsonObject , "fg_hr020" ) + "'";
					queryString = queryString + ", @p_yn_boss = '" + tcf.getJsonValue("string" , jsonObject , "yn_boss" ) + "'";
					queryString = queryString + ", @p_dc_remark = '" + tcf.getJsonValue("string" , jsonObject , "dc_remark" ) + "'";
				}

				if ( tcf.getJsonValue("string" , jsonObject , "detailactiondata" ).toString().equals("hdata")) {
					queryString = queryString + "exec usp_ma_emp 's' ";
					queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
					queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
					queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
					queryString = queryString + ", @p_nm_e = '" + tcf.getJsonValue("string", jsonObject, "nm_e") + "'";
					queryString = queryString + ", @p_nm_e_eng = '" + tcf.getJsonValue("string", jsonObject, "nm_e_eng") + "'";
					queryString = queryString + ", @p_no_e = '" + tcf.getJsonValue("string", jsonObject, "no_e") + "'";
					queryString = queryString + ", @p_dc_addr = '" + tcf.getJsonValue("string", jsonObject, "dc_addr") + "'";
					queryString = queryString + ", @p_dc_tel = '" + tcf.getJsonValue("string", jsonObject, "dc_tel") + "'";
					queryString = queryString + ", @p_dc_hp = '" + tcf.getJsonValue("string", jsonObject, "dc_hp") + "'";
					queryString = queryString + ", @p_dc_companymail = '" + tcf.getJsonValue("string", jsonObject, "dc_companymail") + "'";
					queryString = queryString + ", @p_dc_companytel = '" + tcf.getJsonValue("string", jsonObject, "dc_companytel") + "'";
					queryString = queryString + ", @p_dc_personalmail = '" + tcf.getJsonValue("string", jsonObject, "dc_personalmail") + "'";
					queryString = queryString + ", @p_dt_birth = '" + tcf.getJsonValue("string", jsonObject, "dt_birth") + "'";
					queryString = queryString + ", @p_fg_sex = '" + tcf.getJsonValue("string", jsonObject, "fg_sex") + "'";
					queryString = queryString + ", @p_fg_sy010 = '" + tcf.getJsonValue("string", jsonObject, "fg_sy010") + "'";
				}

			}

			query.add(queryString);

		}

		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (Exception e) {
		System.out.println(e);
		e.printStackTrace();
	}
	finally {
		outResult.println(resultString);
	}

%>
