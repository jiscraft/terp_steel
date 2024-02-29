<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>

<%@ page import="com.itextpdf.html2pdf.ConverterProperties" %>
<%@ page import="com.itextpdf.html2pdf.HtmlConverter" %>
<%@ page import="com.itextpdf.html2pdf.resolver.font.DefaultFontProvider" %>

<%@ page import="com.itextpdf.io.font.FontProgram" %>
<%@ page import="com.itextpdf.io.font.FontProgramFactory" %>
<%@ page import="com.itextpdf.kernel.pdf.PdfDocument" %>
<%@ page import="com.itextpdf.kernel.pdf.PdfWriter" %>
<%@ page import="com.itextpdf.layout.Document" %>
<%@ page import="com.itextpdf.layout.element.IBlockElement" %>
<%@ page import="com.itextpdf.layout.element.IElement" %>

<%@ page import="kr.terp.TobeCommonFunction" %>
<%@ page import="kr.terp.TobeQueryExec" %>
<%@ page import="kr.terp.TobeSessionManager" %>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.io.FileOutputStream" %>
<%@ page import="com.itextpdf.layout.font.FontProvider" %>

<%

    response.setContentType("text/html; charset=utf-8");
    PrintWriter outResult = response.getWriter();
    TobeQueryExec execQuery = new TobeQueryExec();
    TobeCommonFunction tcf = new TobeCommonFunction();
    TobeSessionManager ts = new TobeSessionManager();
    List<String> query = new ArrayList<String>();
    String queryString = "";
    String resultString = "";
    String strErrorMessage = "";
    Iterator iterator = null;
    HttpSession sessionCheck = request.getSession(false);

    try {

        JSONArray jsonArray;

        String FONT = "C:\\TERP\\Files\\terp_files\\officialDocuments\\malgun.ttf";

        String src;
        String dest;
        src = "C:\\TERP\\Files\\terp_files\\EA\\html\\220902\\220902-0000148_220902-0000146.html";
        dest ="C:\\TERP\\Files\\terp_files\\officialDocuments\\sample.pdf";


        ConverterProperties properties = new ConverterProperties();
        FontProvider fontProvider = new FontProvider();
        FontProgram fontProgram = FontProgramFactory.createFont(FONT);
        fontProvider.addFont(fontProgram);
        properties.setFontProvider(fontProvider);


//
        //pdf 페이지 크기를 조정
        List<IElement> elements = HtmlConverter.convertToElements(new FileInputStream(src), properties);
        PdfDocument pdf = new PdfDocument(new PdfWriter(dest));
        Document document = new Document(pdf);
        //setMargins 매개변수순서 : 상, 우, 하, 좌
        document.setMargins(10, 0, 10, 0);
        for (IElement element : elements) {
            document.add((IBlockElement) element);
        }
        document.close();
    }
    catch (Exception e) {
        System.out.println(e);
    }


%>
