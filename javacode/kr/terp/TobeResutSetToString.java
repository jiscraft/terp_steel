package kr.terp;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by jiscraft on 2015-12-09.
 * [] dataset만 돌려준다...
 */
public class TobeResutSetToString {
	HashMap<String, Integer> returnMap = new HashMap<String, Integer>();

	//  rscordset 과 metadata를 받아 처리
	public Map getResult(ResultSet rsParam, ResultSetMetaData rsMdParam) throws IOException, SQLException {
		String strResult = "";
		String dataSetName = "data";

		int rowCount = 0;
		StringBuilder temp = new StringBuilder();

		rsParam.last();
		rowCount = rsParam.getRow();
		rsParam.beforeFirst();

		if (rowCount != 0) {
			strResult = convertJson(rsParam, rsMdParam);
			returnMap.put(temp + strResult, rowCount);
			return returnMap;
		}
		else {
			returnMap.put("[]", rowCount);
			return returnMap;
		}
	}

	//  recordset과 metadata를 이용하여 json을 만든뒤 리턴 ( private )
	private String convertJson(ResultSet rs, ResultSetMetaData rsMd) throws SQLException {
		StringBuilder temp = new StringBuilder();
		Object rsValue = null;
		String rsColumn = null;
		String strResult = "";

		temp.append("[");

		while (rs.next()) {
			for (int i = 1; i <= rsMd.getColumnCount(); ++i) {
				rsColumn = rsMd.getColumnName(i);
				if (i == 1) {
					temp.append("{");
				}

				if (rs.getString(i) == null) {
					rsValue = "\"\"";
				}
				else {
					if (rsMd.getColumnTypeName(i) == "datetime") {
						rsValue = "\"" + rs.getString(i) + "\"";
					}
					else if (rsMd.getColumnTypeName(i) == "char" || rsMd.getColumnTypeName(i) == "varchar" || rsMd.getColumnTypeName(i) == "nchar" || rsMd.getColumnTypeName(i) == "nvarchar") {
						//rsValue = "\"" + rs.getString(i) + "\"";
						String val = rs.getString(i);
//						val = val.replaceAll("\"","\\\\\"");
//						val = val.replaceAll("\r","\\r");
//						val = val.replaceAll("\n","\\n");
						rsValue = "\"" + val + "\"";
					}
					else if (rsMd.getColumnTypeName(i) == "int" || rsMd.getColumnTypeName(i) == "bigint") {
						rsValue = rs.getLong(i);
					}
					else if (rsMd.getColumnTypeName(i) == "numeric") {
						rsValue = rs.getDouble(i);
					}
					else if (rsMd.getColumnTypeName(i) == "bit" || rsMd.getColumnTypeName(i) == "smallint" || rsMd.getColumnTypeName(i) == "tinyint") {
						rsValue = rs.getInt(i);
					}
					else if (rsMd.getColumnTypeName(i) == "boolean") {
						rsValue = rs.getBoolean(i);
					}
					else {
						rsValue = "\"" + rs.getString(i).trim() + "\"";
					}
				}

				temp.append("\"").append(rsColumn).append("\":").append(rsValue);

				if (rsMd.getColumnCount() == i) {
					temp.append("},");
				}
				else {
					temp.append(",");
				}
			}

		}

		temp.append("]");
		strResult = temp.toString().replaceAll(",]", "]");
		return strResult;
	}
}
