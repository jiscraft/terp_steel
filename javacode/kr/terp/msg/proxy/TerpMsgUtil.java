package kr.terp.msg.proxy;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.text.SimpleDateFormat;
import java.util.Date;


public class TerpMsgUtil {

	private static JsonParser gsonParser = new JsonParser();
	private static JSONParser simpleJsonParser = new JSONParser();
	private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");

	// null 또는 빈 문자열 체크
	public static Boolean isEmptyString(String str) {
		return (str == null) || (str.trim().length() < 1);
	}

	// 현재 시간을 문자열로 변환 (default format = yyyyMMddHHmmssSSS);
	public static String getNowDateToString(String format) {
		SimpleDateFormat sdf = isEmptyString(format) ? simpleDateFormat : new SimpleDateFormat(format);
		Date now = new Date();
		return sdf.format(now);
	}

	// JSON 문자열을 GSON Object로 변환
	public static JsonObject jsonStringToGsonObject(String str) {
		return (JsonObject) gsonParser.parse(str);
	}

	// JSON 문자열을 GSON Array로 변환
	public static JsonArray jsonStringToGsonArray(String str) {
		JsonArray retArray = new JsonArray();
		if (!isEmptyString(str)) {
			String firstStr = str.trim().substring(0, 1);
			String lastStr = str.trim().substring(str.trim().length()-1, str.trim().length());
			if (firstStr.equals("{") && lastStr.equals("}")) {
				retArray.add(gsonParser.parse(str));
			}
			else if (firstStr.equals("[") && lastStr.equals("]")) {
				retArray = (JsonArray) gsonParser.parse(str);
			}
		}
		return retArray;
	}

	// JSON 문자열을 SimpleJson Object로 변환
	public static JSONObject jsonStringToSimpleJsonObject(String str) {
		JSONObject json = new JSONObject();
		try {
			json = (JSONObject) simpleJsonParser.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return json;
	}

	// JSON 문자열을 SimpleJson Array로 변환
	public static JSONArray jsonStringToSimpleJsonArray(String str) {
		JSONArray json = new JSONArray();
		try {
			json = (JSONArray) simpleJsonParser.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return json;
	}

	// SimpleJson Object를 GSON Object로 변환
	public static JsonObject simpleJsonObjectToGsonObject(JSONObject simpleJsonObject) {
		return (simpleJsonObject == null) ? null : jsonStringToGsonObject(simpleJsonObject.toString());
	}

	// SimpleJson Array를 GSON Array로 변환
	public static JsonArray simpleJsonArrayToGsonArray(JSONArray simpleJsonArray) {
		return (simpleJsonArray == null) ? null : jsonStringToGsonArray(simpleJsonArray.toString());
	}

	// GSON Object를 SimpleJson Object로 변환
	public static JSONObject gsonObjectToSimpleJsonObject(JsonObject gsonObject) {
		return (gsonObject.isJsonNull()) ? null : jsonStringToSimpleJsonObject(gsonObject.toString());
	}

	// GSON Array를 SimpleJson Array로 변환
	public static JSONArray gsonArrayToSimpleJsonArray(JsonArray gsonArray) {
		return (gsonArray.isJsonNull()) ? null : jsonStringToSimpleJsonArray(gsonArray.toString());
	}

}
