<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="kr.terp.TobeDataBaseConnect" %>
<%@ page import="java.io.ByteArrayOutputStream" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.OutputStream" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="net.sf.jasperreports.engine.JasperReport" %>
<%@ page import="net.sf.jasperreports.engine.JRResultSetDataSource" %>
<%@ page import="net.sf.jasperreports.engine.JasperCompileManager" %>
<%@ page import="net.sf.jasperreports.engine.JasperPrint" %>
<%@ page import="net.sf.jasperreports.engine.JasperFillManager" %>
<%@ page import="net.sf.jasperreports.engine.export.JRPdfExporter" %>
<%@ page import="net.sf.jasperreports.export.SimpleExporterInput" %>
<%@ page import="net.sf.jasperreports.export.SimpleOutputStreamExporterOutput" %>
<%@ page import="net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter" %>
<%

    request.setCharacterEncoding("UTF-8");

    try
    {
        TobeDataBaseConnect db = new TobeDataBaseConnect();
        Connection conn=null;
        PreparedStatement pstmt = null;
        ResultSet rs=null;
        JasperReport jasperReport = null;
        String query ="select * from sy_user";
        try
        {
            conn = db.connect("terp");
            pstmt = conn.prepareStatement(query, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            pstmt.execute();
            pstmt.setEscapeProcessing(true);
            rs = pstmt.getResultSet();

            JRResultSetDataSource resultSetDataSource = new JRResultSetDataSource(rs);
            jasperReport = JasperCompileManager.compileReport("D:\\TSOFT\\Projects\\atec\\Terp\\resources\\jrxml\\sy_user.jrxml");
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, new HashMap<String, Object>(), resultSetDataSource);

            ByteArrayOutputStream xlsReportStream = new ByteArrayOutputStream();
            JRXlsxExporter xlsExporter = new JRXlsxExporter();
            xlsExporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            xlsExporter.setExporterOutput(new SimpleOutputStreamExporterOutput(xlsReportStream));

            response.setContentType("application/octet-stream");
            response.setHeader("Content-Length", String.valueOf(xlsReportStream.size()));
            response.addHeader("Content-Disposition", "attachment; filename=Report.xlsx;");

            OutputStream responseOutputStream1 = response.getOutputStream();
            responseOutputStream1.write(xlsReportStream.toByteArray());
            responseOutputStream1.close();
            xlsReportStream.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }
    catch(Exception e)
    {
        e.printStackTrace();
    }

%>
