<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="org.apache.commons.fileupload.FileItem" %>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory" %>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"  %>
<%@ page import="org.json.simple.JSONArray"  %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="org.apache.commons.io.IOUtils" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.io.BufferedInputStream" %>
<%@ page import="kr.terp.common.util.MailUtil" %>
<%@ page import="kr.terp.common.util.Common" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%
	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	JSONObject jsonResponse = new JSONObject();
	JSONArray jsonFiles = new JSONArray();
	TobeQueryExec execQuery = new TobeQueryExec();
	TobeCommonFunction tcf = new TobeCommonFunction();
	List<String> query = new ArrayList<String>();
	String queryString = "";
	String resultString = "";
	Iterator iterator = null;

	boolean isMultipart = ServletFileUpload.isMultipartContent(request);
	if (isMultipart) {
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload uploader = new ServletFileUpload(factory);
		uploader.setHeaderEncoding("UTF-8");
		List<FileItem> fileItems = uploader.parseRequest(request);

		JSONObject jsonObject = new JSONObject();
		byte[] pdfBytes = null;

		try {
			Iterator<FileItem> iterFileItems = fileItems.iterator();
			while (iterFileItems.hasNext()) {
				FileItem fileItem = iterFileItems.next();
				if (fileItem.isFormField()) {
					jsonObject.put(fileItem.getFieldName(), fileItem.getString("UTF-8"));
				}
				else {
					if (fileItem.getFieldName().equalsIgnoreCase("pdfBlob")) {
						pdfBytes = fileItem.get();
					}
				}
			}

			boolean isValid = true;
			String msg = "";
			if ((jsonObject.get("from") == null) || Common.isEmpty(jsonObject.get("from").toString())) {
				isValid = false;
				msg = "발신자 이메일 정보가 없습니다!";
			}
			if ((jsonObject.get("to") == null) || Common.isEmpty(jsonObject.get("to").toString()) || Common.isEmpty(jsonObject.get("to").toString().replaceAll("\\s+", ""))) {
				isValid = false;
				msg = "수신자 이메일 정보가 없습니다!";
			}
			if ((jsonObject.get("cc") == null) || Common.isEmpty(jsonObject.get("cc").toString()) || Common.isEmpty(jsonObject.get("cc").toString().replaceAll("\\s+", ""))) {
				jsonObject.put("cc", "");
			}
			if ((jsonObject.get("subject") == null) || (Common.isEmpty(jsonObject.get("subject").toString()))) {
				isValid = false;
				msg = "메일 제목이 없습니다!";
			}
			if ((jsonObject.get("html") == null) || (Common.isEmpty(jsonObject.get("html").toString()))) {
				isValid = false;
				msg = "메일 내용이 없습니다!";
			}
			if ((jsonObject.get("pdfFileName") == null) || (Common.isEmpty(jsonObject.get("pdfFileName").toString()))) {
				isValid = false;
				msg = "첨부할 PDF 파일명이 없습니다!";
			}
			if ((jsonObject.get("pdfRealPath") == null) || (Common.isEmpty(jsonObject.get("pdfRealPath").toString()))) {
				isValid = false;
				msg = "첨부할 PDF 파일경로가 없습니다!";
			}

			if (isValid) {
				String pw = "";
				String userName = "(주)거흥산업";
				if (jsonObject.get("from").toString().equalsIgnoreCase("purchase@kerheung.co.kr")) {
					pw = "a123456789";
					userName = userName + " 구매팀";
				}
				if (!Common.isEmpty(pw)) {
					jsonObject.put("smtp", "smtp.mailplug.co.kr");
					jsonObject.put("account", jsonObject.get("from").toString());
					jsonObject.put("password", pw);
					jsonObject.put("username", userName);
					jsonObject.put("to", jsonObject.get("to").toString().replaceAll(";",",").replaceAll("\\n",",").replaceAll("\\s+", ""));
					jsonObject.put("cc", jsonObject.get("cc").toString().replaceAll(";",",").replaceAll("\\n",",").replaceAll("\\s+", ""));
					if (MailUtil.sendMailWithPdfFile(jsonObject)) {
						isValid = true;
						msg = "메일을 정상적으로 발송하였습니다!";
					} else {
						isValid = false;
						msg = "메일을 정상적으로 발송하지 못했습니다!";
					}
				}
				else {
					isValid = false;
					msg = "발신자 이메일 정보가 없습니다!";
				}
			}
			jsonResponse.put("success", isValid);
			jsonResponse.put("msg", msg);
			jsonResponse.put("data", "[]");
		}
		catch (Exception e) {
			jsonResponse.put("success", false);
			jsonResponse.put("msg", "이메일 발송 실패!");
			e.printStackTrace();
		}
	}
	else {
		jsonResponse.put("success", false);
		jsonResponse.put("msg", "인코딩 형식(multipart/form-data) 오류!");
	}

	System.out.println(jsonResponse.toJSONString());
	outResult.print(jsonResponse.toJSONString());

%>
