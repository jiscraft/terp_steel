<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="kr.terp.common.util.ExcelUtil" %>
<%@ page import="kr.terp.common.util.SpireUtil" %>
<%@ page import="org.apache.poi.ss.usermodel.*" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.List" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="org.json.simple.parser.ParseException" %>
<%

	request.setCharacterEncoding("UTF-8");
	PrintWriter outResult = response.getWriter();
	String sendData = request.getParameter("sendData");
	String queryString = "";
	String queryString_l = "";
	String resultString = "";
	String strErrorMessage = "";

	JSONParser jsonParser = new JSONParser();
	TobeQueryExec execQuery = new TobeQueryExec();
	TobeCommonFunction tcf = new TobeCommonFunction();

	List<String> queryList_h = new ArrayList<String>();
	List<String> queryList_l = new ArrayList<String>();
	JSONObject jsonResults_h = new JSONObject();
	JSONObject jsonResults_l = new JSONObject();
	boolean success = false;
	JSONArray jsonResultData_h= new JSONArray();
	JSONArray jsonResultData_l = new JSONArray();

	try {
		//hdata
		JSONObject sendDataJson = (JSONObject)jsonParser.parse(sendData);

		queryString = queryString + "exec usp_pm_po_print  'hdata' ";
		queryString = queryString + ", @p_id_user = " + tcf.getJsonValueSimple("string", sendDataJson, "loginIduser");
		queryString = queryString + ", @p_cd_c = " + tcf.getJsonValueSimple("string", sendDataJson, "loginCdc");
		queryString = queryString + ", @p_no_po = " + tcf.getJsonValueSimple("string", sendDataJson, "no_po");

		queryList_h.add(queryString);
		jsonResults_h = (JSONObject) jsonParser.parse(execQuery.queryExec(queryList_h, "terp", "json"));
		success = (boolean) jsonResults_h.get("success");
		jsonResultData_h = (JSONArray) jsonResults_h.get("data");

		//ldata
		queryString_l = queryString_l + "exec usp_pm_po_print 'ldata' ";
		queryString_l = queryString_l + ", @p_id_user = " + tcf.getJsonValueSimple("string", sendDataJson, "loginIduser");
		queryString_l = queryString_l + ", @p_cd_c = " + tcf.getJsonValueSimple("string", sendDataJson, "loginCdc");
		queryString_l = queryString_l + ", @p_no_po = " + tcf.getJsonValueSimple("string", sendDataJson, "no_po");
		queryList_l.add(queryString_l);
		jsonResults_l = (JSONObject) jsonParser.parse(execQuery.queryExec(queryList_l, "terp", "json"));
		success = (boolean) jsonResults_l.get("success");
		jsonResultData_l = (JSONArray) jsonResults_l.get("data");

//		System.out.println("2");
		if (success && (jsonResultData_h.size() > 0)) {



			String erpFileServer = request.getServletContext().getInitParameter("localFileServer");
//			System.out.println("4");
			String tplPath = String.format("%sexcel_forms\\", erpFileServer);
//			System.out.println("5");
			Workbook wb = ExcelUtil.getWorkbookFromFile(String.format("%s\\구매발주서.xlsx", tplPath, 10000));
//			System.out.println("6");
			Sheet sheet = ExcelUtil.getSheet(wb, 0);
//			System.out.println("7");

			// 페이지 맞춤
			sheet.getPrintSetup().setPaperSize(PrintSetup.A4_PAPERSIZE);
			sheet.getPrintSetup().setLandscape(false);
			sheet.getPrintSetup().setFitWidth((short)1);
			sheet.getPrintSetup().setFitHeight((short)0);
			sheet.setFitToPage(true);


			wb.setSheetName(0, "구매발주서");

			int rowIdx = 1;

			JSONObject firstJsonData = (JSONObject) jsonResultData_h.get(0);
			ExcelUtil.setCellValue(sheet, rowIdx, 3, firstJsonData.get("no_po").toString());
			ExcelUtil.setCellValue(sheet, rowIdx, 9, firstJsonData.get("dt_po").toString());
			ExcelUtil.setCellValue(sheet, rowIdx, 16, firstJsonData.get("nm_p").toString());
			ExcelUtil.setCellValue(sheet, rowIdx, 22, firstJsonData.get("dc_name").toString());
//
			ExcelUtil.setCellValue(sheet, rowIdx+1, 3, firstJsonData.get("nm_site").toString());
			ExcelUtil.setCellValue(sheet, rowIdx+1, 9,"" );
			ExcelUtil.setCellValue(sheet, rowIdx+1, 16, firstJsonData.get("dc_p_address").toString());
			ExcelUtil.setCellValue(sheet, rowIdx+1, 22, "");
//
			ExcelUtil.setCellValue(sheet, rowIdx+2, 3, firstJsonData.get("nm_o").toString());
			ExcelUtil.setCellValue(sheet, rowIdx+2, 9, firstJsonData.get("nm_e").toString());
			ExcelUtil.setCellValue(sheet, rowIdx+2, 16, firstJsonData.get("dc_tel1").toString());
			ExcelUtil.setCellValue(sheet, rowIdx+2, 22, "");

			ExcelUtil.setCellValue(sheet, rowIdx+3, 9, firstJsonData.get("dc_hp").toString());
			ExcelUtil.setCellValue(sheet, rowIdx+3, 16, firstJsonData.get("dc_mail").toString());

			ExcelUtil.setCellValue(sheet, rowIdx+5, 3, firstJsonData.get("dt_rcv_default").toString());
			ExcelUtil.setCellValue(sheet, rowIdx+5, 9, firstJsonData.get("nm_split").toString());

			ExcelUtil.setCellValue(sheet, rowIdx+6, 3, firstJsonData.get("nm_pm010").toString());
			ExcelUtil.setCellValue(sheet, rowIdx+6, 9, firstJsonData.get("nm_trans").toString());



			rowIdx = 10;
			for (int i = 0; i < jsonResultData_l.size(); i++) {
				Row row = ExcelUtil.getRow(sheet, rowIdx);
				JSONObject jsonData = (JSONObject) jsonResultData_l.get(i);

				ExcelUtil.setCellValue(sheet, rowIdx, 0, jsonData.get("ln_po").toString());

				ExcelUtil.setCellValue(sheet, rowIdx, 2, jsonData.get("nm_i").toString());

				ExcelUtil.setCellValue(sheet, rowIdx, 5, jsonData.get("nm_spec").toString());

				ExcelUtil.setCellValue(sheet, rowIdx, 8, jsonData.get("cd_spec").toString());

				ExcelUtil.setCellValue(sheet, rowIdx, 11, ((Double) jsonData.get("nb_size")));

				ExcelUtil.setCellValue(sheet, rowIdx, 13, ((Double) jsonData.get("qt_po")));

				ExcelUtil.setCellValue(sheet, rowIdx, 15, ((Double) jsonData.get("qt_po_spec")));

				ExcelUtil.setCellValue(sheet, rowIdx, 17, ((Double) jsonData.get("up_po")));

				ExcelUtil.setCellValue(sheet, rowIdx, 19, ((Double) jsonData.get("at_po")));

				ExcelUtil.setCellValue(sheet, rowIdx, 22, jsonData.get("dc_remark").toString());
				rowIdx++;
			}


			ExcelUtil.updateFormular(wb, "xlsx");

			String savePath = String.format("%sdownloadData", erpFileServer);
			String strNow = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
			String xlsFilePath = String.format("%s\\%s", savePath, strNow.substring(0,8));
			String xlsFileName = String.format(sendDataJson.get("loginIduser").toString() + "_구매발주서_%s.xlsx",  strNow);

			ExcelUtil.writeExcelFile(wb, xlsFilePath, xlsFileName);

			// Spire.Xls를 이용한 pdf 변환
			String pdfFileName = String.format(sendDataJson.get("loginIduser").toString()+"_구매발주서_%s.pdf",  strNow);
			SpireUtil spireUtil = new SpireUtil();
			spireUtil.exportToPdf(xlsFilePath, xlsFileName, pdfFileName);

			JSONObject responseData = new JSONObject();
			responseData.put("path", xlsFilePath);
			responseData.put("xls", xlsFileName);
			responseData.put("pdf", pdfFileName);
			resultString = "{\"success\":" + true + ", \"data\": [" + responseData.toString() + "]}";
		}
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
