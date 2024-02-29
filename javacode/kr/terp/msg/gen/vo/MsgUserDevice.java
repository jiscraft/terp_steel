package kr.terp.msg.gen.vo;

public class MsgUserDevice extends MsgUserDeviceKey {
    private String FG_D;

    private String DC_OS;

    private String DC_VER;

    private String DC_MDL;

    private String DC_TEL;

    private String YN_USE;

    private String DC_RMK;

    private String DTS_INSERT;

    private String ID_INSERT;

    private String DTS_UPDATE;

    private String ID_UPDATE;

    public String getFG_D() {
        return FG_D;
    }

    public void setFG_D(String FG_D) {
        this.FG_D = FG_D == null ? null : FG_D.trim();
    }

    public String getDC_OS() {
        return DC_OS;
    }

    public void setDC_OS(String DC_OS) {
        this.DC_OS = DC_OS == null ? null : DC_OS.trim();
    }

    public String getDC_VER() {
        return DC_VER;
    }

    public void setDC_VER(String DC_VER) {
        this.DC_VER = DC_VER == null ? null : DC_VER.trim();
    }

    public String getDC_MDL() {
        return DC_MDL;
    }

    public void setDC_MDL(String DC_MDL) {
        this.DC_MDL = DC_MDL == null ? null : DC_MDL.trim();
    }

    public String getDC_TEL() {
        return DC_TEL;
    }

    public void setDC_TEL(String DC_TEL) {
        this.DC_TEL = DC_TEL == null ? null : DC_TEL.trim();
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