package kr.terp.msg.proxy;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.json.simple.JSONObject;

import java.io.File;
import java.util.List;

public class TerpMsgProxy {
/*
	public static HttpClientUtil hcUtil = new HttpClientUtil(TerpMsgConf.DEFAULT_TIMEOUT);

	// 메시지 저장
	public static JSONObject insertTerpMsgInfo(String sendData) {
		return doPost(TerpMsgConf.INSERT_MSG_URL, sendData);
	}

	// 읽은 메시지 업데이트
	public static JSONObject updateTerpMsgReadInfo(String sendData) {
		return doPost(TerpMsgConf.UPDATE_MSG_READ_URL, sendData);
	}

	// 받은 메시지 조회
	public static JSONObject getTerpMsgRecvList(String sendData) {
		return doPost(TerpMsgConf.GET_RECV_MSG_URL, sendData);
	}

	// 메시지 첨부파일 업로드 (Single)
	public static JSONObject uploadTerpMsgFile(File file) {
		return upload(TerpMsgConf.UPLOAD_SINGLE_FILE_URL, file);
	}

	// 메시지 첨부파일 업로드 (Multi)
	public static JSONObject uploadTerpMsgFiles(List<File> files) {
		return upload(TerpMsgConf.UPLOAD_MULRI_FILES_URL, files);
	}

	// HTTP Get Method Request API
	public static JSONObject doGet(String url, String sendData) {
		return request(url, sendData, "GET");
	}

	// HTTP Post Method Request API
	public static JSONObject doPost(String url, String sendData) {
		return request(url, sendData, "POST");
	}

	// HTTP Request API
	public static JSONObject request(String url, String sendData, String method) {
		JsonObject gsonParams = new JsonObject();
		gsonParams.addProperty("data", sendData);

		JsonObject gsonRequest = new JsonObject();
		gsonRequest.addProperty("url", url);
		gsonRequest.add("params", gsonParams);

		JsonObject gsonResponse = null;
		if (method.equalsIgnoreCase("GET")) gsonResponse = hcUtil.get(gsonRequest);
		else if (method.equalsIgnoreCase("POST")) gsonResponse = hcUtil.post(gsonRequest);

		return TerpMsgUtil.gsonObjectToSimpleJsonObject(convertGsonResonseProperties(gsonResponse));
	}

	// Single File Upload API
	public static JSONObject upload(String url, File file) {
		JsonObject gsonResponse = null;
		gsonResponse = hcUtil.upload(url, file, TerpMsgConf.getUploadPathParams());
		return TerpMsgUtil.gsonObjectToSimpleJsonObject(convertGsonResonseProperties(gsonResponse));
	}

	// Multi Files Upload API
	public static JSONObject upload(String url, List<File> files) {
		JsonObject gsonResponse = null;
		gsonResponse = hcUtil.upload(url, files, TerpMsgConf.getUploadPathParams());
		return TerpMsgUtil.gsonObjectToSimpleJsonObject(convertGsonResonseProperties(gsonResponse));
	}

	// success를 int에서 boolean으로, results를 data로...
	public static JsonObject convertGsonResonseProperties(JsonObject gsonResponse) {
		if (!gsonResponse.isJsonNull()) {
			int success = gsonResponse.get("success").getAsInt();
			gsonResponse.addProperty("success", ((Integer.compare(success, 1) == 0) ? true : false));
			JsonArray results = (!gsonResponse.get("results").isJsonNull()) ? gsonResponse.get("results").getAsJsonArray() : null;
			gsonResponse.add("data", results);
			gsonResponse.remove("results");
		}
		//System.out.println(gsonResponse);
		return gsonResponse;
	}
*/
}
