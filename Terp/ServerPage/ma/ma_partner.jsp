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


//			if (sessionCheck.isNew() || !ts.isUsing(tcf.getJsonValueSimple("object", jsonObject, "loginIduser").toString())) {
//				strErrorMessage = "다른 시스템에서 로그인했거나 사용시간이 초과되어 서버와 연결이 끊어졌습니다(s)";
//				throw new Exception();
//			}



			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("select")) {
				queryString = queryString + "exec usp_ma_partner 'select' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("all")) {
				queryString = queryString + "exec usp_ma_partner 'all' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_ma_partner 'm' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_search = '%" + tcf.getJsonValue("string", jsonObject, "h_search") + "%'";
				queryString = queryString + ", @p_fg_p = '" + tcf.getJsonValue("string", jsonObject, "fg_p") + "'";
				queryString = queryString + ", @p_yn_use = '" + tcf.getJsonValue("string", jsonObject, "yn_use") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("r")) {
				queryString = queryString + "exec usp_ma_partner 'r' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
			}



			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("sel")) {
				queryString = queryString + "exec usp_ma_partner 'm' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
				queryString = queryString + ", @p_fg_p = '" + tcf.getJsonValue("string", jsonObject, "fg_p") + "'";
				queryString = queryString + ", @p_fg_cowork = '" + tcf.getJsonValue("string", jsonObject, "fg_cowork") + "'";
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("help")) {
				queryString = queryString + "exec usp_ma_partner 'help' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_search = '%" + tcf.getJsonValue("string", jsonObject, "h_search") + "%'";
				queryString = queryString + ", @p_fg_p = '" + tcf.getJsonValue("string", jsonObject, "fg_p") + "'";
				queryString = queryString + ", @p_yn_use = '" + tcf.getJsonValue("string", jsonObject, "yn_use") + "'";
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("info")) {
				queryString = queryString + "exec usp_ma_partner 'info' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("de")) {
				queryString = queryString + "exec usp_ma_partner 'de' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_p = '" +  tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("us")) {
				queryString = queryString + "exec usp_ma_partner 'us' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_search = '" + tcf.getJsonValue("string", jsonObject, "h_search") + "'";
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ma_partner 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser") ;
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc") ;
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p") ;
				queryString = queryString + ", @p_nm_p = " + tcf.getJsonValueSimple("string", jsonObject, "nm_p") ;
				queryString = queryString + ", @p_nm_p_resister = " + tcf.getJsonValueSimple("string", jsonObject, "nm_p_resister") ;
				queryString = queryString + ", @p_dc_boss = " + tcf.getJsonValueSimple("string", jsonObject, "dc_boss") ;
				queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use") ;
				queryString = queryString + ", @p_cd_o_encharge = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o_encharge") ;
				queryString = queryString + ", @p_cd_e_encharge = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_encharge") ;
				queryString = queryString + ", @p_cd_p_parent = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p_parent") ;
				queryString = queryString + ", @p_dc_ut = " + tcf.getJsonValueSimple("string", jsonObject, "dc_ut") ;
				queryString = queryString + ", @p_dc_jm = " + tcf.getJsonValueSimple("string", jsonObject, "dc_jm") ;
				queryString = queryString + ", @p_dc_etc = " + tcf.getJsonValueSimple("string", jsonObject, "dc_etc") ;
				queryString = queryString + ", @p_fg_p = " + tcf.getJsonValueSimple("string", jsonObject, "fg_p") ;
				queryString = queryString + ", @p_no_p = " + tcf.getJsonValueSimple("string", jsonObject, "no_p") ;
				queryString = queryString + ", @p_no_c = " + tcf.getJsonValueSimple("string", jsonObject, "no_c") ;
				queryString = queryString + ", @p_fg_cowork = " + tcf.getJsonValueSimple("string", jsonObject, "fg_cowork") ;
				queryString = queryString + ", @p_dc_addr = " + tcf.getJsonValueSimple("string", jsonObject, "dc_addr") ;
				queryString = queryString + ", @p_dc_zip = " + tcf.getJsonValueSimple("string", jsonObject, "dc_zip") ;
				queryString = queryString + ", @p_dc_tel = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel") ;
				queryString = queryString + ", @p_dc_fax = " + tcf.getJsonValueSimple("string", jsonObject, "dc_fax") ;
				queryString = queryString + ", @p_yn_jeonja = " + tcf.getJsonValueSimple("string", jsonObject, "yn_jeonja") ;
				queryString = queryString + ", @p_fg_fi010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_fi010") ;
				queryString = queryString + ", @p_dc_bank_account = " + tcf.getJsonValueSimple("string", jsonObject, "dc_bank_account") ;
				queryString = queryString + ", @p_dc_bank_owner = " + tcf.getJsonValueSimple("string", jsonObject, "dc_bank_owner") ;
				queryString = queryString + ", @p_dc_bank_etc = " + tcf.getJsonValueSimple("string", jsonObject, "dc_bank_etc") ;
				queryString = queryString + ", @p_dc_initial = " + tcf.getJsonValueSimple("string", jsonObject, "dc_initial") ;
				queryString = queryString + ", @p_yn_pool = " + tcf.getJsonValueSimple("string", jsonObject, "yn_pool") ;
				queryString = queryString + ", @p_dcItem = " + tcf.getJsonValueSimple("string", jsonObject, "dcItem") ;


			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_ma_partner 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser") ;
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc") ;
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p") ;
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sall")) {
				if (tcf.getJsonValueSimple("object", jsonObject, "detailactiondata").toString().equals("fdata")) {
					queryString = queryString + "exec usp_ma_partner 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser") ;
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc") ;
					queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p") ;
					queryString = queryString + ", @p_nm_p = " + tcf.getJsonValueSimple("string", jsonObject, "nm_p") ;
					queryString = queryString + ", @p_nm_p_resister = " + tcf.getJsonValueSimple("string", jsonObject, "nm_p_resister") ;
					queryString = queryString + ", @p_dc_boss = " + tcf.getJsonValueSimple("string", jsonObject, "dc_boss") ;
					queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use") ;
					queryString = queryString + ", @p_cd_o_encharge = " + tcf.getJsonValueSimple("string", jsonObject, "cd_o_encharge") ;
					queryString = queryString + ", @p_cd_e_encharge = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e_encharge") ;
					queryString = queryString + ", @p_cd_p_parent = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p_parent") ;
					queryString = queryString + ", @p_dc_ut = " + tcf.getJsonValueSimple("string", jsonObject, "dc_ut") ;
					queryString = queryString + ", @p_dc_jm = " + tcf.getJsonValueSimple("string", jsonObject, "dc_jm") ;
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark") ;
					queryString = queryString + ", @p_fg_p = " + tcf.getJsonValueSimple("string", jsonObject, "fg_p") ;
					queryString = queryString + ", @p_no_p = " + tcf.getJsonValueSimple("string", jsonObject, "no_p") ;

					queryString = queryString + ", @p_fg_cowork = " + tcf.getJsonValueSimple("string", jsonObject, "fg_cowork") ;
					queryString = queryString + ", @p_dc_addr = " + tcf.getJsonValueSimple("string", jsonObject, "dc_addr") ;
					queryString = queryString + ", @p_dc_zip = " + tcf.getJsonValueSimple("string", jsonObject, "dc_zip") ;
					queryString = queryString + ", @p_dc_tel = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel") ;
					queryString = queryString + ", @p_dc_fax = " + tcf.getJsonValueSimple("string", jsonObject, "dc_fax") ;
					queryString = queryString + ", @p_yn_jeonja = " + tcf.getJsonValueSimple("string", jsonObject, "yn_jeonja") ;
					queryString = queryString + ", @p_fg_fi010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_fi010") ;
					queryString = queryString + ", @p_dc_bank_account = " + tcf.getJsonValueSimple("string", jsonObject, "dc_bank_account") ;
					queryString = queryString + ", @p_dc_bank_owner = " + tcf.getJsonValueSimple("string", jsonObject, "dc_bank_owner") ;
					queryString = queryString + ", @p_dc_bank_etc = " + tcf.getJsonValueSimple("string", jsonObject, "dc_bank_etc") ;
					queryString = queryString + ", @p_dc_initial = " + tcf.getJsonValueSimple("string", jsonObject, "dc_initial") ;
					queryString = queryString + ", @p_yn_pool = " + tcf.getJsonValueSimple("string", jsonObject, "yn_pool") ;

				}


				if (tcf.getJsonValueSimple("object", jsonObject, "detailactiondata").toString().equals("edata")) {
					queryString = queryString + "exec usp_ma_contact 's' ";
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_no_contact = " + tcf.getJsonValueSimple("string", jsonObject, "no_contact");
					queryString = queryString + ", @p_dc_name = " + tcf.getJsonValueSimple("string", jsonObject, "dc_name");
					queryString = queryString + ", @p_dc_jc = " + tcf.getJsonValueSimple("string", jsonObject, "dc_jc");
					queryString = queryString + ", @p_dc_role = " + tcf.getJsonValueSimple("string", jsonObject, "dc_role");
					queryString = queryString + ", @p_dc_tel1 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel1");
					queryString = queryString + ", @p_dc_tel2 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel2");
					queryString = queryString + ", @p_dc_mail = " + tcf.getJsonValueSimple("string", jsonObject, "dc_mail");
					queryString = queryString + ", @p_dc_company = " + tcf.getJsonValueSimple("string", jsonObject, "dc_company");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
					queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
					queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
					queryString = queryString + ", @p_fg_ma220 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_ma220");
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

