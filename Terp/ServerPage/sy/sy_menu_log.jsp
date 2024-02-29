<%--
20160621 jiscraft
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

//            if (sessionCheck.isNew() || !ts.isUsing(tcf.getJsonValue("string", jsonObject, "loginIduser").toString())) {
//                strErrorMessage = "다른 시스템에서 로그인했거나 사용시간이 초과되어 서버와 연결이 끊어졌습니다";
//                throw new Exception();
//            }


            if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sel")) {
                queryString = queryString + "exec usp_sy_menu_log 'sel' ";
                queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
                queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
                queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_click_dt_fr");
                queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_click_dt_to");
            }

            if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("usel")) {
                queryString = queryString + "exec usp_sy_menu_log 'usel' ";
                queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
                queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
                queryString = queryString + ", @p_dt_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_click_dt_fr");
                queryString = queryString + ", @p_dt_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_click_dt_to");
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
