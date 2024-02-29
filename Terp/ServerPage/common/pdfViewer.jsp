<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="kr.terp.common.util.Common"%>
<%@ page import="java.io.File" %>
<%@ page import="java.util.regex.Matcher" %>
<%
	request.setCharacterEncoding("UTF-8");
	String url = request.getParameter("url");
%>
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
		window.resizeTo(screen.width*.9,screen.height*.9);
		window.moveTo(screen.width*.05,screen.height*.025);
<%
	if (Common.isEmpty(url)) {
%>
		alert("PDF 파일경로가 전달되지 않았습니다.!");
//		self.close();
<%
	}
	else {
	}
%>
	</script>
</head>
<body>

	<div>
		<object data="<%=url%>#view=FitH" type="application/pdf">
<%--			<p><a href="http://get.adobe.com/kr/reader/otherversions/">어도비 리더 설치</a></p>--%>
		</object>
	</div>

</body>
</html>