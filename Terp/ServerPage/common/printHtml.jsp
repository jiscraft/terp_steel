<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE HTML>

<html>

<head>
	<title>인쇄 미리보기</title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<meta http-equiv="Pragma" content="no-cache">
	<link rel="stylesheet" type="text/css" href="/app.css" >
	<style type="text/css">
		body {
			background: white;
			color: black;
			font-size: 9pt;
			font-family: "맑은 고딕", "돋움", arial, helvetica, verdana, sans-serif;
			margin: 0 0 50px 0;
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
			margin: 20mm 10mm 10mm 10mm;
		}
		tr { page-break-before: always; }
	</style>
</head>

<body>

	<div id="DocuWrap"></div>
	<div id="ToolBar">
		<button id="BtnPrint">인쇄하기</button>
		<button id="BtnExcel">엑셀로 내보내기</button>
	</div>

	<script>
	
		if (!self.opener.HtmlPrinterParams || !self.opener.HtmlPrinterParams.html) {
			alert('파라메터가 전달되지 않았습니다!');
			//self.close();
		}
	
		var HtmlPrinterParams = self.opener.HtmlPrinterParams;
		self.opener.HtmlPrinterParams = null;

		document.title = (HtmlPrinterParams.title) ? HtmlPrinterParams.title : 'TERP PRINT';
		document.getElementById('DocuWrap').innerHTML = HtmlPrinterParams.html;

		//if (HtmlPrinterParams.isPrintMode) runPrint();
		document.getElementById('BtnPrint').onclick = runPrint;
		document.getElementById('BtnExcel').onclick = exportExcel;

		window.resizeTo(screen.width*.9,screen.height*.9);
		window.moveTo(screen.width*.05,screen.height*.025);

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

		function exportExcel() {
			var contents = document.createElement('div');
			contents.innerHTML = document.getElementById('DocuWrap').innerHTML;
			var childenLen = 0;
			var ctxTables = [];
			for (var i = 0; i < contents.children.length; i++) {
				if ((contents.children[i].tagName !== "STYLE") && (contents.children[i].tagName !== "SCRIPT")) {
					childenLen++;
				}
				if ((contents.children[i].tagName === "TABLE")) {
					ctxTables.push(contents.children[i]);
				}
			}
			if (childenLen === 0) {
				Terp.app.getController('TerpCommon').toastMessage('엑셀로 변환할 내용이 없습니다.', 't');
				return;
			}

			for (var i = 0; i < ctxTables.length; i++) {
				var ctxTable = ctxTables[i];
				ctxTable.style.borderWidth = '0.5pt';
				for (var r = 0; r < ctxTable.rows.length; r++) {
					var tr = ctxTable.rows[r];
					tr.style.width = (tr.offsetWidth === 0) ? 'auto' : ((tr.offsetWidth * 0.75) + 'pt');
					tr.style.height = (tr.offsetHeight === 0) ? 'auto' : ((tr.offsetHeight * 0.75) + 'pt');
					for (var c = 0; c < tr.cells.length; c++) {
						var td = tr.cells[c];
						var val = td.innerHTML.replace(/&nbsp;/g, ' ').trim();
						td.innerHTML = isNaN(val.replace(/,/g, '')) ? val : val.replace(/,/g, '');
						td.style.width = (td.offsetWidth === 0) ? 'auto' : ((td.offsetWidth * 0.75) + 'pt');
						td.style.height = (td.offsetHeight === 0) ? 'auto' : ((td.offsetHeight * 0.75) + 'pt');
						td.style.fontSize = '10pt';
						td.style.borderWidth = '0.5pt';
					}
				}
			}

			var uri = 'data:application/vnd.ms-excel;base64,';
			var base64 = function (s) {
				return window.btoa(unescape(encodeURIComponent(s)));
			};
			var format = function (s, c) {
				return s.replace(/{(\w+)}/g, function (m, p) {
					return c[p];
				});
			};
			var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
			template = template + '<head>';
			template = template + '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
			template = template + '<!--[if gte mso 9]>';
			template = template + '<xml>';
			template = template + '<x:ExcelWorkbook>';
			template = template + '<x:ExcelWorksheets>';
			template = template + '<x:ExcelWorksheet>';
			template = template + '<x:Name>';
			template = template + '{sheetName}</x:Name>';
			template = template + '<x:WorksheetOptions>';
			template = template + '<x:DisplayGridlines/>';
			template = template + '</x:WorksheetOptions>';
			template = template + '</x:ExcelWorksheet>';
			template = template + '</x:ExcelWorksheets>';
			template = template + '</x:ExcelWorkbook>';
			template = template + '</xml>';
			template = template + '<![endif]-->';
			template = template + '</head>';
			template = template + '<body>';
			template = template + '{ctxHtml}';
			template = template + '</body>';
			template = template + '</html>';

			var ctx = {
				sheetName: document.title || 'Sheet1',
				ctxHtml: contents.outerHTML
			};
			var dnfn = document.title + '.xls';
			var html = format(template, ctx);
			var blob = new Blob([html], {type: "application/csv;charset=utf-8;"});
			if ((navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) && window.navigator.msSaveBlob) {
				navigator.msSaveBlob(blob, dnfn);
			}
			else {
				var link = document.createElement("a");
				link.download = dnfn;
				link.href = window.URL.createObjectURL(blob);
				link.click();
			}
		}

	</script>
	
</body>

</html>