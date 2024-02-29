<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE HTML>

<html>

<head>
	<title>기안문서보기</title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<meta http-equiv="Pragma" content="no-cache">
	<link rel="stylesheet" type="text/css" href="/app.css" >
	<style type="text/css">
		body {
			background: white;
			color: black;
			font-size: 10pt;
			font-family: "맑은 고딕", "돋움", arial, helvetica, verdana, sans-serif;
			margin: 0;
		}
		#ToolBar {
			position: fixed;
			width: 100%;
			bottom: 0;
			padding: 10px;
			text-align: center;
			background-color: #edf0f3;
			border-bottom: 1px solid #9bbbd7;
		}
		#DocuWrap {
			padding: 10px;
			margin-bottom: 50px;
		}
	</style>
	<style type="text/css" media="print">
		@page {
			size: auto;
			margin: 20mm 0mm 10mm 0mm;
		}
		tr { page-break-before: always; }
	</style>
</head>

<body>

	<div id="DocuWrap">
		<!--
		<div id="Header" style="text-align:center;"><img src="http://erp.kerheung.co.kr:8080/res/images/ghsu/bk_ghsu_logo.png" width="200"></div>
		-->
		<div id="BodyWrap"></div>
		<!--
		<div id="Footer"></div>
		-->
	</div>
	<div id="ToolBar"><button id="BtnPrint">인&nbsp;&nbsp;쇄</button></div>

	<script>

		if (!self.opener.EaDocViewerParams || !self.opener.EaDocViewerParams.openerController || !self.opener.EaDocViewerParams.docHtml) {
			alert('파라메터가 전달되지 않았습니다!');
			//self.close();
		}

		var eaDocViewerParams = self.opener.EaDocViewerParams;
		self.opener.EaDocViewerParams = null;

		document.getElementById('BodyWrap').innerHTML = eaDocViewerParams.docHtml;
		var alnBoxNode = document.querySelectorAll('.tsoft-ea-apro-line-box')[0];
		var docHeadNode = document.querySelectorAll('.tsoft-ea-apro-doc-head')[0];
		var docTitleTdNodes = document.querySelectorAll('.tsoft-ea-apro-doc-title td');

		if (alnBoxNode && docHeadNode && docTitleTdNodes && (docTitleTdNodes.length > 0)) {
			alnBoxNode.parentNode.style.width = alnBoxNode.offsetWidth + 'px';
			docHeadNode.style.height = alnBoxNode.offsetHeight + 'px';
			for (var i=0; i<docTitleTdNodes.length; i++) {
				docTitleTdNodes[i].style.height = docHeadNode.lastChild.lastChild.offsetHeight + 'px';
			}
		}

		self.resizeTo(850,screen.height*.9);
		self.moveTo((screen.width - self.width) / 2, (screen.height - self.height) / 2);

		var atags = document.querySelectorAll('a');
		atags.forEach(function(atag,idx) {
			console.log(atag);
			atag.removeAttribute('onclick');
			console.log(atag);
		});

		if (eaDocViewerParams.isPrintMode) {
			//runPrint();
		}
		document.getElementById('BtnPrint').onclick = runPrint;

		function runPrint() {
			document.getElementById('ToolBar').style.display = 'none';
			setTimeout(function() {
				if ((navigator.userAgent.indexOf("MSIE") > -1) || (navigator.userAgent.indexOf("Trident") > -1)) {
					self.focus();
					window.print();
				}
				else {
					self.print();
				}
				document.getElementById('ToolBar').style.display = '';
			},500);
		}
	</script>

</body>

</html>