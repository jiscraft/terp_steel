package kr.terp.msg.proxy;

import com.google.gson.JsonObject;
import org.json.simple.JSONObject;

public class TerpMsgConf {

	// 서버 요청 타임아웃
	public static int DEFAULT_TIMEOUT = 3000;
	public static int SOCKET_TIMEOUT = 3000;
	public static int CONNECT_TIMEOUT = 3000;

	// 프로젝트 아이디
	public static String PROJECT_ID = "GRCH";

	// 메시지 서버 주소
	public static String MSG_SERVER_HOST = "http://msg.terp.kr";
	//public static String MSG_SERVER_HOST = "http://localhost:8080/terp-msg-server";

	// 메시지 첨부파일 임시 업로드 경로
	public static String TMP_UPLOAD_PATH = "/Users/Andrew/temp";
//	public static String TMP_UPLOAD_PATH = "C:\Temp";

	// 메시지 저장 서비스 경로
	public static String INSERT_MSG_URL = MSG_SERVER_HOST + "/insertTerpMsgInfo.svc";

	// 읽은 메시지 업데이트 서비스 경로
	public static String UPDATE_MSG_READ_URL = MSG_SERVER_HOST + "/updateTerpMsgReadInfo.svc";

	// 받은 메시지 조회 서비스 경로
	public static String GET_RECV_MSG_URL = MSG_SERVER_HOST + "/getTerpMsgRecvList.svc";

	// 단일 파일 업로드 서비스 경로
	public static String UPLOAD_SINGLE_FILE_URL = MSG_SERVER_HOST + "/uploadTerpMsgFile.svc";

	// 다중 파일 업로드 서비스 경로
	public static String UPLOAD_MULRI_FILES_URL = MSG_SERVER_HOST + "/uploadTerpMsgFiles.svc";

	// 파일 업로드 서비스 호출시 사용되는 JSON (파일저장경로로 사용됨)
	public static JsonObject getUploadPathParams() {
		JsonObject gsonObject = new JsonObject();
		gsonObject.addProperty("ID_PROJECT", PROJECT_ID);
		return gsonObject;
	}

	// 클라이언트 및 프로젝트 아이디 반환 (GSON)
	public static JsonObject getGsonWithProjectId() {
		JsonObject gsonObject = new JsonObject();
		gsonObject.addProperty("ID_PROJECT", PROJECT_ID);
		return gsonObject;
	}

	// 클라이언트 및 프로젝트 아이디 반환 (SimpleJSON)
	public static JSONObject getJsonWithProjectId() {
		return TerpMsgUtil.gsonObjectToSimpleJsonObject(getGsonWithProjectId());
	}

}
