<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Objects" %>

<%

	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	TobeQueryExec execQuery = new TobeQueryExec();
	TobeCommonFunction tcf = new TobeCommonFunction();
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



			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("m")) {
				queryString = queryString + "exec usp_sy_osuser 'm' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonObject, "cd_p");
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("delete")) {
				queryString = queryString + "exec usp_sy_osuser 'delete' ";
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "id_user");
			}


			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
				queryString = queryString + "exec usp_sy_osuser 's' ";
				queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "cd_c") + "'";
				queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "id_user") + "'";
				queryString = queryString + ", @p_nm_user = '" + tcf.getJsonValue("string", jsonObject, "nm_user") + "'";
				queryString = queryString + ", @p_dc_pw = '" + tcf.getJsonValue("string", jsonObject, "dc_pw") + "'";
				queryString = queryString + ", @p_yn_use = '" + tcf.getJsonValue("string", jsonObject, "yn_use") + "'";
				queryString = queryString + ", @p_dc_personalmail = '" + tcf.getJsonValue("string", jsonObject, "dc_personalmail") + "'";
				queryString = queryString + ", @p_dc_mobile = '" + tcf.getJsonValue("string", jsonObject, "dc_mobile") + "'";
				queryString = queryString + ", @p_fg_user = '" + tcf.getJsonValue("string", jsonObject, "fg_user") + "'";
				queryString = queryString + ", @p_cd_o = '" + tcf.getJsonValue("string", jsonObject, "cd_o") + "'";
				queryString = queryString + ", @p_nm_o = '" + tcf.getJsonValue("string", jsonObject, "nm_o") + "'";
				queryString = queryString + ", @p_fg_sy030 = '" + tcf.getJsonValue("string", jsonObject, "fg_sy030") + "'";
				queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
				queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
				queryString = queryString + ", @p_nm_p = '" + tcf.getJsonValue("string", jsonObject, "nm_p") + "'";
				queryString = queryString + ", @p_yn_message_mobile = '" + tcf.getJsonValue("string", jsonObject, "yn_message_mobile") + "'";
				queryString = queryString + ", @p_yn_message_mail = '" + tcf.getJsonValue("string", jsonObject, "yn_message_mail") + "'";
				queryString = queryString + ", @p_tm_message_fr = '" + tcf.getJsonValue("string", jsonObject, "tm_message_fr") + "'";
				queryString = queryString + ", @p_tm_message_to = '" + tcf.getJsonValue("string", jsonObject, "tm_message_to") + "'";
				queryString = queryString + ", @p_dc_companymail = '" + tcf.getJsonValue("string", jsonObject, "dc_companymail") + "'";
				queryString = queryString + ", @p_dc_companymail_pw = '" + tcf.getJsonValue("string", jsonObject, "dc_companymail_pw") + "'";
				queryString = queryString + ", @p_yn_gwsign = '" + tcf.getJsonValue("string", jsonObject, "yn_gwsign") + "'";
				queryString = queryString + ", @p_tm_workzone = '" + tcf.getJsonValue("string", jsonObject, "tm_workzone") + "'";
				queryString = queryString + ", @p_sign_url = '" + tcf.getJsonValue("string", jsonObject, "sign_url") + "'";
				queryString = queryString + ", @p_yn_use_issue = '" + tcf.getJsonValue("string", jsonObject, "yn_use_issue") + "'";
				queryString = queryString + ", @p_id_mobile = '" + tcf.getJsonValue("string", jsonObject, "id_mobile") + "'";
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

/*

  if ( actionData.equals("s")) {

    while (iterator.hasNext()) {
      JSONObject jsonObject = (JSONObject) iterator.next();
      String id_user = (String) jsonObject.get("id_user");
      String nm_user = (String) jsonObject.get("nm_user");
      String dt_pwchange = (String) jsonObject.get("dt_pwchange");
      String dc_email = (String) jsonObject.get("dc_email");
      String dc_mobile = (String) jsonObject.get("dc_mobile");
      String dc_pw = (String) jsonObject.get("dc_pw");
      String yn_use = (String) jsonObject.get("yn_use");
      String fg_user = (String) jsonObject.get("fg_user");




      queryString = queryString + "EXEC TERP.USP_SY_USER '" + actionData + "' ";
      queryString = queryString + ", @P_ID_USER = N'" + id_user + "'";
      queryString = queryString + ", @P_NM_USER = N'" + nm_user + "'";
      queryString = queryString + ", @P_DT_PWCHANGE = N'" + dt_pwchange + "'";
      queryString = queryString + ", @P_dc_pw = N'" + dc_pw + "'";
      queryString = queryString + ", @P_dc_email = N'" + dc_email + "'";
      queryString = queryString + ", @P_dc_mobile = N'" + dc_mobile + "'";
      queryString = queryString + ", @P_yn_use = N'" + yn_use + "'";
      queryString = queryString + ", @p_fg_user = N'" + fg_user + "'";
      query.add(queryString);

    }
  }

  if (actionData.equals("m") ) {
    while (iterator.hasNext()) {
      JSONObject jsonObject = (JSONObject) iterator.next();

      Object h_fg_user = tcf.getJsonValue("string" , jsonObject , "h_fg_user" );
      Object h_search = tcf.getJsonValue("string" , jsonObject , "h_search" );
      Object h_yesno = tcf.getJsonValue("string" , jsonObject , "h_yesno" );


      queryString = queryString + "EXEC TERP.USP_SY_USER  'm' ";
      queryString = queryString + ", @p_search = '%" + h_search + "%'";
      queryString = queryString + ", @p_yn_use = '" + h_yesno + "'";
      queryString = queryString + ", @p_fg_user = '" + h_fg_user + "'";

      System.out.println(queryString);
      query.add(queryString);
    }
  }

  if (actionData.equals("d") ) {
    while (iterator.hasNext()) {
      JSONObject jsonObject = (JSONObject) iterator.next();
      String id_user = (String) jsonObject.get("id_user");


      queryString = queryString + "EXEC TERP.USP_SY_USER '" + actionData + "' ";
      queryString = queryString + ", @p_id_user = '" + id_user + "'";

      query.add(queryString);
//      System.out.println(queryString);
    }
  }

  if (actionData.equals("r") ) {
    while (iterator.hasNext()) {
      JSONObject jsonObject = (JSONObject) iterator.next();
      String id_user = (String) jsonObject.get("id_user");


      queryString = queryString + "EXEC TERP.USP_SY_USER '" + actionData + "' ";
      queryString = queryString + ", @p_id_user = '" + id_user + "'";
      query.add(queryString);
      System.out.println(queryString);
    }
  }*/


%>
