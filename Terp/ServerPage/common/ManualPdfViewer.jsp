<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="kr.terp.common.util.Common"%>
<%@ page import="java.io.File" %>
<%@ page import="java.util.regex.Matcher" %>
<!DOCTYPE HTML>

<html>
	<title>TERP</title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<meta http-equiv="Pragma" content="no-cache">
	<style type="text/css">
		html, body, div, object {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	</style>
	<script>
<%
	request.setCharacterEncoding("UTF-8");
	boolean isLogon = true;
	// ((session != null) && (session.getAttribute("TBLON") != null) && (session.getAttribute("TBLON") == "1") && (session.getAttribute("TBLDT") != null));
	if  (!isLogon) {
%>
		//self.close();
<%
	}

	String path = request.getParameter("path");
	if (!Common.isEmpty(path)) {
		String root = request.getSession().getServletContext().getRealPath("/");
		System.out.println(path.replaceAll("/", Matcher.quoteReplacement(File.separator)));
		File f = new File(root, path.replaceAll("/", Matcher.quoteReplacement(File.separator)));
		System.out.println(f.getAbsolutePath()+" ==> "+f.exists());
		if (!f.exists()) {
%>
		alert("요청하신 PDF 파일을 찾을 수 없습니다!");
		self.close();
<%
		}
	}
	else {
	}
%>
	</script>
</head>
<body>

	<div>
		<object data="<%=path%>#view=FitH" type="application/pdf">
<%--			<p><a href="http://get.adobe.com/kr/reader/otherversions/">어도비 리더 설치</a></p>--%>
		</object>
	</div>

</body>
</html>