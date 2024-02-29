package kr.terp.msg.gen.vo;

public class MsgSeq extends MsgSeqKey {
    private Integer SQ;

    private String DC_SQ;

    public Integer getSQ() {
        return SQ;
    }

    public void setSQ(Integer SQ) {
        this.SQ = SQ;
    }

    public String getDC_SQ() {
        return DC_SQ;
    }

    public void setDC_SQ(String DC_SQ) {
        this.DC_SQ = DC_SQ == null ? null : DC_SQ.trim();
    }
}