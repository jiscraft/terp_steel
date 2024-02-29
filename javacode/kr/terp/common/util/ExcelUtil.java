package kr.terp.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import org.apache.poi.ooxml.*;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.servlet.http.HttpServletResponse;


public class ExcelUtil {

	public static JSONObject jsonToExcel(JSONObject data, String path) {
		File xlsDir = new File(path);
		if (!xlsDir.exists()) {
			xlsDir.mkdirs();
		}

		JSONObject jsonResponse = new JSONObject();
		if (data.size() > 60000) {
			jsonResponse = jsonToXlsx(data, path);
		}
		else {
			jsonResponse = jsonToXlsx(data, path);
		}
		return jsonResponse;
	}

	@SuppressWarnings("finally")
	public static JSONObject jsonToXls(JSONObject data, String path) {
		JSONObject jsonResponse = new JSONObject();
		JSONArray jsonResults = new JSONArray();
		JSONArray jsonErrors = new JSONArray();

		JSONArray dataIndex = (JSONArray)data.get("dataIndex");
		JSONArray header = (JSONArray)data.get("header");
		JSONArray values = (JSONArray)data.get("values");
		JSONArray type = (JSONArray)data.get("type");

		int rownum = 0;
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet(data.get("title").toString());

		/*
		HSSFRow dataIndexRow = sheet.createRow(rownum++);
		for (int c=0; c<dataIndex.size(); c++) {
			HSSFCell dataIndexCell = dataIndexRow.createCell(c);
			dataIndexCell.setCellValue(dataIndex.get(c).toString());
		}
		*/

		HSSFRow headerRow = sheet.createRow(rownum++);
		for (int c=0; c<header.size(); c++) {
			HSSFCell headerCell = headerRow.createCell(c);
			headerCell.setCellValue(header.get(c).toString());
		}

		for (int r=0; r<values.size(); r++) {
			HSSFRow dataRow = sheet.createRow(rownum++);
			JSONObject rec = (JSONObject)values.get(r);
			Set<String> keys = rec.keySet();
			for (String key : keys) {
				int idx = -1;
				for (int f=0; f<dataIndex.size(); f++) {
					if (key.equalsIgnoreCase(dataIndex.get(f).toString())) {
						idx = f;
						break;
					}
				}

				if (idx > -1) {
					HSSFCell dataCell = dataRow.createCell(idx);
					HSSFDataFormat dataFormat = workbook.createDataFormat();
					HSSFCellStyle cellStyle = workbook.createCellStyle();

					if (rec.get(key) instanceof Long) {
						dataCell.setCellType(CellType.NUMERIC);
						if (type.get(idx).equals("float")) {
							dataCell.setCellValue((Long)rec.get(key)*1.0);
							cellStyle.setDataFormat(dataFormat.getFormat("#,##0.0000"));
						}
						else {
							dataCell.setCellValue((Long)rec.get(key));
							cellStyle.setDataFormat(dataFormat.getFormat("#,##0"));
						}
						dataCell.setCellStyle(cellStyle);
					}
					else if (rec.get(key) instanceof Double) {
						dataCell.setCellType(CellType.NUMERIC);
						if (type.get(idx).equals("int")) {
							dataCell.setCellValue(((Double)rec.get(key)).longValue());
							cellStyle.setDataFormat(dataFormat.getFormat("#,##0"));
						}
						else {
							dataCell.setCellValue((Double)rec.get(key));
							cellStyle.setDataFormat(dataFormat.getFormat("#,##0.0000"));
						}
						dataCell.setCellStyle(cellStyle);
					}
					else {
						dataCell.setCellType(CellType.STRING);
						dataCell.setCellValue(rec.get(key).toString());
					}
					/*
					if (type.get(idx).equals("int")) {
						dataCell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
						System.out.println("int="+(Long)rec.get(key));
						dataCell.setCellValue((Long)rec.get(key));
						dataFormat = workbook.createDataFormat();
						cellStyle = workbook.createCellStyle();
						cellStyle.setDataFormat(dataFormat.getFormat("#,##0"));
						dataCell.setCellStyle(cellStyle);
					}
					else if (type.get(idx).equals("float")) {
						dataCell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
						if (rec.get(key) instanceof Long) {
							System.out.println("float="+(Long)(rec.get(key)));
							dataCell.setCellValue((Long)rec.get(key));
						}
						else if (rec.get(key) instanceof Double) {
							System.out.println("float="+(Double)(rec.get(key)));
							dataCell.setCellValue((Double)rec.get(key));
						}
						dataFormat = workbook.createDataFormat();
						cellStyle = workbook.createCellStyle();
						cellStyle.setDataFormat(dataFormat.getFormat("#,##0.0000"));
						dataCell.setCellStyle(cellStyle);
					}
					else {
						dataCell.setCellType(HSSFCell.CELL_TYPE_STRING);
						dataCell.setCellValue(rec.get(key).toString());
					}
					*/
				}
			}
		}

		for (int c=0; c<sheet.getRow(0).getPhysicalNumberOfCells(); c++) {
			sheet.autoSizeColumn(c);
			sheet.setColumnWidth(c, sheet.getColumnWidth(c)+2000);
		}

		FileOutputStream xfs = null;
		try {
			File xf = new File(path, data.get("title")+".xls");
			xfs = new FileOutputStream(xf);
			workbook.write(xfs);

			jsonResponse.put("xfn", xf.getName());
			jsonResponse.put("success", 1);
		}
		catch (FileNotFoundException e) {
			jsonErrors.add(Common.getErrorJson(e));
			jsonResponse.put("errors", jsonErrors);
			jsonResponse.put("success", 0);
			e.printStackTrace();
			e.printStackTrace();
		}
		catch (IOException e) {
			jsonErrors.add(Common.getErrorJson(e));
			jsonResponse.put("errors", jsonErrors);
			jsonResponse.put("success", 0);
			e.printStackTrace();
			e.printStackTrace();
		}
		finally {
			try {
				if (xfs != null) {
					xfs.close();
					xfs = null;
				}
			}
			catch (Exception e) {
				jsonErrors.add(Common.getErrorJson(e));
				jsonResponse.put("errors", jsonErrors);
				jsonResponse.put("success", 0);
				e.printStackTrace();
			}
			finally {
//System.out.println(jsonResponse);
				return jsonResponse;
			}
		}
	}

