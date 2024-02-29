<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.Enumeration" %>
<%@ page import="java.io.DataInputStream" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%
    request.setCharacterEncoding("UTF-8");
    // String contentType = request.getContentType();
    Enumeration<String> en = request.getHeaderNames();
    System.out.println("전송받은 헤더");
    while( en.hasMoreElements() ){
        String key = en.nextElement();
        String value = request.getHeader(key);
        System.out.println(key+" : "+ value);
    }

    System.out.println("전송받은 데이터");
    ServletInputStream sis= request.getInputStream();
    DataInputStream dis = new DataInputStream(sis);
    String line = "";
    while( ( line = dis.readLine() ) != null ){
        System.out.println( new String(line.getBytes(), StandardCharsets.UTF_8) );
    }
%>