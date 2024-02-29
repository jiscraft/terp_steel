package kr.terp.common.vo;

import java.util.List;

public class JsonResponseVo {

	private Integer success;
	private List<?> results;
	private List<AjaxErrorVo> errors;

	private Integer RES_NUM;
	private String RES_STR;

	public Integer getRES_NUM() {
		return RES_NUM;
	}
	public void setRES_NUM(Integer RES_NUM) {
		this.RES_NUM = RES_NUM;
	}

	public String getRES_STR() {
		return RES_STR;
	}
	public void setRES_STR(String RES_STR) {
		this.RES_STR = RES_STR == null ? null : RES_STR.trim();
	}

	public int getSuccess() {
		return success;
	}
	public void setSuccess(Integer success) {
		this.success = success;
	}

	public List<?> getResults() {
		return results;
	}
	public void setResults(List<?> results) {
		this.results = results;
	}

	public List<AjaxErrorVo> getErrors() {
		return errors;
	}
	public void setErrors(List<AjaxErrorVo> errors) {
		this.errors = errors;
	}

}
