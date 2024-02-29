package kr.terp.msg.gen.vo;

public class MsgClient {
    private String ID_CLIENT;

    private String NM_CLIENT;

    private String YN_USE;

    private String DC_RMK;

    private String DTS_INSERT;

    private String ID_INSERT;

    private String DTS_UPDATE;

    private String ID_UPDATE;

    public String getID_CLIENT() {
        return ID_CLIENT;
    }

    public void setID_CLIENT(String ID_CLIENT) {
        this.ID_CLIENT = ID_CLIENT == null ? null : ID_CLIENT.trim();
    }

    public String getNM_CLIENT() {
        return NM_CLIENT;
    }

    public void setNM_CLIENT(String NM_CLIENT) {
        this.NM_CLIENT = NM_CLIENT == null ? null : NM_CLIENT.trim();
    }

    public String getYN_USE() {
        return YN_USE;
    }

    public void setYN_USE(String YN_USE) {
        this.YN_USE = YN_USE == null ? null : YN_USE.trim();
    }

    public String getDC_RMK() {
        return DC_RMK;
    }

    public void setDC_RMK(String DC_RMK) {
        this.DC_RMK = DC_RMK == null ? null : DC_RMK.trim();
    }

    public String getDTS_INSERT() {
        return DTS_INSERT;
    }

    public void setDTS_INSERT(String DTS_INSERT) {
        this.DTS_INSERT = DTS_INSERT == null ? null : DTS_INSERT.trim();
    }

    public String getID_INSERT() {
        return ID_INSERT;
    }

    public void setID_INSERT(String ID_INSERT) {
        this.ID_INSERT = ID_INSERT == null ? null : ID_INSERT.trim();
    }

    public String getDTS_UPDATE() {
        return DTS_UPDATE;
    }

    public void setDTS_UPDATE(String DTS_UPDATE) {
        this.DTS_UPDATE = DTS_UPDATE == null ? null : DTS_UPDATE.trim();
    }

    public String getID_UPDATE() {
        return ID_UPDATE;
    }

    public void setID_UPDATE(String ID_UPDATE) {
        this.ID_UPDATE = ID_UPDATE == null ? null : ID_UPDATE.trim();
    }
}