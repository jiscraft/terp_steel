package kr.terp.msg;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.simple.JSONObject;

public class FcmUtil {

    private static String ApiKey = "AAAAh-2ckuY:APA91bEFLcMU-GAz0EXZtVluY7CkjZ_L6Ldowgci8oKAqHE9h_FMZpMEldoPKRNgNPg-0ygwh4y0ttNo37xspiaG7X7d2Mh_Kr1Eoa0DLXRwqCLXXIUDPJmr2_D1WGgPLf7J6xtQu7Tb";
    private static String SenderId = "583807046374";

    public static void send(String tokenId, String title, String content) {
        System.out.println(tokenId);
        try {
            HttpClient client = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost("https://fcm.googleapis.com/fcm/send");
            post.setHeader("Content-type", "application/json");
            post.setHeader("Authorization", "key="+ApiKey);

            JSONObject notification = new JSONObject();
            notification.put("title", title);
            notification.put("body", content);

            JSONObject message = new JSONObject();
            message.put("to", tokenId);
            message.put("priority", "high");
            message.put("notification", notification);

            System.out.println(message);
            post.setEntity(new StringEntity(message.toString(), "UTF-8"));
            HttpResponse response = client.execute(post);
            System.out.println(response);
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

}
