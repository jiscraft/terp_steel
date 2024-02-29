<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
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

            JSONArray jsonConDataArray = (JSONArray) jsonObject.get("conData");
            if (!jsonConDataArray.isEmpty()) {
                for (int i=0; i<jsonConDataArray.size(); i++) {
                    JSONObject jsonConObject = (JSONObject) jsonConDataArray.get(i);
                    if (tcf.getJsonValue("string", jsonConObject, "actiondata").toString().equals("s")){
                        queryString = queryString + "exec usp_ma_partner_con 's' ";
                        queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonConObject, "loginIduser") ;
                        queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonConObject, "loginCdc") ;
                        queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonConObject, "cd_p") ;
                        queryString = queryString + ", @p_nm_p = " + tcf.getJsonValueSimple("string", jsonConObject, "nm_p");
                        queryString = queryString + ", @p_fg_important = " + tcf.getJsonValueSimple("string", jsonConObject, "fg_important");
                        queryString = queryString + ", @p_yn_bldg = " + tcf.getJsonValueSimple("string", jsonConObject, "yn_bldg");
                        queryString = queryString + ", @p_yn_plant = " + tcf.getJsonValueSimple("string", jsonConObject, "yn_plant");
                        queryString = queryString + ", @p_yn_env = " + tcf.getJsonValueSimple("string", jsonConObject, "yn_env");
                        queryString = queryString + ", @p_yn_etc = " + tcf.getJsonValueSimple("string", jsonConObject, "yn_etc");
                        queryString = queryString + ", @p_dc_ebid_url = " + tcf.getJsonValueSimple("string", jsonConObject, "dc_ebid_url");
                        queryString = queryString + ", @p_dc_criteria = " + tcf.getJsonValueSimple("string", jsonConObject, "dc_criteria");
                        queryString = queryString + ", @p_dc_competitor = " + tcf.getJsonValueSimple("string", jsonConObject, "dc_competitor");
                        queryString = queryString + ", @p_dc_trend = " + tcf.getJsonValueSimple("string", jsonConObject, "dc_trend");
                        query.add(queryString);
                    }
                    if (tcf.getJsonValue("string", jsonConObject, "actiondata").toString().equals("delete")){
                        queryString = queryString + "exec usp_ma_partner_con 'delete' ";
                        queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonConObject, "loginIduser") + "'";
                        queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonConObject, "loginCdc") + "'";
                        queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonConObject, "cd_p") + "'";

                        queryString = queryString + "exec usp_ma_partner_con_dept 'delete' ";
                        queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonConObject, "loginIduser") + "'";
                        queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonConObject, "loginCdc") + "'";
                        queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonConObject, "cd_p") + "'";

                        query.add(queryString);
                    }
                }
            }

            JSONArray jsonDeptDataArray = (JSONArray) jsonObject.get("deptData");
            if (!jsonDeptDataArray.isEmpty()) {
                for (int i=0; i<jsonDeptDataArray.size(); i++) {
                    JSONObject jsonDeptObject = (JSONObject) jsonDeptDataArray.get(i);
                    if (tcf.getJsonValue("string", jsonDeptObject, "actiondata").toString().equals("s")){
                        queryString = queryString + "exec usp_ma_partner_con_dept 's' ";
                        queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonDeptObject, "loginIduser") ;
                        queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonDeptObject, "loginCdc") ;
                        queryString = queryString + ", @p_cd_p = " + tcf.getJsonValueSimple("string", jsonDeptObject, "cd_p") ;
                        queryString = queryString + ", @p_dc_dept = " + tcf.getJsonValueSimple("string", jsonDeptObject, "dc_dept");
                        queryString = queryString + ", @p_dc_jc = " + tcf.getJsonValueSimple("string", jsonDeptObject, "dc_jc");
                        queryString = queryString + ", @p_dc_jg = " + tcf.getJsonValueSimple("string", jsonDeptObject, "dc_jg");
                        queryString = queryString + ", @p_dc_charge = " + tcf.getJsonValueSimple("string", jsonDeptObject, "dc_charge");
                        queryString = queryString + ", @p_dc_tel = " + tcf.getJsonValueSimple("string", jsonDeptObject, "dc_tel");
                        queryString = queryString + ", @p_dc_hp = " + tcf.getJsonValueSimple("string", jsonDeptObject, "dc_hp");
                        queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonDeptObject, "dc_remark");
                        queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonDeptObject, "id_row");
                        query.add(queryString);
                    }
                    if (tcf.getJsonValue("string", jsonDeptObject, "actiondata").toString().equals("delete")){
                        queryString = queryString + "exec usp_ma_partner_con_dept 'delete' ";
                        queryString = queryString + ", @p_id_user = '" + tcf.getJsonValue("string", jsonDeptObject, "loginIduser") + "'";
                        queryString = queryString + ", @p_cd_c = '" + tcf.getJsonValue("string", jsonDeptObject, "loginCdc") + "'";
                        queryString = queryString + ", @p_cd_p = '" + tcf.getJsonValue("string", jsonDeptObject, "cd_p") + "'";
                        queryString = queryString + ", @p_id_row = " + tcf.getJsonValueSimple("string", jsonDeptObject, "id_row");
                        query.add(queryString);
                    }
                }
            }

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
