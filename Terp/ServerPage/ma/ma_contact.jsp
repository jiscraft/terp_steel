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

//      if (sessionCheck.isNew() || !ts.isUsing(tcf.getJsonValueSimple("object", jsonObject, "loginIduser").toString())) {
//        strErrorMessage = "다른 시스템에서 로그인했거나 사용시간이 초과되어 서버와 연결이 끊어졌습니다(s)";
//        throw new Exception();
//      }

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("s")) {
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
				queryString = queryString + ", @p_fg_role = " + tcf.getJsonValueSimple("string", jsonObject, "fg_role");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_ma_contact 'm' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "p_search");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");
			}



			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("r")) {
				queryString = queryString + "exec usp_ma_contact 'r' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_contact = " + tcf.getJsonValueSimple("string", jsonObject, "no_contact");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("mp")) {
				queryString = queryString + "exec usp_ma_contact 'mp' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
			}


			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("d")) {
				queryString = queryString + "exec usp_ma_contact 'd' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_contact = " + tcf.getJsonValueSimple("string", jsonObject, "no_contact");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("urmk")) {
				queryString = queryString + "exec usp_ma_contact 'urmk' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_no_contact = " + tcf.getJsonValueSimple("string", jsonObject, "no_contact");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
			}
			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("help")) {
				queryString = queryString + "exec usp_ma_contact 'help' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_dc_name = " + tcf.getJsonValueSimple("string", jsonObject, "dc_name");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
				queryString = queryString + ", @p_dc_tel1 = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel");
				queryString = queryString + ", @p_cd_site = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site");

			}
			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals(",")) {
				queryString = queryString + "exec usp_ma_contact ',' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_a_no_contact = " + tcf.getJsonValueSimple("string", jsonObject, "a_no_contact");


			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("combo")) {
				queryString = queryString + "exec usp_ma_contact 'combo' ";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
				queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
				queryString = queryString + ", @p_fg_role = '0'" ;
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
