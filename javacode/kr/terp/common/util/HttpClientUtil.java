package kr.terp.common.util;

import java.io.File;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class HttpClientUtil {

	private int SocketTimeout = 3000;
	private int ConnectTimeout = 3000;
	private RequestConfig HttpRequestConfig = null;

	public HttpClientUtil() {
		this.setHttpRequestConfig();
	}

	public HttpClientUtil(int timeout) {
		this.setSocketTimeout(timeout);
		this.setConnectTimeout(timeout);
		this.setHttpRequestConfig();
	}

	public HttpClientUtil(int socketTimeout, int connectTimeout) {
		this.setSocketTimeout(socketTimeout);
		this.setConnectTimeout(connectTimeout);
		this.setHttpRequestConfig();
	}

	public int getSocketTimeout() {
		return this.SocketTimeout;
	}
	public void setSocketTimeout(int socketTimeout) {
		this.SocketTimeout = socketTimeout;
	}
	public int getConnectTimeout() {
		return this.ConnectTimeout;
	}
	public void setConnectTimeout(int connectTimeout) {
		this.ConnectTimeout = connectTimeout;
	}
	public RequestConfig getHttpRequestConfig() {
		return this.HttpRequestConfig;
	}
	public void setHttpRequestConfig() {
		this.HttpRequestConfig = RequestConfig.custom()
								.setSocketTimeout(this.getSocketTimeout())
								.setConnectTimeout(this.getConnectTimeout())
								.build();
	}
	public void setHttpRequestConfig(int socketTimeout, int connectTimeout) {
		this.HttpRequestConfig = RequestConfig.custom()
								.setSocketTimeout(socketTimeout)
								.setConnectTimeout(connectTimeout)
								.build();
	}

	public JsonObject get(JsonObject jsonRequest) {
		//System.out.println("===== Start of HttpClientUtil.get() =====");
		List<Object> errors = new ArrayList<Object>();
		JsonObject jsonResponse = new JsonObject();
		CloseableHttpClient httpClient = HttpClients.createDefault();
		CloseableHttpResponse httpResponse = null;
		try {
			String queryString = "";
			JsonObject jsonParams = jsonRequest.get("params").getAsJsonObject();
			Set<Map.Entry<String, JsonElement>> entries = jsonParams.entrySet();
			for (Map.Entry<String, JsonElement> entry: entries) {
				queryString += "&" + entry.getKey() + "=" + URLEncoder.encode(jsonParams.get(entry.getKey()).getAsString(), "UTF-8");
			}
			if (!Common.isEmpty(queryString)) queryString = "?" + queryString.substring(1);

			HttpGet httpGet = new HttpGet(jsonRequest.get("url").getAsString() + queryString);
			httpGet.setConfig(this.getHttpRequestConfig());
			httpResponse = httpClient.execute(httpGet);
			HttpEntity httpEntity = httpResponse.getEntity();

			//System.out.println(httpGet.getURI());
			//System.out.println(httpResponse.getProtocolVersion());
			//System.out.println(httpResponse.getStatusLine().getStatusCode());
			//System.out.println(httpResponse.getStatusLine().getReasonPhrase());
			//System.out.println(httpEntity.getContentType());
			//System.out.println(httpEntity.getContentLength());

			jsonResponse = Common.jsonStrToGsonObject(EntityUtils.toString(httpEntity));
			//System.out.println(jsonResponse.toString());
		} catch (Exception e) {
			e.printStackTrace();
			errors.add(Common.getAjaxErrorVo(e));
			jsonResponse.addProperty("success", -1);
			jsonResponse.add("errors", Common.voListToGsonArray(errors));
		} finally {
			try {
				httpResponse.close();
				httpClient.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		//System.out.println("===== End of HttpClientUtil.get() =====");
		return jsonResponse;
	}

	public JsonObject post(JsonObject jsonRequest) {
		//System.out.println("===== Start of HttpClientUtil.post() =====");
		List<Object> errors = new ArrayList<Object>();
		JsonObject jsonResponse = new JsonObject();
		CloseableHttpClient httpClient = HttpClients.createDefault();
		CloseableHttpResponse httpResponse = null;
		try {
			List<NameValuePair> params = new ArrayList<NameValuePair>();
			JsonObject jsonParams = jsonRequest.get("params").getAsJsonObject();
			Set<Map.Entry<String, JsonElement>> entries = jsonParams.entrySet();
			for (Map.Entry<String, JsonElement> entry: entries) {
				params.add(new BasicNameValuePair(entry.getKey(), jsonParams.get(entry.getKey()).getAsString()));
			}
			UrlEncodedFormEntity encodedFormEntity = new UrlEncodedFormEntity(params, "UTF-8");

			HttpPost httpPost = new HttpPost(jsonRequest.get("url").getAsString());
			httpPost.setEntity(encodedFormEntity);
			httpPost.setConfig(this.getHttpRequestConfig());
			httpResponse = httpClient.execute(httpPost);
			HttpEntity httpEntity = httpResponse.getEntity();

			//System.out.println(httpPost.getURI());
			//System.out.println(httpResponse.getProtocolVersion());
			//System.out.println(httpResponse.getStatusLine().getStatusCode());
			//System.out.println(httpResponse.getStatusLine().getReasonPhrase());
			//System.out.println(httpEntity.getContentType());
			//System.out.println(httpEntity.getContentLength());

			jsonResponse = Common.jsonStrToGsonObject(EntityUtils.toString(httpEntity));
			//System.out.println(jsonResponse.toString());
		} catch (Exception e) {
			e.printStackTrace();
			errors.add(Common.getAjaxErrorVo(e));
			jsonResponse.addProperty("success", -1);
			jsonResponse.add("errors", Common.voListToGsonArray(errors));
		} finally {
			try {
				httpResponse.close();
				httpClient.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		//System.out.println(jsonResponse);
		//System.out.println("===== End of HttpClientUtil.post() =====");
		return jsonResponse;
	}

	public JsonObject upload(String url, File file, JsonObject jsonExtra) {
		//System.out.println("===== Start of HttpClientUtil.upload() (Single) =====");
		List<Object> errors = new ArrayList<Object>();
		JsonObject jsonResponse = new JsonObject();
		CloseableHttpClient httpClient = HttpClients.createDefault();
		CloseableHttpResponse httpResponse = null;
		try {
			StringBody jsonBody = new StringBody(jsonExtra.toString(), ContentType.MULTIPART_FORM_DATA);
			FileBody fileBody = new FileBody(file, ContentType.DEFAULT_BINARY);

			MultipartEntityBuilder builder = MultipartEntityBuilder.create();
			builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
			builder.addPart("file", fileBody);
			builder.addPart("data", jsonBody);
			HttpEntity multipartEntry = builder.build();

			HttpPost httpPost = new HttpPost(url);
			httpPost.setEntity(multipartEntry);
			httpPost.setConfig(this.getHttpRequestConfig());
			httpResponse = httpClient.execute(httpPost);
			HttpEntity httpEntity = httpResponse.getEntity();

			//System.out.println(httpPost.getURI());
			//System.out.println(httpResponse.getProtocolVersion());
			//System.out.println(httpResponse.getStatusLine().getStatusCode());
			//System.out.println(httpResponse.getStatusLine().getReasonPhrase());
			//System.out.println(httpEntity.getContentType());
			//System.out.println(httpEntity.getContentLength());

			jsonResponse = Common.jsonStrToGsonObject(EntityUtils.toString(httpEntity));
			//System.out.println(jsonResponse.toString());
		} catch (Exception e) {
			e.printStackTrace();
			errors.add(Common.getAjaxErrorVo(e));
			jsonResponse.addProperty("success", -1);
			jsonResponse.add("errors", Common.voListToGsonArray(errors));
		} finally {
			try {
				httpResponse.close();
				httpClient.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		//System.out.println("===== End of HttpClientUtil.upload() (Single) =====");
		return jsonResponse;
	}

	public JsonObject upload(String url, List<File> files, JsonObject jsonExtra) {
		//System.out.println("===== Start of HttpClientUtil.upload() (Multi) =====");
		List<Object> errors = new ArrayList<Object>();
		JsonObject jsonResponse = new JsonObject();
		CloseableHttpClient httpClient = HttpClients.createDefault();
		CloseableHttpResponse httpResponse = null;
		try {
			StringBody jsonBody = new StringBody(jsonExtra.toString(), ContentType.MULTIPART_FORM_DATA);
			List<FileBody> fileBodies = new ArrayList<FileBody>();
			for (File file : files) fileBodies.add(new FileBody(file, ContentType.DEFAULT_BINARY));

			MultipartEntityBuilder builder = MultipartEntityBuilder.create();
			builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
			for (FileBody fileBody : fileBodies) builder.addPart("files", fileBody);
			builder.addPart("data", jsonBody);
			HttpEntity multipartEntry = builder.build();

			HttpPost httpPost = new HttpPost(url);
			httpPost.setEntity(multipartEntry);
			httpPost.setConfig(this.getHttpRequestConfig());
			httpResponse = httpClient.execute(httpPost);
			HttpEntity httpEntity = httpResponse.getEntity();

			//System.out.println(httpPost.getURI());
			//System.out.println(httpResponse.getProtocolVersion());
			//System.out.println(httpResponse.getStatusLine().getStatusCode());
			//System.out.println(httpResponse.getStatusLine().getReasonPhrase());
			//System.out.println(httpEntity.getContentType());
			//System.out.println(httpEntity.getContentLength());

			jsonResponse = Common.jsonStrToGsonObject(EntityUtils.toString(httpEntity));
			//System.out.println(jsonResponse.toString());
		} catch (Exception e) {
			e.printStackTrace();
			errors.add(Common.getAjaxErrorVo(e));
			jsonResponse.addProperty("success", -1);
			jsonResponse.add("errors", Common.voListToGsonArray(errors));
		} finally {
			try {
				httpResponse.close();
				httpClient.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		//System.out.println("===== End of HttpClientUtil.upload() (Multi) =====");
		return jsonResponse;
	}

}
