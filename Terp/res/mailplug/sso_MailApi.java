import javax.net.ssl.*;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.net.HttpURLConnection;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Map;
import java.util.Date;
import java.util.Scanner;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.sql.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class MailApi {
	// default user agent to send requests with
	// 소켓통신시 전송되는 AGENT 값
	private final static String USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36";
	// File to save response to
	// 결과 저장 경로
	private final static String RESPONSE_FILE_LOCATION = "/var/log/mail_api/";

	static {
		// this part is needed cause Lebocoin has invalid SSL certificate, that cannot be normally processed by Java
		TrustManager[] trustAllCertificates = new TrustManager[]{
				new X509TrustManager() {
					@Override
					public X509Certificate[] getAcceptedIssuers() {
						return null; // Not relevant.
					}

					@Override
					public void checkClientTrusted(X509Certificate[] certs, String authType) {
						// Do nothing. Just allow them all.
					}

					@Override
					public void checkServerTrusted(X509Certificate[] certs, String authType) {
						// Do nothing. Just allow them all.
					}
				}
		};

		HostnameVerifier trustAllHostnames = new HostnameVerifier() {
			@Override
			public boolean verify(String hostname, SSLSession session) {
				return true; // Just allow them all.
			}
		};
		try {
			System.setProperty("jsse.enableSNIExtension", "false");
			SSLContext sc = SSLContext.getInstance("SSL");
			sc.init(null, trustAllCertificates, new SecureRandom());
			HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
			HttpsURLConnection.setDefaultHostnameVerifier(trustAllHostnames);
		} catch (GeneralSecurityException e) {
			throw new ExceptionInInitializerError(e);
		}
	}

	public static void main(String[] args) throws IOException {


		Map<String, String> parameters = new HashMap<String, String>();
// 공통 전송
/**
* host_domain : 도메인명
* api_key : 메일플러그에서 제공해준 key값
* domainUrl : 소켓통신 URL , SSL 통신인경우 https:// 변경 후 makePostRequest 함수 실행
*/
		parameters.put("host_domain", "copyright.or.kr");
		parameters.put("api_key", "#!@mail5455");
		String domainUrl = "https://cloud.copyright.or.kr/mail_api/"; // 개통시는 mail.copyright.or.kr 로 변경됩니다.
		String sendData = "";

//자동 로그인 Token SSo
/**
* cid : 사용자 아이디
* sabeon : 사번 연동인 경우 cid 대신 전송
*/
		sendData = '{"cid":"mailplug", "MailToken":"StPEuM9pm7NL49UEpdzgxjjiL8MHaF5uBxCrI1kP"}';
		parameters.put("data", sendData);
		String url = domainUrl + "token_sso";

//메일 카운트
/**
* cid : 사용자 아이디
* sabeon : 사번 연동인 경우 cid 대신 전송
* 전송 결과 형식 : json 
*/
		sendData = '{"cid":"mailplug"}';
		parameters.put("data", sendData);
		String url = domainUrl + "mail_cnt";

//메일 리스트
/**
* cid : 사용자 아이디
* sabeon : 사번 연동인 경우 cid 대신 전송
* 전송 결과 형식 : json 
*/
		sendData = '{"cid":"mailplug"}';
		parameters.put("data", sendData);
		String url = domainUrl + "mail_list";

//조직도 연동
/**
* 데이타 형식 : json 
* 데이타 필드 
* code : 소속의 고유값 회원정보에 연결되는 키값 (2이상의 숫자) 
* name : 소속의 이름 (100이하의 문자)
* parentcode : 부모의 code 값 (1이상의 숫자) 부모code 데이타가 없는 경우 0으로 처리함
* depth : 소속의 depth (1이상의 숫자)
* sortorder : 같은 소속에서 출력 순서 (1이상의 숫자)
* 등록된 IP만 접속 가능 
* 전체 조직을 삭제후 재등록하는 방식
* 전송 결과 형식 : json 
*/
		sendData = '[{"code":"2","name":"영업팀","parentcode":"1","depth":"1","sortorder":"1"},{"code":"3","name":"개발팀","parentcode":"1","depth":"1","sortorder":"1"},{"code":"4","name":"경영지원팀","parentcode":"1","depth":"1","sortorder":"1"},{"code":"5","name":"영업지원","parentcode":"2","depth":"2","sortorder":"1"},{"code":"6","name":"영업관리","parentcode":"2","depth":"2","sortorder":"2"},{"code":"7","name":"운영파트","parentcode":"3","depth":"2","sortorder":"1"},{"code":"8","name":"개발파트","parentcode":"3","depth":"2","sortorder":"2"}]';
		parameters.put("type", "group");
		parameters.put("data", sendData);
		String url = domainUrl + "set";

//사용자 연동
/**
* 데이타 형식 : json 
* 데이타 필드 
* id : 유저 아이디 (필수)
* passwd : 유저 암호 (변경시 또는 신규)
* name : 성명 
* sosok : 부서코드 (조직도 연동시 code와 같아야 조직 연동 됩니다.)
* sabeon : 사원번호/학번
* gradename : 직급명 (주임,대리,과장...)
* groupname : 그룹명 
* job_duty : 직책 (팀장,실장,담당자) 
* work_type : 재직구분/근무상태(근무중,휴직중,퇴사) 
* join_type : 입사구분(전임직,정규직,소속외(파견)) 
* active : 메일상태 (정상:Y,중지:N) 
* sosoklink : 겸직여부 겸직인경우:Y (겸직은 전계정 동기화시에만 사용) 
* email : 이메일 
* hp : 휴대폰번호 
* tel : 전화번호 
* sosok_order : 조직도에서 출력 순번
* 등록된 IP만 접속 가능 
* 전체 조직을 삭제후 재등록하는 방식
* 전송 결과 형식 : json 
*/
		sendData = '[{"id":"test01","passwd":"#!@plug9140","name":"홍길동","sosok":"6","sabeon":"01086","gradename":"대리","groupname":"그룹1","hp":"01012341234","active":"Y","sosoklink":"N","flag_sync":"on","flag_otp":"pass"},{"id":"test02","passwd":"#!@","name":"홍길동2","sosok":"8","sabeon":"01022","gradename":"과장","groupname":"그룹2","hp":"01012341234","active":"Y","sosoklink":"N","flag_sync":"off","flag_otp":"otp"}]';
		parameters.put("type", "member");
		parameters.put("data", sendData);
		String url = domainUrl + "set";


		try
		{
			//https 전송 함수
			//String httpResult = makePostRequest(url, parameters);
			//http 전송 함수
			String httpResult = makePostRequestHttp(url, parameters);


			System.out.println(	"httpResult : " + httpResult ) ;
		}
		catch( Exception	e )
		{
			System.out.println(	"Exception : " + e.getMessage() ) ;
		}
	}

	private static void ensureAllParametersArePresent(Map<String, String> parameters) {

		// 값이 안넘어오는 경우 기본값 설정
		if (parameters.get("type") == null) {
			parameters.put("type", "member");
		}
		if (parameters.get("host_domain") == null) {
			parameters.put("host_domain", "b11.myplug.kr");
		}
		if (parameters.get("api_key") == null) {
			parameters.put("api_key", "mailplug!@#");
		}
		if (parameters.get("data") == null) {
			parameters.put("data", "[]");
		}
	}

	/**
	 * Make post request for given URL with given parameters and save response into RESPONSE_FILE_LOCATION
	 *
	 * @param url        HTTPS link to send POST request
	 * @param parameters POST request parameters. currently expecting following parameters:
	 *                   name, email, phone, body, send
	 */
	public static void makePostRequestHttp(String url, Map<String, String> parameters) {
		try {
			ensureAllParametersArePresent(parameters);
			//we need this cookie to submit form
			//String initialCookies = getUrlConnectionHttp(url, "").getHeaderField("Set-Cookie");
			//HttpURLConnection con = getUrlConnectionHttp(url, initialCookies);
			HttpURLConnection con = getUrlConnectionHttp(url, "");
			String urlParameters = processRequestParameters(parameters);
			// Send post request
			sendPostParameters(con, urlParameters);
			BufferedReader in = new BufferedReader(
				new InputStreamReader(con.getInputStream()));
			String inputLine;
			String outputStr = "";
			while ((inputLine = in.readLine()) != null) {
				outputStr = outputStr.concat(inputLine);
			}
			return outputStr;

			/*
			로그파일로 저장시 사용
			Date from = new Date();
			SimpleDateFormat transFormat = new SimpleDateFormat("yyyyMMddHHmmss");
			String to = transFormat.format(from);

			File outputFile = new File(RESPONSE_FILE_LOCATION + to + "_member");
			if (!outputFile.exists()) {
				outputFile.createNewFile();
			}
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outputFile)));
			String inputLine;
			while ((inputLine = in.readLine()) != null) {
				bw.write(inputLine);
			}
			in.close();
			bw.flush();
			bw.close();
			*/
			//print result

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * Create HttpURLConnection for given URL with given Cookies
	 *
	 * @param url     url to query
	 * @param cookies cookies to use for this connection
	 * @return ready-to-use HttpURLConnection
	 * @throws IOException
	 */
	private static HttpURLConnection getUrlConnectionHttp(String url, String cookies) throws IOException {
		HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("User-Agent", USER_AGENT);
		con.setRequestProperty("Cookie", cookies);
		return con;
	}

	/**
	 * Make post request for given URL with given parameters and save response into RESPONSE_FILE_LOCATION
	 *
	 * @param url        HTTPS link to send POST request
	 * @param parameters POST request parameters. currently expecting following parameters:
	 *                   name, email, phone, body, send
	 */
	public static void makePostRequest(String url, Map<String, String> parameters) {
		try {
			ensureAllParametersArePresent(parameters);
			//we need this cookie to submit form
			//String initialCookies = getUrlConnection(url, "").getHeaderField("Set-Cookie");
			//HttpsURLConnection con = getUrlConnection(url, initialCookies);
			HttpsURLConnection con = getUrlConnection(url, "");
			String urlParameters = processRequestParameters(parameters);
			// Send post request
			sendPostParameters(con, urlParameters);
			BufferedReader in = new BufferedReader(
					new InputStreamReader(con.getInputStream()));
			File outputFile = new File(RESPONSE_FILE_LOCATION);
			if (!outputFile.exists()) {
				outputFile.createNewFile();
			}
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outputFile)));
			String inputLine;
			while ((inputLine = in.readLine()) != null) {
				bw.write(inputLine);
			}
			in.close();
			bw.flush();
			bw.close();
			//print result
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * Send POST parameters to given connection
	 *
	 * @param con           connection to set parameters on
	 * @param urlParameters encoded URL POST parameters
	 * @throws IOException
	 */
	private static void sendPostParameters(URLConnection con, String urlParameters) throws IOException {
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(urlParameters);
		wr.flush();
		wr.close();
	}

	/**
	 * Create HttpsURLConnection for given URL with given Cookies
	 *
	 * @param url     url to query
	 * @param cookies cookies to use for this connection
	 * @return ready-to-use HttpsURLConnection
	 * @throws IOException
	 */
	private static HttpsURLConnection getUrlConnection(String url, String cookies) throws IOException {
		HttpsURLConnection con = (HttpsURLConnection) new URL(url).openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("User-Agent", USER_AGENT);
		con.setRequestProperty("Cookie", cookies);
		return con;
	}

	/**
	 * Convert given Map of parameters to URL-encoded string
	 *
	 * @param parameters request parameters
	 * @return URL-encoded parameters string
	 */
	private static String processRequestParameters(Map<String, String> parameters) {
		StringBuilder sb = new StringBuilder();
		for (String parameterName : parameters.keySet()) {
			sb.append(parameterName).append('=').append(urlEncode(parameters.get(parameterName))).append('&');
		}
		return sb.substring(0, sb.length() - 1);
	}

	/**
	 * Encode given String with URLEncoder in UTF-8
	 *
	 * @param s string to encode
	 * @return URL-encoded string
	 */
	private static String urlEncode(String s) {
		try {
			return URLEncoder.encode(s, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// This is impossible, UTF-8 is always supported according to the java standard
			throw new RuntimeException(e);
		}
	}
}
