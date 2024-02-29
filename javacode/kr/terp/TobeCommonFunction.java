package kr.terp;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.servlet.http.Cookie;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 * Created by jiscraft on 2016-01-26.
 */


public class TobeCommonFunction {
	public JSONArray arrayConvert(String sendData) throws ParseException {
		JSONParser parser = new JSONParser();
		Object obj = parser.parse(sendData);
		JSONArray jsonArray = (JSONArray) obj;
		return jsonArray;
	}


	public Object getJsonValue(String s, JSONObject sendData, String key) throws ParseException {
		Object returnValue = null;

		if (s.equals("string")) {
			returnValue = sendData.get(key);
			if (returnValue == null) {
				returnValue = "";
			}
		}


        if (s.equals("int") || s.equals("number") ) {
			returnValue = sendData.get(key);
			if (returnValue == null) {
				returnValue = 0 ;
			}
//			comma가 들어왔을때 ,를 공백으로 처리 201605024 jiscraft
			returnValue = returnValue.toString().replace(",", "");

		}


        return returnValue;
	}

//getJsonValue function과 동일하나 jsp에서 좀더 편하게 코딩하기 위해 일부 정정  20160524 jiscraft
	public Object getJsonValueSimple (String dataType , JSONObject sendData, String key) throws ParseException {
		Object returnValueSimple = null;

		if (dataType.equals("object")) {
			returnValueSimple = sendData.get(key);
			if (returnValueSimple == null) {
				returnValueSimple = "";
			}
		}


        if (dataType.equals("string")) {
			returnValueSimple = sendData.get(key);
			if (returnValueSimple == null) {
				returnValueSimple = "";
			}
//			System.out.println(key+"="+ val);
			String val = (String) returnValueSimple;
			val = val.replaceAll("'","''");
			val = val.replaceAll("\\\\","\\\\\\\\");
			val = val.replaceAll("\"","\\\\\"");
			val = val.replaceAll("\\t","    ");
			val = val.replaceAll("\\r","");
			val = val.replaceAll("\\n","\\\\r\\\\n");
//			System.out.println(key+"="+val);
			returnValueSimple = val;
			returnValueSimple = "'" + returnValueSimple + "'";
		}


        if (dataType.equals("richString")) {
			returnValueSimple = sendData.get(key);
			if (returnValueSimple == null) {
				returnValueSimple = "";
			}

			String val = (String) returnValueSimple;

			System.out.println(key+"="+ val);

			val = val.replaceAll("'","''");
			val = val.replaceAll("\\\\","\\\\\\\\");
			val = val.replaceAll("\"","\\\\\"");
			val = val.replaceAll("\\t","    ");
			val = val.replaceAll("\\r","");
			val = val.replaceAll("\\n","\\\\r\\\\n");
//			System.out.println(key+"="+val);
			returnValueSimple = val;
			returnValueSimple = "'" + returnValueSimple + "'";
		}

        //boolean일시 '0' , '1'로 변환해서 처리 jiscraft 2016 07 06
		//database에더 '0','1'값으로 처리한다..체크박스의 경우
		if (dataType.equals("boolean")){
//			System.out.println("value=" + sendData.get(key));
			if ( sendData.get(key).equals(true) || sendData.get(key).toString().equals("1") ){
				returnValueSimple = "1";
			}else{
				returnValueSimple = "0";
			}

			returnValueSimple = "'" + returnValueSimple + "'";
		}


        if (dataType.equals("int") || dataType.equals("number") ) {
			returnValueSimple = sendData.get(key);
//			System.out.println(returnValueSimple);
			if (returnValueSimple == null ||  returnValueSimple.equals("") ) {
				returnValueSimple = 0 ;
			}
//			comma가 들어왔을때 ,를 공백으로 처리 201605024 jiscraft
			returnValueSimple = returnValueSimple.toString().replace(",", "");

		}

        return returnValueSimple;
	}


    public String getCookie(Cookie[] cookies, String cookieName) throws UnsupportedEncodingException {
		String returnValue = "";
		for (int i = 0; i < cookies.length; i++) {
			Cookie cookie = cookies[i];
			if (cookie.getName().equals(cookieName)) {
				returnValue = URLDecoder.decode(cookie.getValue(), "euc-kr");
				break;
			}
		}

		return returnValue.replace("\"", "");
	}
}
