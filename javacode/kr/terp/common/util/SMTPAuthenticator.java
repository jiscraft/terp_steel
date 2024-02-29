package kr.terp.common.util;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class SMTPAuthenticator extends Authenticator {

    protected static String account = "";
    protected static String password = "";

    public SMTPAuthenticator(String user, String pwd) {
        account = user;
        password = pwd;
    }

    public PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(account, password);
    }

}
