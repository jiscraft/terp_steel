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

            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("select")) {
                queryString = queryString + "exec usp_sm_sale_act 'select' ";
                queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
                queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
                queryString = queryString + ", @p_cd_site_sale = '" + tcf.getJsonValue("string", jsonObject, "cd_site_sale") + "'";
                queryString = queryString + ", @p_cd_sale_act = '" + tcf.getJsonValue("string", jsonObject, "cd_sale_act") + "'";
                queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonObject, "cd_p") + "'";
                queryString = queryString + ", @p_dt_sale_act_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_sale_act_fr");
                queryString = queryString + ", @p_dt_sale_act_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_sale_act_to");
                queryString = queryString + ", @p_id_user_insert = '" + tcf.getJsonValue("string", jsonObject, "id_user_insert") + "'";
            }

            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("s")) {
                queryString = queryString + "exec usp_sm_sale_act 's' ";
                queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser") ;
                queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc") ;
                queryString = queryString + ", @p_cd_site_sale = " + tcf.getJsonValueSimple("string", jsonObject, "cd_site_sale");
                queryString = queryString + ", @p_cd_sale_act = " + tcf.getJsonValueSimple("string", jsonObject, "cd_sale_act");
                queryString = queryString + ", @p_dt_sale_act = " + tcf.getJsonValueSimple("string", jsonObject, "dt_sale_act");
                queryString = queryString + ", @p_dc_jc = " + tcf.getJsonValueSimple("string", jsonObject, "dc_jc");
                queryString = queryString + ", @p_dc_charge = " + tcf.getJsonValueSimple("string", jsonObject, "dc_charge");
                queryString = queryString + ", @p_dc_tel = " + tcf.getJsonValueSimple("string", jsonObject, "dc_tel");
                queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
                queryString = queryString + ", @p_yn_major = " + tcf.getJsonValueSimple("string", jsonObject, "yn_major");
            }

            if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("d")) {
                queryString = queryString + "exec usp_sm_sale_act 'd' ";
                queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonObject, "loginIduser") + "'";
                queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonObject, "loginCdc") + "'";
                queryString = queryString + ", @p_cd_site_sale = '" + tcf.getJsonValue("string", jsonObject, "cd_site_sale") + "'";
                queryString = queryString + ", @p_cd_sale_act = '" + tcf.getJsonValue("string", jsonObject, "cd_sale_act") + "'";
            }

            query.add(queryString);

        }


        resultString = execQuery.queryExec(query, "terp", "json");
    }
    catch (Exception e) {
        System.out.println(e);
        e.printStackTrace();
    }
    finally {
        outResult.println(resultString);
    }

%>
