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
	HttpSession sessionCheck = request.getSession(false);

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

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sall")) {
				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("hData")) {
					queryString = queryString + "exec usp_ma_site 's' ";
					queryString = queryString + ", @p_cd_c 	= " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
					queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
					queryString = queryString + ", @p_nm_site = " + tcf.getJsonValueSimple("string", jsonObject, "nm_site");
					queryString = queryString + ", @p_nm_site_official = " + tcf.getJsonValueSimple("string", jsonObject, "nm_site_official");
					queryString = queryString + ", @p_fg_pj010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj010");
					queryString = queryString + ", @p_fg_pj020 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj020");

					queryString = queryString + ", @p_fg_status = " + tcf.getJsonValueSimple("string", jsonObject, "fg_status");
					queryString = queryString + ", @p_fg_mtrl = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mtrl");
					queryString = queryString + ", @p_fg_work = " + tcf.getJsonValueSimple("string", jsonObject, "fg_work");
					queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
					queryString = queryString + ", @p_cd_p_owner = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p_owner");

					queryString = queryString + ", @p_dt_close = " + tcf.getJsonValueSimple("string", jsonObject, "dt_close");
					queryString = queryString + ", @p_cd_site_sale = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site_sale");
					queryString = queryString + ", @p_dc_addr = " + tcf.getJsonValueSimple("string", jsonObject, "dc_addr");
					queryString = queryString + ", @p_dc_tel1 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel1");
					queryString = queryString + ", @p_dc_tel2 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel2");
					queryString = queryString + ", @p_dc_tel3 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel3");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
					queryString = queryString + ", @p_id_row_new = " + tcf.getJsonValueSimple("string", jsonObject, "id_row_new");
				}

				if (tcf.getJsonValueSimple("object", jsonObject, "actionDetailData").toString().equals("lData")) {
					queryString = queryString + "exec usp_pj_contact 's' ";
					queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
					queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
					queryString = queryString + ", @p_dc_e = " + tcf.getJsonValueSimple("string", jsonObject, "dc_e");
					queryString = queryString + ", @p_fg_pj060 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj060");
					queryString = queryString + ", @p_dc_tel = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel");
					queryString = queryString + ", @p_dc_mail = " + tcf.getJsonValueSimple("string", jsonObject, "dc_mail");
					queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
					queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
					queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
					queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				}
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("all")) {
				queryString = queryString + "exec usp_ma_site 'all' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_ma_site 's' ";
				queryString = queryString + ", @p_cd_c 	= " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_nm_site = " + tcf.getJsonValueSimple("string", jsonObject, "nm_site");
				queryString = queryString + ", @p_nm_site_official = " + tcf.getJsonValueSimple("string", jsonObject, "nm_site_official");
				queryString = queryString + ", @p_fg_pj010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj010");
				queryString = queryString + ", @p_fg_pj020 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj020");

				queryString = queryString + ", @p_fg_status = " + tcf.getJsonValueSimple("string", jsonObject, "fg_status");
				queryString = queryString + ", @p_fg_mtrl = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mtrl");
				queryString = queryString + ", @p_fg_work = " + tcf.getJsonValueSimple("string", jsonObject, "fg_work");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_cd_p_owner = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p_owner");

				queryString = queryString + ", @p_dt_close = " + tcf.getJsonValueSimple("string", jsonObject, "dt_close");
				queryString = queryString + ", @p_cd_site_sale = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site_sale");
				queryString = queryString + ", @p_dc_addr = " + tcf.getJsonValueSimple("string", jsonObject, "dc_addr");
				queryString = queryString + ", @p_dc_tel1 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel1");
				queryString = queryString + ", @p_dc_tel2 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel2");
				queryString = queryString + ", @p_dc_tel3 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel3");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
				queryString = queryString + ", @p_id_row_new = " + tcf.getJsonValueSimple("string", jsonObject, "id_row_new");

			}




			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("select")) {
				queryString = queryString + "exec usp_ma_site 'select' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_ma_site 'd' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_ma_site 'm' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_fg_statusString = " + tcf.getJsonValueSimple("string", jsonObject, "fg_statusString");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "p_search");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("r")) {
				queryString = queryString + "exec usp_ma_site 'r' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("help")) {
				queryString = queryString + "exec usp_ma_site 'help' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_search = '%" + tcf.getJsonValue("string", jsonObject, "p_search") + "%'";
				queryString = queryString + ", @p_fg_pj010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj010");
				queryString = queryString + ", @p_fg_pj020 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_pj020");
				queryString = queryString + ", @p_fg_status = " + tcf.getJsonValueSimple("string", jsonObject, "fg_status");
				queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("info")) {
				queryString = queryString + "exec usp_ma_site 'info' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			}



			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sel")) {
				queryString = queryString + "exec usp_ma_site 'sel' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_fg_sm010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sm010");
				queryString = queryString + ", @p_fg_status = " + tcf.getJsonValueSimple("string", jsonObject, "fg_status");
				queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_fr");
				queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_to");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sel1")) {
				queryString = queryString + "exec usp_ma_site 'sel1' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
			}



			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("changeStatus")) {
				queryString = queryString + "exec usp_ma_site 'changeStatus' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
				queryString = queryString + ", @p_fg_sm200 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sm200");

			}

			query.add(queryString);
		}


		resultString = execQuery.queryExec(query, "terp", "json");
	}
	catch (Exception e) {
		if (strErrorMessage == "") {
			strErrorMessage = e.toString();
		}

		resultString = "{\"success\":" + false + ", \"data\": [] , \"msg\": \"" + strErrorMessage + "\"}";

	}
	finally {
		outResult.print(resultString.trim());
	}


%>
