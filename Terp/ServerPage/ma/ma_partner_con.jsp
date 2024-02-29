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



			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("select")) {
				queryString = queryString + "exec usp_ma_partner_con 'select' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ma_partner_con 's' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser") ;
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc") ;
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p") ;
				queryString = queryString + ", @p_nm_p = " + tcf.getJsonValueSimple("string", jsonObject, "nm_p");
				queryString = queryString + ", @p_fg_important = " + tcf.getJsonValueSimple("string", jsonObject, "fg_important");
				queryString = queryString + ", @p_yn_bldg = " + tcf.getJsonValueSimple("string", jsonObject, "yn_bldg");
				queryString = queryString + ", @p_yn_plant = " + tcf.getJsonValueSimple("string", jsonObject, "yn_plant");
				queryString = queryString + ", @p_yn_env = " + tcf.getJsonValueSimple("string", jsonObject, "yn_env");
				queryString = queryString + ", @p_yn_etc = " + tcf.getJsonValueSimple("string", jsonObject, "yn_etc");
				queryString = queryString + ", @p_dc_ebid_url = " + tcf.getJsonValueSimple("string", jsonObject, "dc_ebid_url");
				queryString = queryString + ", @p_dc_criteria = " + tcf.getJsonValueSimple("string", jsonObject, "dc_criteria");
				queryString = queryString + ", @p_dc_competitor = " + tcf.getJsonValueSimple("string", jsonObject, "dc_competitor");
				queryString = queryString + ", @p_dc_trend = " + tcf.getJsonValueSimple("string", jsonObject, "dc_trend");
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_ma_partner_con 'm' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser") ;
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc") ;
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_ma_partner_con 'd' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("help")) {
				queryString = queryString + "exec usp_ma_partner_con 'help' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_search = '%" + tcf.getJsonValue("string", jsonObject, "h_search") + "%'";
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sall")) {
				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("hData")) {
					queryString = queryString + "exec usp_ma_partner_con 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser") ;
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc") ;
					queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p") ;
					queryString = queryString + ", @p_nm_p = " + tcf.getJsonValueSimple("string", jsonObject, "nm_p");
					queryString = queryString + ", @p_fg_important = " + tcf.getJsonValueSimple("string", jsonObject, "fg_important");
					queryString = queryString + ", @p_yn_bldg = " + tcf.getJsonValueSimple("string", jsonObject, "yn_bldg");
					queryString = queryString + ", @p_yn_plant = " + tcf.getJsonValueSimple("string", jsonObject, "yn_plant");
					queryString = queryString + ", @p_yn_env = " + tcf.getJsonValueSimple("string", jsonObject, "yn_env");
					queryString = queryString + ", @p_yn_etc = " + tcf.getJsonValueSimple("string", jsonObject, "yn_etc");
					queryString = queryString + ", @p_dc_ebid_url = " + tcf.getJsonValueSimple("string", jsonObject, "dc_ebid_url");
					queryString = queryString + ", @p_dc_criteria = " + tcf.getJsonValueSimple("string", jsonObject, "dc_criteria");
					queryString = queryString + ", @p_dc_competitor = " + tcf.getJsonValueSimple("string", jsonObject, "dc_competitor");
					queryString = queryString + ", @p_dc_trend = " + tcf.getJsonValueSimple("string", jsonObject, "dc_trend");
					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				}

				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("lData")) {
					queryString = queryString + "exec usp_ma_partner_con_dept 's' ";
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser") ;
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc") ;
					queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p") ;
					queryString = queryString + ", @p_dc_dept = " + tcf.getJsonValueSimple("string", jsonObject, "dc_dept");
					queryString = queryString + ", @p_dc_jc = " + tcf.getJsonValueSimple("string", jsonObject, "dc_jc");
					queryString = queryString + ", @p_dc_jg = " + tcf.getJsonValueSimple("string", jsonObject, "dc_jg");
					queryString = queryString + ", @p_dc_charge = " + tcf.getJsonValueSimple("string", jsonObject, "dc_charge");
					queryString = queryString + ", @p_dc_tel = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel");
					queryString = queryString + ", @p_dc_hp = " + tcf.getJsonValueSimple("string", jsonObject, "dc_hp");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");

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
