<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="kr.terp.common.util.Common" %>

<%

	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	TobeQueryExec execQuery = new TobeQueryExec();
	List<String> query = new ArrayList<String>();
	String queryString = "";
	String resultString = "";
	String strErrorMessage = "";


	try {

		String type = request.getParameter("type");
		String id_user = request.getParameter("id_user");
		String dc_pw = request.getParameter("dc_pw");
		String userBrowser = request.getParameter("browser");
		String ip = request.getRemoteAddr();

		System.out.println(ip);
		//database에 정보를 보내기전 parameter에 대한 validation check
		if (Common.isEmpty(type)) {
			strErrorMessage = "사용자 인증유형(login/logout)을 지정해야 합니다.";
			throw new Exception();
		}
		if (Common.isEmpty(id_user)) {
			strErrorMessage = "사용자 아이디를 입력해야 합니다.";
			throw new Exception();
		}
		if (type.equalsIgnoreCase("login") && Common.isEmpty(dc_pw)) {
			strErrorMessage = "사용자 비밀번호를 입력해야 합니다.";
			throw new Exception();
		}

		queryString = queryString + "exec usp_sy_userauthenticate ";
		queryString = queryString + " @p_type = N'" + type + "'";
		queryString = queryString + ", @p_id_user = N'" + id_user + "'";
		queryString = queryString + ", @p_dc_pw = N'" + dc_pw + "'";
		queryString = queryString + ", @p_browser = N'" + userBrowser + "'";
		queryString = queryString + ", @p_ip = N'" + ip + "'";
		query.add(queryString);

		System.out.println(queryString);

		resultString = execQuery.queryExec(query, "terp", "json");

	}
	catch (SQLException e) {
		if (strErrorMessage == "") {
			strErrorMessage = e.toString();
		}
		resultString = "{\"success\":" + false + ", \"data\": \"\" , \"msg\": \"" + strErrorMessage + "\"}";
	}
	catch (Exception ex) {
		if (strErrorMessage == "") {
			strErrorMessage = ex.toString();
		}
		resultString = "{\"success\":" + false + ", \"data\": \"\" , \"msg\": \"" + strErrorMessage + "\"}";
	}
	finally {
		outResult.println(resultString.trim());
	}

%>
