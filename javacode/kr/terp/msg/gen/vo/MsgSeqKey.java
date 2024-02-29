package kr.terp.msg.gen.vo;

public class MsgSeqKey {
    private String FG;

    private String DT;

    public String getFG() {
        return FG;
    }

    public void setFG(String FG) {
        this.FG = FG == null ? null : FG.trim();
    }

    public String getDT() {
        return DT;
    }

    public void setDT(String DT) {
        this.DT = DT == null ? null : DT.trim();
    }
}