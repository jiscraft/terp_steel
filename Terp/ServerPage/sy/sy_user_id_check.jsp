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
//    String defaultSpName = (String) request.getParameter("spn");
//    String filters = (String) request.getParameter("filters");
	Iterator iterator = null;
//	HttpSession sessionCheck = request.getSession();



	try {

		JSONArray jsonArray;

		if (request.getParameter("sendData") != null) {
			jsonArray = tcf.arrayConvert(request.getParameter("sendData"));
			iterator = jsonArray.iterator();
			int iteCount = 0;
		}


		while (iterator.hasNext()) {
			JSONObject jsonObject = (JSONObject) iterator.next();
		    queryString = "exec usp_sy_user_id_check '" + tcf.getJsonValue("string", jsonObject, "id_user_req") + "'";
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
