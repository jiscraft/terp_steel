package kr.terp.msg.gen.vo;

public class MsgAttach extends MsgAttachKey {
    private String FN_SRC;

    private String FM_SRC;

    private String FS_SRC;

    private String FN_NEW;

    private String FP_URI;

    private String YN_USE;

    private String DC_RMK;

    private String DTS_INSERT;

    private String ID_INSERT;

    private String DTS_UPDATE;

    private String ID_UPDATE;

    public String getFN_SRC() {
        return FN_SRC;
    }

    public void setFN_SRC(String FN_SRC) {
        this.FN_SRC = FN_SRC == null ? null : FN_SRC.trim();
    }

    public String getFM_SRC() {
        return FM_SRC;
    }

    public void setFM_SRC(String FM_SRC) {
        this.FM_SRC = FM_SRC == null ? null : FM_SRC.trim();
    }

    public String getFS_SRC() {
        return FS_SRC;
    }

    public void setFS_SRC(String FS_SRC) {
        this.FS_SRC = FS_SRC == null ? null : FS_SRC.trim();
    }

    public String getFN_NEW() {
        return FN_NEW;
    }

    public void setFN_NEW(String FN_NEW) {
        this.FN_NEW = FN_NEW == null ? null : FN_NEW.trim();
    }

    public String getFP_URI() {
        return FP_URI;
    }

    public void setFP_URI(String FP_URI) {
        this.FP_URI = FP_URI == null ? null : FP_URI.trim();
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