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
			queryString = "";

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("select")) {
              queryString = queryString + "exec usp_sy_user_req 'select' ";
              queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
              queryString = queryString + ", @p_fg_perinfo = '" + tcf.getJsonValue("string", jsonObject, "fg_perinfo") + "'";
			  queryString = queryString + ", @p_fg_status = '" + tcf.getJsonValue("string", jsonObject, "fg_status") + "'";
			}

            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("insert")) {
              queryString = queryString + "exec usp_sy_user_req 'insert' ";
//              queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "id_user") + "'";
              queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "cd_c") + "'";
              queryString = queryString + ", @p_fg_perinfo = '" + tcf.getJsonValue("string", jsonObject, "fg_perinfo") + "'";
              queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
              queryString = queryString + ", @p_nm_e = '" + tcf.getJsonValue("string", jsonObject, "nm_e") + "'";
              queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
              queryString = queryString + ", @p_nm_e_eng = '" + tcf.getJsonValue("string", jsonObject, "nm_e_eng") + "'";
              queryString = queryString + ", @p_no_e = '" + tcf.getJsonValue("string", jsonObject, "no_e") + "'";
              queryString = queryString + ", @p_dc_addr = '" + tcf.getJsonValue("string", jsonObject, "dc_addr") + "'";
              queryString = queryString + ", @p_dc_hp = '" + tcf.getJsonValue("string", jsonObject, "dc_hp") + "'";
              queryString = queryString + ", @p_dc_tel = '" + tcf.getJsonValue("string", jsonObject, "dc_tel") + "'";
              queryString = queryString + ", @p_dc_companymail = '" + tcf.getJsonValue("string", jsonObject, "dc_companymail") + "'";
              queryString = queryString + ", @p_dc_personalmail = '" + tcf.getJsonValue("string", jsonObject, "dc_personalmail") + "'";
              queryString = queryString + ", @p_dc_remark = '" + tcf.getJsonValue("string", jsonObject, "dc_remark") + "'";
              queryString = queryString + ", @p_fg_status = '" + tcf.getJsonValue("string", jsonObject, "fg_status") + "'";
              queryString = queryString + ", @p_id_user_req = '" + tcf.getJsonValue("string", jsonObject, "id_user_req") + "'";
              queryString = queryString + ", @p_dc_pw = '" + tcf.getJsonValue("string", jsonObject, "dc_pw") + "'";
//              queryString = queryString + ", @p_img_url = '" + tcf.getJsonValue("string", jsonObject, "img_url") + "'";
//              queryString = queryString + ", @p_id_row = '" + tcf.getJsonValue("string", jsonObject, "id_row") + "'";
            }


            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("update")) {
              queryString = queryString + "exec usp_sy_user_req 'update' ";
              queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "cd_c") + "'";
              queryString = queryString + ", @p_fg_perinfo = '" + tcf.getJsonValue("string", jsonObject, "fg_perinfo") + "'";
              queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
              queryString = queryString + ", @p_nm_e = '" + tcf.getJsonValue("string", jsonObject, "nm_e") + "'";
              queryString = queryString + ", @p_cd_e = '" + tcf.getJsonValue("string", jsonObject, "cd_e") + "'";
              queryString = queryString + ", @p_nm_e_eng = '" + tcf.getJsonValue("string", jsonObject, "nm_e_eng") + "'";
              queryString = queryString + ", @p_no_e = '" + tcf.getJsonValue("string", jsonObject, "no_e") + "'";
              queryString = queryString + ", @p_dc_addr = '" + tcf.getJsonValue("string", jsonObject, "dc_addr") + "'";
              queryString = queryString + ", @p_dc_hp = '" + tcf.getJsonValue("string", jsonObject, "dc_hp") + "'";
              queryString = queryString + ", @p_dc_tel = '" + tcf.getJsonValue("string", jsonObject, "dc_tel") + "'";
              queryString = queryString + ", @p_dc_companymail = '" + tcf.getJsonValue("string", jsonObject, "dc_companymail") + "'";
              queryString = queryString + ", @p_dc_personalmail = '" + tcf.getJsonValue("string", jsonObject, "dc_personalmail") + "'";
              queryString = queryString + ", @p_dc_remark = '" + tcf.getJsonValue("string", jsonObject, "dc_remark") + "'";
              queryString = queryString + ", @p_fg_status = '" + tcf.getJsonValue("string", jsonObject, "fg_status") + "'";
              queryString = queryString + ", @p_id_user_req = '" + tcf.getJsonValue("string", jsonObject, "id_user_req") + "'";
              queryString = queryString + ", @p_dc_pw = '" + tcf.getJsonValue("string", jsonObject, "dc_pw") + "'";
//              queryString = queryString + ", @p_img_url = '" + tcf.getJsonValue("string", jsonObject, "img_url") + "'";
              queryString = queryString + ", @p_id_row = '" + tcf.getJsonValue("string", jsonObject, "id_row") + "'";
            }


            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("delete")) {
              queryString = queryString + "exec usp_sy_user_req 'delete' ";
              queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
              queryString = queryString + ", @p_id_row = '" + tcf.getJsonValue("string", jsonObject, "id_row") + "'";
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
