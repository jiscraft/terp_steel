<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="kr.terp.common.util.Common" %>
<%@ page import="kr.terp.common.util.FileUtil" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.BufferedInputStream" %>
<%@ page import="java.io.BufferedOutputStream" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.math.BigInteger" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%

	request.setCharacterEncoding("UTF-8");
	String expire = request.getParameter("expire");
	String today = new SimpleDateFormat("yyMMdd").format(new Date());
	if (!Common.isEmpty(expire)) {
		expire = "000000" + Integer.parseInt(new BigInteger(new BigInteger(expire,16).toByteArray()).toString(16),16);
		expire = new StringBuilder(expire).reverse().toString();
		//System.out.println(expire.substring(0,6));
		Date expireDate = new SimpleDateFormat("yyMMdd").parse(expire.substring(0,6));
		//System.out.println(expireDate);
		expire = new SimpleDateFormat("yyMMdd").format(expireDate);
	}
	//System.out.println(today.compareTo(expire));

	if ((!Common.isEmpty(expire)) && (today.compareTo(expire) > 0)) {
		out.print("<script>alert('다운로드 기간이 만료되었습니다!');</script>");
	}
	else {
		JSONObject jsonResponse = new JSONObject();
		String path = request.getParameter("path");
		String fn = request.getParameter("fn");
		String dfn = request.getParameter("dfn");
		String rp = request.getParameter("rp");

		if (Common.isEmpty(dfn)) dfn = fn;
		if (Common.isEmpty(rp)) rp = "0";
/*
		if ((request.getRequestURL().indexOf("localhost") > -1) || (request.getRequestURL().indexOf("192.168.") > -1)) {
			path = new String(path.getBytes("8859_1"), "UTF-8");
			fn = new String(fn.getBytes("8859_1"), "UTF-8");
			dfn = new String(dfn.getBytes("8859_1"), "UTF-8");
		}
*/
		String dlPath = FileUtil.getRealPath(path);
		if (rp.equalsIgnoreCase("1")) dlPath = path;

		System.out.println("path="+path);
		System.out.println("fn="+fn);
		System.out.println("dfn="+dfn);
		System.out.println("dlPath="+dlPath);
		System.out.println(new String(dfn.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1));
		System.out.println(new String(fn.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1));
		System.out.println(new String(fn.getBytes("8859_1"), StandardCharsets.UTF_8));
		System.out.println(request.getRequestURL());

		if (Common.isEmpty(path) || Common.isEmpty(fn) || Common.isEmpty(dlPath)) {
			//if (true) return;
			out.print("<script>alert('다운로드하실 파일의 경로정보가 전달되지 않았습니다!');</script>");
		}

		File dlFile = new File(dlPath, fn);
		if (!dlFile.exists()) {
			out.print("<script>alert('다운로드하실 파일이 존재하지 않습니다!');</script>");
		}
		else if (dlFile.isDirectory()) {
		}
		else {
			int dlFileLen = (int) dlFile.length();
			String userAgent = request.getHeader("User-Agent");

			System.out.println("userAgent="+userAgent);
			boolean isIE = (userAgent.indexOf("MSIE") > -1) || (userAgent.indexOf("Trident") > -1) || ((userAgent.indexOf("Windows") > -1) && (userAgent.indexOf("Edge") > -1));
			System.out.println("isIE="+isIE);
			if (isIE) dfn = URLEncoder.encode(dfn, "UTF8").replaceAll("\\+", " ");
			else dfn = new String(dfn.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1);

			dfn = dfn.replaceAll(",","_").replaceAll(";","_").replaceAll("#","_").replaceAll("'","_").replace("..","_.");
			System.out.println("dfn="+dfn);

			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition","attachment;filename= " +"\""+dfn +"\"");
			response.setHeader("Content-Transper-Encoding", "binary");
			response.setHeader("Pargma", "no-cache");
			response.setHeader("Expires", "-1");
			response.setContentLength(dlFileLen);

		}
	}


%>

