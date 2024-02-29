<%--
그룹웨어에서 결재상태 및 첨부화일 정보를 처리하기위한 jsp 2016923 jiscraft
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

//			if (!ts.isLogon(sessionCheck)) {
//				strErrorMessage = "s다른 시스템에서 로그인했거나 사용시간이 초과되어 서버와 연결이 끊어졌습니다";
//				throw new Exception();
//			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("hsel")) {
				queryString = queryString + "exec usp_gw_alarm 'hsel' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_al = " + tcf.getJsonValueSimple("string", jsonObject, "no_al");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_dt_alarm = " + tcf.getJsonValueSimple("string", jsonObject, "dt_alarm");
				queryString = queryString + ", @p_dt_alarm_fr = " + tcf.getJsonValueSimple("string", jsonObject, "dt_alarm_fr");
				queryString = queryString + ", @p_dt_alarm_to = " + tcf.getJsonValueSimple("string", jsonObject, "dt_alarm_to");
				query.add(queryString);
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("lsel")) {
				queryString = queryString + "exec usp_gw_alarm 'lsel' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_al = " + tcf.getJsonValueSimple("string", jsonObject, "no_al");
				query.add(queryString);
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("hins")) {
				queryString = queryString + "exec terp.usp_gw_alarm 'hins' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_al = " + tcf.getJsonValueSimple("string", jsonObject, "no_al");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_dc_alarm = " + tcf.getJsonValueSimple("string", jsonObject, "dc_alarm");
				queryString = queryString + ", @p_dt_alarm = " + tcf.getJsonValueSimple("string", jsonObject, "dt_alarm");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				query.add(queryString);
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("lins")) {
				queryString = queryString + "exec usp_gw_alarm 'lins' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_al = " + tcf.getJsonValueSimple("string", jsonObject, "no_al");
				queryString = queryString + ", @p_id_user_rcv = " + tcf.getJsonValueSimple("string", jsonObject, "id_user_rcv");
				query.add(queryString);
			}

			if (tcf.getJsonValueSimple("object", jsonObject, "actiondata").toString().equals("sendMsg")) {
				queryString = queryString + "exec usp_gw_alarm 'sendMsg' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_al = " + tcf.getJsonValueSimple("string", jsonObject, "no_al");
				query.add(queryString);
			}

			if (tcf.getJsonValue("string", jsonObject, "actiondata").toString().equals("save")) {
				queryString = "exec usp_gw_alarm @p_docu = 'hins' ";
				queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", jsonObject, "loginIduser");
				queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", jsonObject, "loginCdc");
				queryString = queryString + ", @p_no_al = " + tcf.getJsonValueSimple("string", jsonObject, "no_al");
				queryString = queryString + ", @p_cd_e = " + tcf.getJsonValueSimple("string", jsonObject, "cd_e");
				queryString = queryString + ", @p_dc_alarm = " + tcf.getJsonValueSimple("string", jsonObject, "dc_alarm");
				queryString = queryString + ", @p_dt_alarm = " + tcf.getJsonValueSimple("string", jsonObject, "dt_alarm");
				queryString = queryString + ", @p_dc_remark = " + tcf.getJsonValueSimple("string", jsonObject, "dc_remark");
				query.add(queryString);

				JSONArray rcvJsonDataArray = (JSONArray) jsonObject.get("rcvData");
				if (!rcvJsonDataArray.isEmpty()) {
					for (int i=0; i<rcvJsonDataArray.size(); i++) {
						JSONObject rcvJsonData = (JSONObject) rcvJsonDataArray.get(i);
						queryString = "exec usp_gw_alarm @p_docu = 'lins' ";
						queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", rcvJsonData, "loginIduser");
						queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", rcvJsonData, "loginCdc");
						queryString = queryString + ", @p_no_al = " + tcf.getJsonValueSimple("string", rcvJsonData, "no_al");
						queryString = queryString + ", @p_id_user_rcv = " + tcf.getJsonValueSimple("string", rcvJsonData, "id_user_rcv");
						query.add(queryString);
					}
				}
			}

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
