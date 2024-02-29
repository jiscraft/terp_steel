<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="kr.terp.msg.FcmUtil" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%@ page import="org.json.simple.JSONArray" %>
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

        queryString = queryString + "exec usp_sy_user_fcm_token @p_docu = 'select' ";
        queryString = queryString + ", @p_id_user = 'SYSTEM'";
        queryString = queryString + ", @p_cd_c = '1000'";
        queryString = queryString + ", @p_id_fcm_user = 'SYSTEM'";
        queryString = queryString + ", @p_yn_use = 'Y'";
        query.add(queryString);
        resultString = execQuery.queryExec(query, "terp", "json");

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonResults = (JSONObject)jsonParser.parse(resultString);
        JSONArray jsonResultData = (JSONArray)jsonResults.get("data");
        for (int i=0; i<jsonResultData.size(); i++) {
            JSONObject jsonData = (JSONObject)jsonResultData.get(i);
            String token = (String)jsonData.get("id_fcm_token");
            FcmUtil.send(token,"TITLE","CONTENTS");
        }
        resultString = jsonResultData.size() + "건 전송됨!";
    }
    catch (Exception e) {
        e.printStackTrace();
        resultString = "{\"success\":false, \"data\":[] , \"msg\":\"" + e.getLocalizedMessage() + "\"}";
    }
    finally {
        outResult.println(resultString);
    }

%>
