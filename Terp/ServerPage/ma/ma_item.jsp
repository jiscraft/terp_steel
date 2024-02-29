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


      if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
        queryString = queryString + "exec usp_ma_item 's' ";
        queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
        queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
        queryString = queryString + ", @p_cd_i = " + tcf.getJsonValueSimple("string", jsonObject, "cd_i");
        queryString = queryString + ", @p_nm_i = " + tcf.getJsonValueSimple("string", jsonObject, "nm_i");
        queryString = queryString + ", @p_nm_spec = " + tcf.getJsonValueSimple("string", jsonObject, "nm_spec");
        queryString = queryString + ", @p_yn_spec = " + tcf.getJsonValueSimple("string", jsonObject, "yn_spec");
        queryString = queryString + ", @p_yn_size = " + tcf.getJsonValueSimple("string", jsonObject, "yn_size");
        queryString = queryString + ", @p_fg_mm010 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm010");
        queryString = queryString + ", @p_fg_mm010_spec = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm010_spec");

        queryString = queryString + ", @p_fg_mm030 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm030");
        queryString = queryString + ", @p_fg_mm040 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm040");
        queryString = queryString + ", @p_fg_mm050 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm050");
        queryString = queryString + ", @p_fg_mm060 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm060");
        queryString = queryString + ", @p_fg_mm070 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm070");

        queryString = queryString + ", @p_nb_convert = " + tcf.getJsonValueSimple("number", jsonObject, "nb_convert");
        queryString = queryString + ", @p_cd_w_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "cd_w_rcv");
        queryString = queryString + ", @p_cd_w_issue = " + tcf.getJsonValueSimple("string", jsonObject, "cd_w_issue");
        queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
        queryString = queryString + ", @p_yn_use = " + tcf.getJsonValueSimple("string", jsonObject, "yn_use");

      }



      if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("all")) {
        queryString = queryString + "exec usp_ma_item 'all' ";
        queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
        queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");

      }

      if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
        queryString = queryString + "exec usp_ma_item 'm' ";
        queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
        queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
        queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "p_search");
        queryString = queryString + ", @p_fg_mm050 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm050");
        queryString = queryString + ", @p_fg_mm060 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm060");
      }

      if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("help")) {
        queryString = queryString + "exec usp_ma_item 'help' ";
        queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
        queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
        queryString = queryString + ", @p_search = " + tcf.getJsonValueSimple("string", jsonObject, "h_search");
        queryString = queryString + ", @p_fg_mm050 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm050");
        queryString = queryString + ", @p_fg_mm060 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_mm060");

      }
      if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("d")) {
        queryString = queryString + "exec usp_ma_item 'd' ";
        queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
        queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
        queryString = queryString + ", @p_cd_i = " + tcf.getJsonValueSimple("string", jsonObject, "cd_i");

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
