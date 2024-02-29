package kr.terp.common.util;

import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import kr.terp.common.vo.AjaxErrorVo;



public class Common {

	public static Gson gson = new GsonBuilder().serializeNulls().create();
	public static JsonParser gsonParser = new JsonParser();
	public static JSONParser simpleJsonParser = new JSONParser();
	public static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");

	public static Boolean isEmpty(String str) {
		return (str == null) || (str.trim().length() < 1);
	}

	public static String convHtmlChar(String str) {
		return str.replaceAll("'","&#39;").replaceAll("\"","&#34;").replaceAll("<","&#60;").replaceAll(">","&#62;");
	}

	public static String stripEscapeChar(String str) {
		return str.replaceAll("\r","").replaceAll("\n","").replaceAll("\t"," ");
	}

	public static int[] toIntArray(String str) {
		String[] items = str.replaceAll("\\[", "").replaceAll("\\]", "").split(",");
		int[] results = new int[items.length];
		for (int i=0; i<items.length; i++) {
			results[i] = Integer.parseInt(items[i]);
		}
		return results;
	}

	public static String getNowStr(String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		Date now = new Date();
		return sdf.format(now);
	}

	public static JSONObject getErrorJson(String errmsg) {
		JSONObject res = new JSONObject();
		JSONObject jsonError = new JSONObject();
		jsonError.put("NMSG", errmsg);
		jsonError.put("LMSG", errmsg);
		JSONArray jsonErrors = new JSONArray();
		jsonErrors.add(jsonError);
		res.put("errors", jsonErrors);
		res.put("success", 0);
		return res;
	}

	public static JSONObject getErrorJson(Exception e) {
		JSONObject jsonError = new JSONObject();
		jsonError.put("CLASS", e.getClass().getName());
		jsonError.put("NMSG", e.getMessage());
		jsonError.put("LMSG", e.getLocalizedMessage());
		return jsonError;
	}

	public static AjaxErrorVo getAjaxErrorVo(Exception e) {
		AjaxErrorVo error = new AjaxErrorVo();
		error.setCLASS(e.getClass().getName());
		error.setCODE(e.hashCode()+"");
		error.setMSG(e.getLocalizedMessage());
		return error;
	}

	public static String encodePassword(String pw){
		MessageDigest md;
		try {
			md = MessageDigest.getInstance("SHA-256");
			return new String(Base64.encodeBase64(md.digest(pw.getBytes(StandardCharsets.UTF_8))));
		}
		catch (Exception e){
			e.printStackTrace();
			return null;
		}
	}

	public static JsonObject simpleJsonObjectToGsonObject(JSONObject simpleJsonObject) {
		return (simpleJsonObject == null) ? null : jsonStrToGsonObject(simpleJsonObject.toString());
	}

	public static JsonArray simpleJsonArrayToGsonArray(JSONArray simpleJsonArray) {
		return (simpleJsonArray == null) ? null : jsonStrToGsonArray(simpleJsonArray.toString());
	}

	public static JSONObject gsonObjectToSimpleJsonObject(JsonObject gsonObject) {
		return (gsonObject.isJsonNull()) ? null : jsonStrToSimpleJsonObject(gsonObject.toString());
	}

	public static JSONArray gsonArrayToSimpleJsonArray(JsonArray gsonArray) {
		return (gsonArray.isJsonNull()) ? null : jsonStrToSimpleJsonArray(gsonArray.toString());
	}

	public static JSONObject jsonStrToSimpleJsonObject(String str) {
		JSONObject json = new JSONObject();
		try {
			json = (JSONObject) simpleJsonParser.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return json;
	}

	public static JSONArray jsonStrToSimpleJsonArray(String str) {
		JSONArray json = new JSONArray();
		try {
			json = (JSONArray) simpleJsonParser.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return json;
	}

	public static Object gsonObjectToVo(JsonObject gsonObject, Class<?> classType) {
		return gson.fromJson(gsonObject, classType);
	}

	public static JsonObject jsonStrToGsonObject(String data) {
		return (JsonObject) gsonParser.parse(data);
	}

	public static Object jsonStrToVo(String data, Class<?> classType) {
		return gsonObjectToVo(jsonStrToGsonObject(data), classType);
	}

	public static String voToJsonStr(Object vo) {
		return gson.toJson(vo);
	}

	public static JsonObject voToGsonObject(Object vo) {
		return jsonStrToGsonObject(voToJsonStr(vo));
	}

	public static List<Object> gsonArrayToVoList(JsonArray gsonArray, Class<?> classType) {
		List<Object> retObj = new ArrayList<Object>();
		for (JsonElement o : gsonArray) {
			retObj.add(gson.fromJson(o, classType));
		}
		return retObj;
	}

	public static JsonArray jsonStrToGsonArray(String data) {
		JsonArray retArray = new JsonArray();
		if (!isEmpty(data)) {
			String firstStr = data.trim().substring(0, 1);
			String lastStr = data.trim().substring(data.trim().length()-1);
			if (firstStr.equals("{") && lastStr.equals("}")) {
				retArray.add(gsonParser.parse(data));
			}
			else if (firstStr.equals("[") && lastStr.equals("]")) {
				retArray = (JsonArray) gsonParser.parse(data);
			}
		}
		return retArray;
	}

	public static List<Object> jsonStrToVoList(String data, Class<?> classType) {
		return gsonArrayToVoList(jsonStrToGsonArray(data), classType);
	}


	public static String voListToJsonStr(List<Object> list) {
		return gson.toJson(list);
	}

	public static JsonArray voListToGsonArray(List<Object> list) {
		return jsonStrToGsonArray(voListToJsonStr(list));
	}

	public static <T> T createFromResultSet(Class<T> clazzOfT, ResultSet rs) throws InstantiationException, IllegalAccessException, IllegalArgumentException, SQLException {
		T result = clazzOfT.newInstance();
		Field[] fields = clazzOfT.getFields();

		for (Field field : fields) {
			String fieldName = field.getName();
			Class<?> fieldType = field.getType();
			try {
				if (fieldType == String.class) {
					field.set(result, rs.getString(fieldName));
				} else if (fieldType == int.class) {
					field.set(result, rs.getInt(fieldName));
				} else if (fieldType == float.class) {
					field.set(result, rs.getFloat(fieldName));
				} else if (fieldType == double.class) {
					field.set(result, rs.getDouble(fieldName));
				} else if (fieldType == boolean.class) {
					field.set(result, rs.getBoolean(fieldName));
				} else {
					field.set(result, rs.getObject(fieldName));
				}
			} catch (SQLException ex) {
				throw new SQLException(String.format("Column %s invalid", fieldName), ex);
			}
		}

		return result;
	}

}