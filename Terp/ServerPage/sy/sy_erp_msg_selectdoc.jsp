<%--
입주하자현황 20160913 resh
--%>


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
            queryString = queryString + "exec usp_sy_erp_msg_selectdoc 'r' ";
            queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
            queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
            queryString = queryString + ", @p_id_user_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_rcv");
            queryString = queryString + ", @p_fg_sy200 = " + tcf.getJsonValueSimple("string", jsonObject, "fg_sy200");
            queryString = queryString + ", @p_no_erpkey = " + tcf.getJsonValueSimple("string", jsonObject, "no_erpkey");
            queryString = queryString + ", @p_ln_erpkey = " + tcf.getJsonValueSimple("string", jsonObject, "ln_erpkey");
            queryString = queryString + ", @p_yn_push = " + tcf.getJsonValueSimple("string", jsonObject, "yn_push");
            queryString = queryString + ", @p_yn_push_sent = " + tcf.getJsonValueSimple("string", jsonObject, "yn_push_sent");
            queryString = queryString + ", @p_yn_confirm = " + tcf.getJsonValueSimple("string", jsonObject, "yn_confirm");
            queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
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