	@SuppressWarnings("finally")
	public static JSONObject jsonToXlsx(JSONObject data, String path) {
		JSONObject jsonResponse = new JSONObject();
		JSONArray jsonResults = new JSONArray();
		JSONArray jsonErrors = new JSONArray();

		JSONArray dataIndex = (JSONArray)data.get("dataIndex");
		JSONArray header = (JSONArray)data.get("header");
		JSONArray values = (JSONArray)data.get("values");
		JSONArray type = (JSONArray)data.get("type");

		int rownum = 0;
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet(data.get("title").toString());

		/*
		XSSFRow dataIndexRow = sheet.createRow(rownum++);
		for (int c=0; c<dataIndex.size(); c++) {
			XSSFCell dataIndexCell = dataIndexRow.createCell(c);
			dataIndexCell.setCellValue(dataIndex.get(c).toString());
		}
		*/

		XSSFRow headerRow = sheet.createRow(rownum++);
		for (int c=0; c<header.size(); c++) {
			XSSFCell headerCell = headerRow.createCell(c);
			headerCell.setCellValue(header.get(c).toString());
		}

		for (int r=0; r<values.size(); r++) {
			XSSFRow dataRow = sheet.createRow(rownum++);
			JSONObject rec = (JSONObject)values.get(r);
			Set<String> keys = rec.keySet();
			for (String key : keys) {
				int idx = -1;
				for (int f=0; f<dataIndex.size(); f++) {
					if (key.equalsIgnoreCase(dataIndex.get(f).toString())) {
						idx = f;
						break;
					}
				}

				if (idx > -1) {
					XSSFCell dataCell = dataRow.createCell(idx);
					XSSFDataFormat dataFormat = workbook.createDataFormat();
					XSSFCellStyle cellStyle = workbook.createCellStyle();

					if (rec.get(key) instanceof Long) {
						dataCell.setCellType(CellType.NUMERIC);
						if ((type != null) && (type.size() == dataIndex.size()) && (type.get(idx) != null) && type.get(idx).equals("float")) {
							dataCell.setCellValue((Long)rec.get(key)*1.0);
							cellStyle.setDataFormat(dataFormat.getFormat("#,##0.0000"));
						}
						else {
							dataCell.setCellValue((Long)rec.get(key));
							cellStyle.setDataFormat(dataFormat.getFormat("#,##0"));
						}
						dataCell.setCellStyle(cellStyle);
					}
					else if (rec.get(key) instanceof Double) {
						dataCell.setCellType(CellType.NUMERIC);
						if ((type != null) && (type.size() == dataIndex.size()) && (type.get(idx) != null) && type.get(idx).equals("int")) {
							dataCell.setCellValue(((Double)rec.get(key)).longValue());
							cellStyle.setDataFormat(dataFormat.getFormat("#,##0"));
						}
						else {
							dataCell.setCellValue((Double)rec.get(key));
							cellStyle.setDataFormat(dataFormat.getFormat("#,##0.0000"));
						}
						dataCell.setCellStyle(cellStyle);
					}
					else {
						dataCell.setCellType(CellType.STRING);
						dataCell.setCellValue(rec.get(key).toString());
					}
					/*
					if (type.get(idx).equals("int")) {
						dataCell.setCellType(CellType.NUMERIC);
						System.out.println("int="+(Long)rec.get(key));
						dataCell.setCellValue((Long)rec.get(key));
						dataFormat = workbook.createDataFormat();
						cellStyle = workbook.createCellStyle();
						cellStyle.setDataFormat(dataFormat.getFormat("#,##0"));
						dataCell.setCellStyle(cellStyle);
					}
					else if (type.get(idx).equals("float")) {
						dataCell.setCellType(CellType.NUMERIC);
						if (rec.get(key) instanceof Long) {
							System.out.println("float="+(Long)(rec.get(key)));
							dataCell.setCellValue((Long)rec.get(key));
						}
						else if (rec.get(key) instanceof Double) {
							System.out.println("float="+(Double)(rec.get(key)));
							dataCell.setCellValue((Double)rec.get(key));
						}
						dataFormat = workbook.createDataFormat();
						cellStyle = workbook.createCellStyle();
						cellStyle.setDataFormat(dataFormat.getFormat("#,##0.0000"));
						dataCell.setCellStyle(cellStyle);
					}
					else {
						dataCell.setCellType(CellType.STRING);
						dataCell.setCellValue(rec.get(key).toString());
					}
					*/
				}
			}
		}

		for (int c=0; c<sheet.getRow(0).getPhysicalNumberOfCells(); c++) {
			sheet.autoSizeColumn(c);
			System.out.println("sheet.getColumnWidth("+c+")="+sheet.getColumnWidth(c));
			sheet.setColumnWidth(c, sheet.getColumnWidth(c)+2000);
		}

		FileOutputStream xfs = null;
		try {
			File xf = new File(path, data.get("title")+".xlsx");
			xfs = new FileOutputStream(xf);
			workbook.write(xfs);

			jsonResponse.put("xfn", xf.getName());
			jsonResponse.put("success", 1);
		}
		catch (FileNotFoundException e) {
			jsonErrors.add(Common.getErrorJson(e));
			jsonResponse.put("errors", jsonErrors);
			jsonResponse.put("success", 0);
			e.printStackTrace();
			e.printStackTrace();
		}
		catch (IOException e) {
			jsonErrors.add(Common.getErrorJson(e));
			jsonResponse.put("errors", jsonErrors);
			jsonResponse.put("success", 0);
			e.printStackTrace();
			e.printStackTrace();
		}
		finally {
			try {
				if (xfs != null) {
					xfs.close();
					xfs = null;
				}
			}
			catch (Exception e) {
				jsonErrors.add(Common.getErrorJson(e));
				jsonResponse.put("errors", jsonErrors);
				jsonResponse.put("success", 0);
				e.printStackTrace();
			}
			finally {
//System.out.println(jsonResponse);
				return jsonResponse;
			}
		}
	}


