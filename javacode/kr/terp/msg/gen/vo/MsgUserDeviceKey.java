package kr.terp.msg.gen.vo;

public class MsgUserDeviceKey {
    private String ID_PROJECT;

    private String ID_USER;

    private String ID_DEVICE;

    public String getID_PROJECT() {
        return ID_PROJECT;
    }

    public void setID_PROJECT(String ID_PROJECT) {
        this.ID_PROJECT = ID_PROJECT == null ? null : ID_PROJECT.trim();
    }

    public String getID_USER() {
        return ID_USER;
    }

    public void setID_USER(String ID_USER) {
        this.ID_USER = ID_USER == null ? null : ID_USER.trim();
    }

    public String getID_DEVICE() {
        return ID_DEVICE;
    }

    public void setID_DEVICE(String ID_DEVICE) {
        this.ID_DEVICE = ID_DEVICE == null ? null : ID_DEVICE.trim();
    }
}