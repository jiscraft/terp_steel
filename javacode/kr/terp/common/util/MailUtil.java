package kr.terp.common.util;

import com.google.gson.JsonArray;
import org.json.simple.JSONObject;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;
import javax.mail.util.ByteArrayDataSource;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Properties;

public class MailUtil {

    public static boolean sendMailWithPdf(JSONObject jsonObject, byte[] pdfBytes) {
        boolean success = true;
        Properties props = new Properties();
        try {
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.put("mail.smtp.socketFactory.port", "465");
            props.put("mail.smtp.socketFactory.fallback", "false");
            props.put("mail.smtp.ssl.enable", "true");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.ssl.trust", "*");

//            props.put("mail.smtp.port", "587");
//            props.put("mail.smtp.starttls.enable", "true");
//            props.put("mail.smtp.auth", "true");

//            props.put("mail.transport.protocol", "smtp");
//            props.put("mail.smtp.debug", "true");

            Authenticator auth = new SMTPAuthenticator(jsonObject.get("account").toString(), jsonObject.get("password").toString());
            Session mailSession = Session.getDefaultInstance(props, auth);
            MimeMessage message = new MimeMessage(mailSession);

            message.setFrom(new InternetAddress(jsonObject.get("account").toString(), jsonObject.get("username").toString(), "utf-8"));
            message.setSubject(jsonObject.get("subject").toString(), "utf-8");

            InternetAddress[] addressTo = { new InternetAddress(jsonObject.get("to").toString()) };
            message.setRecipients(Message.RecipientType.TO, addressTo);

            if ((jsonObject.get("to") != null) && !Common.isEmpty(jsonObject.get("to").toString())) {
                String[] toList = jsonObject.get("to").toString().replaceAll("\\s+", "").split(",");
                int toLength = toList.length;
                if (toLength > 0) {
                    InternetAddress[] addressToList = new InternetAddress[toLength];
                    for (int i = 0; i < toList.length; i++) {
                        toList[i] = toList[i].replaceAll("\\s+", "");
                        if (!Common.isEmpty(toList[i])) {
                            addressToList[i] = new InternetAddress(toList[i]);
                        }
                    }
                    message.setRecipients(Message.RecipientType.TO, addressToList);
                }
            }

            if ((jsonObject.get("cc") != null) && !Common.isEmpty(jsonObject.get("cc").toString())) {
                String[] ccList = jsonObject.get("cc").toString().replaceAll(";",",").replaceAll("\\n",",").replaceAll("\\s+", "").split(",");
                int ccLength = ccList.length;
                InternetAddress[] addressCcList = new InternetAddress[ccLength];
                for (int i = 0; i < ccList.length; i++) {
                    ccList[i] = ccList[i].replaceAll("\\s+", "");
                    if (!Common.isEmpty(ccList[i])) {
                        addressCcList[i] = new InternetAddress(ccList[i]);
                    }
                }
                message.setRecipients(Message.RecipientType.CC, addressCcList);
            }

            String html = jsonObject.get("html").toString();
            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(html, "text/html; charset=utf-8");
            //messageBodyPart.setText("This is message body");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);

            if (pdfBytes != null) {
                messageBodyPart = new MimeBodyPart();
                DataSource source = new ByteArrayDataSource(pdfBytes, "application/pdf");
                messageBodyPart.setDataHandler(new DataHandler(source));
                messageBodyPart.setFileName(MimeUtility.encodeText(jsonObject.get("pdfFileName").toString(), "UTF-8", null));
                multipart.addBodyPart(messageBodyPart);
            }

            message.setContent(multipart);
            Transport.send(message);
        }
        catch (Exception e) {
            e.printStackTrace();
            success = false;
        }
        finally {
            return success;
        }
    }

    public static boolean sendMailWithPdfFile(JSONObject jsonObject) {
        boolean success = true;
        Properties props = new Properties();
        try {
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.put("mail.smtp.socketFactory.port", "465");
            props.put("mail.smtp.socketFactory.fallback", "false");
            props.put("mail.smtp.ssl.enable", "true");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.ssl.trust", "*");

//            props.put("mail.smtp.port", "587");
//            props.put("mail.smtp.starttls.enable", "true");
//            props.put("mail.smtp.auth", "true");

//            props.put("mail.transport.protocol", "smtp");
//            props.put("mail.smtp.debug", "true");


            props.put("mail.smtp.host", jsonObject.get("smtp").toString());
            props.put("mail.mime.encodeparameters", "false");

            Authenticator auth = new SMTPAuthenticator(jsonObject.get("account").toString(), jsonObject.get("password").toString());
            Session mailSession = Session.getDefaultInstance(props, auth);
            MimeMessage message = new MimeMessage(mailSession);

            message.setFrom(new InternetAddress(jsonObject.get("account").toString(), jsonObject.get("username").toString(), "utf-8"));
            message.setSubject(jsonObject.get("subject").toString(), "utf-8");

            if ((jsonObject.get("to") != null) && !Common.isEmpty(jsonObject.get("to").toString())) {
                String[] toList = jsonObject.get("to").toString().replaceAll(";",",").replaceAll("\\n",",").replaceAll("\\s+", "").split(",");
                int toLength = toList.length;
                if (toLength > 0) {
                    InternetAddress[] addressToList = new InternetAddress[toLength];
                    for (int i = 0; i < toList.length; i++) {
                        toList[i] = toList[i].replaceAll("\\s+", "");
                        if (!Common.isEmpty(toList[i])) {
                            addressToList[i] = new InternetAddress(toList[i]);
                        }
                    }
                    message.setRecipients(Message.RecipientType.TO, addressToList);
                }
            }

            if ((jsonObject.get("cc") != null) && !Common.isEmpty(jsonObject.get("cc").toString())) {
                String[] ccList = jsonObject.get("cc").toString().replaceAll("\\s+", "").split(",");
                int ccLength = ccList.length;
                if (ccLength > 0) {
                    InternetAddress[] addressCcList = new InternetAddress[ccLength];
                    for (int i = 0; i < ccList.length; i++) {
                        ccList[i] = ccList[i].replaceAll("\\s+", "");
                        if (!Common.isEmpty(ccList[i])) {
                            addressCcList[i] = new InternetAddress(ccList[i]);
                        }
                    }
                    message.setRecipients(Message.RecipientType.CC, addressCcList);
                }
            }

            String html = jsonObject.get("html").toString();
            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(html, "text/html; charset=utf-8");
            //messageBodyPart.setText("This is message body");

            if ((jsonObject.get("pdfRealPath") != null) && !Common.isEmpty(jsonObject.get("pdfRealPath").toString())) {
                Multipart multipart = new MimeMultipart();
                multipart.addBodyPart(messageBodyPart);
                messageBodyPart = new MimeBodyPart();
                DataSource source = new FileDataSource(jsonObject.get("pdfRealPath").toString());
                messageBodyPart.setDataHandler(new DataHandler(source));
                messageBodyPart.setFileName(MimeUtility.encodeText(jsonObject.get("pdfFileName").toString(), "UTF-8", null));
                multipart.addBodyPart(messageBodyPart);
                message.setContent(multipart);
            }
            Transport.send(message);
        }
        catch (Exception e) {
            e.printStackTrace();
            success = false;
        }
        finally {
            return success;
        }
    }

}
