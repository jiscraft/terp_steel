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

            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("m")) {
                queryString = queryString + "exec usp_wk_memo @p_docu = 'm' ";
                queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
                queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
                queryString = queryString + ", @p_no_memo = " + tcf.getJsonValueSimple("string", jsonObject, "no_memo");
            }

            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("memp")) {
                queryString = queryString + "exec usp_wk_memo @p_docu = 'memp' ";
                queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
                queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
                queryString = queryString + ", @p_no_memo = " + tcf.getJsonValueSimple("string", jsonObject, "no_memo");
                queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
            }

            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
                queryString = queryString + "exec usp_wk_memo @p_docu = 's' ";
                queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
                queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
                queryString = queryString + ", @p_no_memo = " + tcf.getJsonValueSimple("string", jsonObject, "no_memo");
                queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
                queryString = queryString + ", @p_dt_memo = " + tcf.getJsonValueSimple("string", jsonObject, "dt_memo");
                queryString = queryString + ", @p_fg_memo = " + tcf.getJsonValueSimple("string", jsonObject, "fg_memo");
                queryString = queryString + ", @p_dc_memo = " + tcf.getJsonValueSimple("string", jsonObject, "dc_memo");
                queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonObject, "id_row");
            }

            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("d")) {
                queryString = queryString + "exec usp_wk_memo @p_docu = 'd' ";
                queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
                queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
                queryString = queryString + ", @p_no_memo = " + tcf.getJsonValueSimple("string", jsonObject, "no_memo");
            }

            query.add(queryString);
        }

        resultString = execQuery.queryExec(query, "terp", "json");
    }
    catch (Exception e) {
        e.printStackTrace();
        resultString = "{\"success\": false, \"data\": [] , \"msg\": \"" + e.getLocalizedMessage() + "\"}";
    }
    finally {
        outResult.println(resultString);
    }

%>
