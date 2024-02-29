<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.DataOutputStream" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.UUID" %>
<%

    response.setContentType("text/html; charset=utf-8");
    PrintWriter outResult = response.getWriter();
    String resultString = "";

    String reqType = request.getParameter("tp");
    String userId = request.getParameter("id");
    boolean isValid = (reqType != null) && !reqType.trim().isEmpty() && (userId != null) && !userId.trim().isEmpty();

    if (isValid) {
        try {
            String ApiKey = "!AirtechMailKey";
            String HostDomain = "airtecheng.co.kr";
            String token = UUID.randomUUID().toString().replaceAll("-", "");

            //String urlSso = "http://mail.kerheung.co.kr/mail_api/token_sso";
            //String urlCnt = "http://mail.kerheung.co.kr/mail_api/mail_cnt";
            //String urlList = "http://mail.kerheung.co.kr/mail_api/mail_list";
            //URL reqUrl = new URL(urlSso);
            //URL reqUrl = new URL(urlCnt);
            //URL reqUrl = new URL(urlList);

            JSONObject data = new JSONObject();
            data.put("cid", userId);
            data.put("MailToken", token);

            Map<String, String> params = new HashMap<String, String>();
            params.put("api_key", ApiKey);
            params.put("host_domain", HostDomain);
            params.put("data", data.toString());

            URL reqUrl = new URL("http://mail.airtecheng.co.kr/mail_api/"+reqType);
            HttpURLConnection urlConn = (HttpURLConnection) reqUrl.openConnection();
            urlConn.setRequestMethod("POST");

            StringBuilder sb = new StringBuilder();
            for (String paramName : params.keySet()) {
                sb.append(paramName).append("=").append(URLEncoder.encode(params.get(paramName), "UTF-8")).append("&");
            }

            urlConn.setDoOutput(true);
            DataOutputStream doStream = new DataOutputStream(urlConn.getOutputStream());
            doStream.writeBytes(sb.substring(0, sb.length() - 1));
            doStream.flush();
            doStream.close();

            String inputLine = "";
            String outputStr = "";
            BufferedReader buf = new BufferedReader(new InputStreamReader((urlConn.getInputStream())));
            while ((inputLine = buf.readLine()) != null) {
                outputStr = outputStr.concat(inputLine);
            }
            outputStr = outputStr.trim();

            if (outputStr.startsWith("[")) {
                resultString = "{\"success\":true, \"data\":"+outputStr+", \"output\":\""+URLEncoder.encode(outputStr,"UTF-8")+"\", \"type\":\""+reqType+"\", \"token\":\""+token+"\"}";
            }
            else if (outputStr.startsWith("{")) {
                resultString = "{\"success\":true, \"data\":["+outputStr+"], \"output\":\""+URLEncoder.encode(outputStr,"UTF-8")+"\", \"type\":\""+reqType+"\", \"token\":\""+token+"\"}";
            }
            else {
                resultString = "{\"success\":false, \"data\":[] , \"msg\":\"" + URLEncoder.encode(outputStr,"UTF-8") + "\"}";
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            resultString = "{\"success\":false, \"data\":[] , \"msg\":\"" + e.getLocalizedMessage() + "\"}";
        }
    }
    else {
        resultString = "{\"success\":false, \"data\":[] , \"msg\":\"Parameter(tp=token_sso|mail_cnt|mail_list) required!\"}";
    }

    outResult.println(resultString);

%>