	public static JSONObject excelToJson(File xf) {
		JSONObject jsonResponse = new JSONObject();
		if (xf.exists()) {
			if (xf.getName().endsWith(".xlsx")) {
				jsonResponse = xlsxToJson(xf);
			}
			else if (xf.getName().endsWith(".xls")) {
				jsonResponse = xlsToJson(xf);
			}
		}
		return jsonResponse;
	}

	public static JSONObject jsonToExcel(JSONArray header, JSONArray data, String label, String path, String xfn) {
		JSONObject jsonResponse = new JSONObject();
		if (data.size() > 60000) {
			xfn = xfn + ".xlsx";
			jsonResponse = jsonToXls(header, data, label, path, xfn);
		}
		else {
			xfn = xfn + ".xls";
			jsonResponse = jsonToXls(header, data, label, path, xfn);
		}
		return jsonResponse;
	}

	@SuppressWarnings("finally")
	public static JSONObject jsonToXls(JSONArray header, JSONArray data, String label, String path, String xfn) {
		JSONObject jsonResponse = new JSONObject();
		JSONArray jsonResults = new JSONArray();
		JSONArray jsonErrors = new JSONArray();

		JSONArray nmFlds = (JSONArray)((JSONObject)header.get(0)).get("nm");
		JSONArray hdFlds = (JSONArray)((JSONObject)header.get(0)).get("hd");

		int rownum = 0;
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet(label);

		Row nmFldsRow = sheet.createRow(rownum++);
		for (int c=0; c<nmFlds.size(); c++) {
			Cell nmFldsCell = nmFldsRow.createCell(c);
			nmFldsCell.setCellValue(nmFlds.get(c).toString());
		}

		Row hdFldsRow = sheet.createRow(rownum++);
		for (int c=0; c<hdFlds.size(); c++) {
			Cell hdFldsCell = hdFldsRow.createCell(c);
			hdFldsCell.setCellValue(hdFlds.get(c).toString());
		}

		for (int r=0; r<data.size(); r++) {
			Row dataRow = sheet.createRow(rownum++);
			JSONObject rec = (JSONObject)data.get(r);
			Set<String> keys = rec.keySet();
			for (String key : keys) {
				int idx = -1;
				for (int f=0; f<nmFlds.size(); f++) {
					if (key.equalsIgnoreCase(nmFlds.get(f).toString())) {
						idx = f;
						break;
					}
				}
System.out.println(idx+": "+key+"=");
				if (idx > -1) {
System.out.println(nmFlds.get(idx)+"="+hdFlds.get(idx));
					Cell dataCell = dataRow.createCell(idx);
					Object objVal = rec.get(key);
					if (objVal instanceof Date) {
						//System.out.println((Date)objVal+" => Date");
						dataCell.setCellValue((Date)objVal);
					}
					else if (objVal instanceof Boolean) {
						//System.out.println((Boolean)objVal+" => Boolean");
						dataCell.setCellValue((Boolean)objVal);
					}
					else if (objVal instanceof String) {
						//System.out.println((String)objVal+" => String");
						dataCell.setCellValue((String)objVal);
					}
					else if (objVal instanceof Integer) {
						//System.out.println((Integer)objVal+" => Integer");
						dataCell.setCellValue((Integer)objVal);
					}
					else if (objVal instanceof Double) {
						//System.out.println((Double)objVal+" => Double");
						dataCell.setCellValue((Double)objVal);
					}
					else {
						//System.out.println(" => Else");
//						dataCell.setCellValue("");
					}
				}
			}
		}

		FileOutputStream xfs = null;
		try {
			File xf = new File(path, xfn);
			xfs = new FileOutputStream(xf);
			workbook.write(xfs);

//			jsonResponse.put("xfp", xf.getAbsolutePath());
			jsonResponse.put("xfn", xf.getName());
			jsonResponse.put("success", 1);
		}
		catch (FileNotFoundException e) {
			jsonErrors.add(Common.getErrorJson(e));
			jsonResponse.put("errors", jsonErrors);
			jsonResponse.put("success", 0);
			e.printStackTrace();
			e.printStackTrace();
		}
		catch (IOException e) {
			jsonErrors.add(Common.getErrorJson(e));
			jsonResponse.put("errors", jsonErrors);
			jsonResponse.put("success", 0);
			e.printStackTrace();
			e.printStackTrace();
		}
		finally {
			try {
				if (xfs != null) {
					xfs.close();
					xfs = null;
				}
			}
			catch (Exception e) {
				jsonErrors.add(Common.getErrorJson(e));
				jsonResponse.put("errors", jsonErrors);
				jsonResponse.put("success", 0);
				e.printStackTrace();
			}
			finally {
//System.out.println(jsonResponse);
				return jsonResponse;
			}
		}
	}

