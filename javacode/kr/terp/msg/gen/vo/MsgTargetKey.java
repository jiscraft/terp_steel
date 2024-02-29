package kr.terp.msg.gen.vo;

public class MsgTargetKey {
    private String ID_PROJECT;

    private String ID_MSG;

    private String ID_USER;

    public String getID_PROJECT() {
        return ID_PROJECT;
    }

    public void setID_PROJECT(String ID_PROJECT) {
        this.ID_PROJECT = ID_PROJECT == null ? null : ID_PROJECT.trim();
    }

    public String getID_MSG() {
        return ID_MSG;
    }

    public void setID_MSG(String ID_MSG) {
        this.ID_MSG = ID_MSG == null ? null : ID_MSG.trim();
    }

    public String getID_USER() {
        return ID_USER;
    }

    public void setID_USER(String ID_USER) {
        this.ID_USER = ID_USER == null ? null : ID_USER.trim();
    }
}