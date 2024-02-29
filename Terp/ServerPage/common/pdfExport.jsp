<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="kr.terp.common.util.Common" %>
<%@ page import="kr.terp.common.util.FileUtil" %>
<%@ page import="kr.terp.common.util.MailUtil" %>
<%@ page import="org.apache.commons.fileupload.FileItem" %>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory" %>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"  %>
<%@ page import="org.json.simple.JSONArray"  %>
<%@ page import="org.json.simple.JSONObject" %>
<!DOCTYPE HTML>

<html>

<head>
	<title>PDF로 내보내기</title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<meta http-equiv="Pragma" content="no-cache">
	<link rel="stylesheet" type="text/css" href="/app.css" >
	<style type="text/css">
		body {
			background: white;
			color: black;
			font-size: 9pt;
			font-family: "맑은 고딕", "돋움", arial, helvetica, verdana, sans-serif;
		}
		#DocuWrap {
			width: 190mm;
			border-width: 0;
		}
		#DocuWrap table {
			width: 100% !important;
		}
	</style>
</head>

<body>

	<div id="DocuWrap"></div>

	<script src="../../res/html2pdf/html2pdf.bundle.min.js"></script>
	<script>

		console.log(self.opener);
		console.log(self.opener.PdfExporterParams);
		if (!self.opener.PdfExporterParams || !self.opener.PdfExporterParams.html) {
			alert('파라메터가 전달되지 않았습니다!');
			self.close();
		}

		var PdfExporterParams = self.opener.PdfExporterParams;
		self.opener.PdfExporterParams = null;

		document.title = (PdfExporterParams.title) ? PdfExporterParams.title : 'TERP PDF Exporter';
		document.querySelector('#DocuWrap').innerHTML = PdfExporterParams.html;

		try {
			var pdfObject = html2pdf().from(document.querySelector('#DocuWrap'));
			pdfObject.set({
				margin: [ 20, 10, 10, 10 ],
				filename: 'test.pdf',
				html2canvas: { scale: 1 },
				image: { type: 'png' },
				jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4', compressPDF: true }
			});
			pdfObject.output('blob').then(function(blob) {
				if (PdfExporterParams.success) PdfExporterParams.success(blob, self);
			});
		}
		catch (error) {
			if (PdfExporterParams.error) PdfExporterParams.error(error, self);
		}

	</script>

</body>

</html>