	@SuppressWarnings("finally")
	public static JSONObject xlsxToJson(File xf) {
		JSONObject jsonResponse = new JSONObject();
		JSONArray jsonResults = new JSONArray();
		JSONArray jsonErrors = new JSONArray();

		FileInputStream xfs = null;
		XSSFWorkbook workbook = null;
		XSSFSheet sheet = null;

		try {
			xfs = new FileInputStream(xf);
			workbook = new XSSFWorkbook(xfs);
			sheet = workbook.getSheetAt(0);
			int rowCnt = getIteratorCount(sheet.iterator());

			Row hRow = sheet.getRow(0);
			int cellCnt = getIteratorCount(hRow.cellIterator());

			JSONArray jsonHeader = new JSONArray();
			for (int h=0; h<cellCnt; h++) {
				String cv = hRow.getCell(h).getStringCellValue().trim();
				jsonHeader.add(Common.isEmpty(cv) ? "CELL-" +h : cv);
			}
//System.out.println(jsonHeader);

			for (int r=1; r<rowCnt; r++) {
				Row row = sheet.getRow(r);
				JSONObject jsonRecord = new JSONObject();
				for (int c=0; c<cellCnt; c++) {
					String header = (String)jsonHeader.get(c);
					XSSFCell cell = (XSSFCell)row.getCell(c, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
					cell.setCellType(CellType.STRING);

					if (cell.getCellType() == CellType.BOOLEAN) {
						jsonRecord.put(header, (cell.getBooleanCellValue() == true) ? "1" : "0");
					}
					else if (cell.getCellType() == CellType.NUMERIC) {
						jsonRecord.put(header, cell.getNumericCellValue());
					}
					else if (cell.getCellType() == CellType.STRING) {
						jsonRecord.put(header, Common.isEmpty(cell.getStringCellValue()) ? "" : cell.getStringCellValue());
					}
					else {
						jsonRecord.put(header, "");
					}
				}
				jsonResults.add(jsonRecord);
			}

			jsonResponse.put("results", jsonResults);
			jsonResponse.put("header", jsonHeader);
			jsonResponse.put("sheet", sheet.getSheetName());
			jsonResponse.put("success", 1);
		}
		catch (IOException e) {
			jsonErrors.add(Common.getErrorJson(e));
			jsonResponse.put("errors", jsonErrors);
			jsonResponse.put("sheet", sheet.getSheetName());
			jsonResponse.put("success", 0);
			e.printStackTrace();
		}
		catch(Exception e){
			e.printStackTrace();
			jsonErrors.add(Common.getErrorJson(e));
			jsonResponse.put("errors", jsonErrors);
			jsonResponse.put("sheet", sheet.getSheetName());
			jsonResponse.put("success", 0);
			e.printStackTrace();
		}
		finally {
			try {
				if (xfs != null) {
					xfs.close();
					xfs = null;
				}
			}
			catch (Exception e) {
				jsonErrors.add(Common.getErrorJson(e));
				jsonResponse.put("errors", jsonErrors);
				jsonResponse.put("sheet", sheet.getSheetName());
				jsonResponse.put("success", 0);
				e.printStackTrace();
			}
			finally {
//System.out.println(jsonResponse);
				return jsonResponse;
			}
		}
	}

	@SuppressWarnings("finally")
	public static JSONObject xlsToJson(File xf) {
		JSONObject jsonResponse = new JSONObject();
		JSONArray jsonResults = new JSONArray();
		JSONArray jsonErrors = new JSONArray();

		FileInputStream xfs = null;
		HSSFWorkbook workbook = null;
		HSSFSheet sheet = null;

		try {
			xfs = new FileInputStream(xf);
			workbook = new HSSFWorkbook(xfs);
			sheet = workbook.getSheetAt(0);
			int rowCnt = getIteratorCount(sheet.iterator());

			Row hRow = sheet.getRow(0);
			int cellCnt = getIteratorCount(hRow.cellIterator());

			JSONArray jsonHeader = new JSONArray();
			for (int h=0; h<cellCnt; h++) {
				String cv = hRow.getCell(h).getStringCellValue().trim();
				jsonHeader.add(Common.isEmpty(cv) ? "CELL-" +h : cv);
			}
//System.out.println(jsonHeader);

			for (int r=1; r<rowCnt; r++) {
				Row row = sheet.getRow(r);
				JSONObject jsonRecord = new JSONObject();
				for (int c=0; c<cellCnt; c++) {
					String header = (String)jsonHeader.get(c);
					XSSFCell cell = (XSSFCell)row.getCell(c, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
					cell.setCellType(CellType.STRING);

					if (cell.getCellType() == CellType.BOOLEAN) {
						jsonRecord.put(header, (cell.getBooleanCellValue() == true) ? "1" : "0");
					}
					else if (cell.getCellType() == CellType.BOOLEAN) {
					}
					else if (cell.getCellType() == CellType.NUMERIC) {
						jsonRecord.put(header, cell.getNumericCellValue());
					}
					else if (cell.getCellType() == CellType.STRING) {
						jsonRecord.put(header, Common.isEmpty(cell.getStringCellValue()) ? "" : cell.getStringCellValue());
					}
					else {
						jsonRecord.put(header, "");
					}
				}
				jsonResults.add(jsonRecord);
			}

			jsonResponse.put("results", jsonResults);
			jsonResponse.put("header", jsonHeader);
			jsonResponse.put("sheet", sheet.getSheetName());
			jsonResponse.put("success", 1);
		}
		catch (IOException e) {
			jsonErrors.add(Common.getErrorJson(e));
			jsonResponse.put("errors", jsonErrors);
			jsonResponse.put("sheet", sheet.getSheetName());
			jsonResponse.put("success", 0);
			e.printStackTrace();
		}
		finally {
			try {
				if (xfs != null) {
					xfs.close();
					xfs = null;
				}
			}
			catch (Exception e) {
				jsonErrors.add(Common.getErrorJson(e));
				jsonResponse.put("errors", jsonErrors);
				jsonResponse.put("sheet", sheet.getSheetName());
				jsonResponse.put("success", 0);
				e.printStackTrace();
			}
			finally {
//System.out.println(jsonResponse);
				return jsonResponse;
			}
		}
	}

	private static int getIteratorCount(Iterator<?> it) {
		int cnt = 0;
		while (it.hasNext()) {
			it.next();
			cnt++;
		}
		return cnt;
	}



	public static Workbook createWorkbook(String type) {
		Workbook workbook = null;
		try {
			if (type.equalsIgnoreCase("xls")) {
				workbook = new HSSFWorkbook();
			}
			else if (type.equalsIgnoreCase("xlsx")) {
				workbook = new XSSFWorkbook();
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			return workbook;
		}
	}
	public static Workbook getWorkbookFromFile(String fullpath) {
		Workbook workbook = null;
		try {
			File f = new File(fullpath);
			FileInputStream fis = new FileInputStream(f);
			String type = f.getName().substring(f.getName().lastIndexOf(".") + 1);
			if (type.equalsIgnoreCase("xls")) {
				workbook = new HSSFWorkbook(fis);
			}
			else if (type.equalsIgnoreCase("xlsx")) {
				workbook = new XSSFWorkbook(fis);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			return workbook;
		}
	}
	public static Sheet getSheet(Workbook workbook, int index) {
		Sheet sheet = null;
		try {
			sheet = workbook.getSheetAt(index);
			if (sheet == null) {
				sheet = workbook.createSheet();
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			return sheet;
		}
	}
	public static Sheet getSheetByName(Workbook workbook, String name) {
		Sheet sheet = null;
		try {
			sheet = workbook.getSheet(name);
			if (sheet == null) {
				sheet = workbook.createSheet(name);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			return sheet;
		}
	}
	public static Row getRow(Sheet sheet, int rownum) {
		Row row = null;
		try {
			row = sheet.getRow(rownum);
			if (row == null) {
				row = sheet.createRow(rownum);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			return row;
		}
	}
	public static Cell getCell(Row row, int cellnum) {
		Cell cell = null;
		try {
			cell = row.getCell(cellnum);
			if (cell == null) {
				cell = row.createCell(cellnum);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			return cell;
		}
	}
	public static void setCellValue(Row row, int cellnum, String value) {
		Cell cell = getCell(row, cellnum);
		cell.setCellValue(value);
	}
	public static void setCellValue(Row row, int cellnum, int value) {
		Cell cell = getCell(row, cellnum);
		cell.setCellValue(value);
	}
	public static void setCellValue(Row row, int cellnum, double value) {
		Cell cell = getCell(row, cellnum);
		cell.setCellValue(value);
	}
	public static void setCellValue(Row row, int cellnum, Date value) {
		Cell cell = getCell(row, cellnum);
		cell.setCellValue(value);
	}
	public static void setCellValue(Sheet sheet, int rownum, int cellnum, String value) {
		Row row = getRow(sheet, rownum);
		setCellValue(row, cellnum, value);
	}
	public static void setCellValue(Sheet sheet, int rownum, int cellnum, int value) {
		Row row = getRow(sheet, rownum);
		setCellValue(row, cellnum, value);
	}
	public static void setCellValue(Sheet sheet, int rownum, int cellnum, double value) {
		Row row = getRow(sheet, rownum);
		setCellValue(row, cellnum, value);
	}
	public static void setCellValue(Sheet sheet, int rownum, int cellnum, Date value) {
		Row row = getRow(sheet, rownum);
		setCellValue(row, cellnum, value);
	}
	public static void updateFormular(Workbook workbook, String type) {
		try {
			if (type.equalsIgnoreCase("xls")) {
				HSSFFormulaEvaluator.evaluateAllFormulaCells((HSSFWorkbook)workbook);
			}
			else if (type.equalsIgnoreCase("xlsx")) {
				XSSFFormulaEvaluator.evaluateAllFormulaCells((XSSFWorkbook)workbook);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void writeExcelFile(Workbook workbook, String directory, String filename) {
		try {
			File dir = new File(directory);
			if (!dir.exists()) {
				dir.mkdirs();
			}
			File f = new File(directory, filename);
			FileOutputStream fos = new FileOutputStream(f);
			workbook.write(fos);
			workbook.close();
			fos.close();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	/*
	public static void main(String[] args) throws Exception {
		Workbook wb = ExcelUtil.getWorkbookFromFile("C:\\Users\\Andrew\\Downloads\\temp.xlsx");
		Sheet sheet = ExcelUtil.getSheet(wb, 0);
		ExcelUtil.setCellValue(sheet, 0, 0, "XXXXXXXXXX");
		ExcelUtil.setCellValue(sheet, 4, 5, 1);
		ExcelUtil.setCellValue(sheet, 5, 5, 1.5);
		ExcelUtil.updateFormular(wb, "xlsx");
		ExcelUtil.writeExcelFile(wb, "C:\\Users\\Andrew\\Downloads", "res.xlsx");
	}
	*/

	/*
	val totalProductQtyPerUserCell = userDetailsRow.createCell(products.size + 1)
	totalProductQtyPerUserCell.cellType = HSSFCell.CELL_TYPE_FORMULA
	totalProductQtyPerUserCell.cellFormula = "SUM(${CellReference.convertNumToColString(1)}${totalProductQtyPerUserCell.row.rowNum + 1}:${CellReference.convertNumToColString(products.size)}${totalProductQtyPerUserCell.row.rowNum + 1})"
	*/
}
