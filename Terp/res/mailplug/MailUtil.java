package kr.terp.msg;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.simple.JSONObject;

import java.util.ArrayList;
import java.util.UUID;

public class MailUtil {

    private static String ApiKey = "!AirtechMailKey";

    public static void get() {
        System.out.println();
        try {
            HttpClient client = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost("http://mail.airtecheng.co.kr/mail_api/token_sso");
            post.setHeader("Content-type", "application/json");
            post.setHeader("Authorization", "key="+ApiKey);

            JSONObject data = new JSONObject();
            data.put("cid", "jslee");
            data.put("MailToken", UUID.randomUUID().toString().replaceAll("-",""));

            JSONObject params = new JSONObject();
            params.put("api_key", ApiKey);
            params.put("host_domain", "airtecheng.co.kr");
            params.put("data", data.toString());

            System.out.println(params);
            post.setEntity(new StringEntity(params.toString(), "UTF-8"));
            HttpResponse response = client.execute(post);
            System.out.println(response);

            HttpEntity entity = response.getEntity();
            System.out.println(entity);
            System.out.println(EntityUtils.toString(entity));
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

}
