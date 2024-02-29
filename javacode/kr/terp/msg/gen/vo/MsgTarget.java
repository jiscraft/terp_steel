package kr.terp.msg.gen.vo;

public class MsgTarget extends MsgTargetKey {
    private String NM_USER;

    private String YN_READ;

    private String DTS_READ;

    private String FG_PUSH;

    private String DTS_PUSH;

    private String YN_USE;

    private String DC_RMK;

    private String DTS_INSERT;

    private String ID_INSERT;

    private String DTS_UPDATE;

    private String ID_UPDATE;

    public String getNM_USER() {
        return NM_USER;
    }

    public void setNM_USER(String NM_USER) {
        this.NM_USER = NM_USER == null ? null : NM_USER.trim();
    }

    public String getYN_READ() {
        return YN_READ;
    }

    public void setYN_READ(String YN_READ) {
        this.YN_READ = YN_READ == null ? null : YN_READ.trim();
    }

    public String getDTS_READ() {
        return DTS_READ;
    }

    public void setDTS_READ(String DTS_READ) {
        this.DTS_READ = DTS_READ == null ? null : DTS_READ.trim();
    }

    public String getFG_PUSH() {
        return FG_PUSH;
    }

    public void setFG_PUSH(String FG_PUSH) {
        this.FG_PUSH = FG_PUSH == null ? null : FG_PUSH.trim();
    }

    public String getDTS_PUSH() {
        return DTS_PUSH;
    }

    public void setDTS_PUSH(String DTS_PUSH) {
        this.DTS_PUSH = DTS_PUSH == null ? null : DTS_PUSH.trim();
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