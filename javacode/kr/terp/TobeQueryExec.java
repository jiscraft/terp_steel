package kr.terp;

import com.microsoft.sqlserver.jdbc.SQLServerBulkCSVFileRecord;
import com.microsoft.sqlserver.jdbc.SQLServerBulkCopy;
import com.microsoft.sqlserver.jdbc.SQLServerBulkCopyOptions;
import org.json.simple.JSONArray;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.*;
import java.util.Date;

/**
 * Created by jiscraft on 2015-11-21.
 * 쿼리실행(SELECT문및 프로시져(문은 lIST로 받은뒤 한줄씩 처리하고 결과를 처리한뒤
 * dataReturnType : 결과값을 일반 json으로 받을지 tree  json 로 받을지 정한다.
 * 리턴(STRING)
 */

public class TobeQueryExec {

	public String queryExec(List<String> queryRequset, String agentName, String dataReturnType) throws SQLException {
		Connection conn = null;
		String strMsg = "";
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean booleanSuccess = true, resultsAvailable = true;
		int j = 0, dataNo = 0, rowCount = 0;
		HashMap<String, Integer> returnMap = new HashMap<String, Integer>();
		TobeResutSetToString jsonResult = new TobeResutSetToString();
		String strResult = null;
		StringBuilder temp = new StringBuilder();
		List list = new ArrayList();

		if (dataReturnType == null) {
			dataReturnType = "json";
		}

		try {
			if (queryRequset.size() == 0) {
				strMsg = "처리할 정보가 한건도 없습니다.";
				throw new Exception();
			}

			TobeDataBaseConnect db = new TobeDataBaseConnect();
			conn = db.connect(agentName);
			if (conn == null) {
				strMsg = "database 접속실패";
				throw new Exception();
			}

			conn.setAutoCommit(false);
			System.out.println("-- transaction start [" +  new Date().toString() + "]");
			for (int i = 0; i < queryRequset.size(); i++) {
				pstmt = conn.prepareStatement(queryRequset.get(i), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

				System.out.println(queryRequset.get(i));

				pstmt.setEscapeProcessing(true);

				resultsAvailable = pstmt.execute();
				while (resultsAvailable) {
					rs = pstmt.getResultSet();
					ResultSetMetaData rsMd = rs.getMetaData();
					list.add(jsonResult.getResult(rs, rsMd));  // resultset과 metadata를 보내 json스트링으로 만들어온뒤  list에 보관 결과는 hashmap
					resultsAvailable = pstmt.getMoreResults(); // 한쿼리에 다른 리절트셋이 있는지 체크하여 있으면 반복
				}
			}

			//리스트에 정보를 읽어서 json화일을 완성
			if (list.size() != 0) {
				Map map = new HashMap();
				HashMap getMap = new HashMap();
				getMap = (HashMap) list.get(0);


				Iterator<String> keys = getMap.keySet().iterator();
				while (keys.hasNext()) {
					String key = keys.next();
					if (j != 0) {
						temp.append(",");
						temp.append("\"data").append(j).append("\" :").append(key);
					}
					else {
						rowCount = Integer.parseInt(getMap.get(key).toString());
						temp.append("\"data").append("\" :").append(key);
					}

					j++;
				}
			}
			else {
				temp.append("\"data").append("\" :[]");
			}

			booleanSuccess = true;
			strMsg = "";
			strResult = temp.toString();
			conn.setAutoCommit(true);

		}
		catch (SQLException se) {
			booleanSuccess = false;
			strMsg = se.toString().replace("com.microsoft.sqlserver.jdbc.SQLServerException: ", "");
			strMsg = strMsg.replace("\"","'");
			strResult = "\"data\":[]";
			rowCount = 0;
			if (conn != null) {
				conn.rollback();
				conn.setAutoCommit(true);
			}
		}
		catch (Exception ex) {
			if (strMsg.trim().length() == 0) {
				strMsg = ex.toString();
			}

			booleanSuccess = false;
			strResult = "\"data\":[]";
			rowCount = 0;
			if (conn != null) {
				conn.rollback();
				conn.setAutoCommit(true);
			}

		}
		finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (pstmt != null) {
					pstmt.close();
				}
				if (conn != null) {
					conn.close();
				}
			}
			catch (Exception ex) {
				ex.printStackTrace();
			}
			finally {

				System.out.println("-- transaction end  [" +  new Date().toString() + "]" );
				if (dataReturnType != "tree") {
					strResult = "{ \"success\":" + booleanSuccess + ", " + strResult + ", \"msg\":\"" + strMsg + "\", \"rowCount\":" + rowCount + "}";
				}
				else {
					strResult = strResult.replace("\"data\" :[{\"\":\"", "");
					strResult = strResult.replace("\"}]", "");
				}
				return strResult;
			}
		}

	}

	///// START: Andrew 20201003

	public String bulkCopy(String header, JSONArray data, String tableName, String agentName, String dataReturnType) throws SQLException {
		Connection conn = null;
		String strMsg = "";
		boolean booleanSuccess = true, resultsAvailable = true;
		int rowCount = 0;
		String strResult = null;

		if (dataReturnType == null) {
			dataReturnType = "json";
		}

		try {
			if (data.size() == 0) {
				strMsg = "처리할 정보가 한건도 없습니다.";
				throw new Exception();
			}

			StringBuilder sb = new StringBuilder();
			sb.append(String.format("%s\n", header));
			for (int i=0; i<data.size(); i++) {
				sb.append(String.format("%s\n", data.get(i).toString()));
			}

			byte[] bytes = sb.toString().getBytes(StandardCharsets.UTF_8);
			InputStream inputStream = new ByteArrayInputStream(bytes);
			SQLServerBulkCSVFileRecord fileRecord = new SQLServerBulkCSVFileRecord(inputStream, StandardCharsets.UTF_8.name(), ",", true);

			String[] fieldNames = header.split(",");
			for (int i = 0; i < fieldNames.length; i++){
				fileRecord.addColumnMetadata((i+1), fieldNames[i], Types.NVARCHAR, 0, 0);
			}

			//TobeDataBaseConnect db = new TobeDataBaseConnect();
			//conn = db.connect(agentName);
//			String connStr = "jdbc:sqlserver://112.175.92.83:5539;databaseName=TSOFTGH;user=terp;password=!tobesoft3034!";
//			String connStr = "jdbc:sqlserver://localhost:1433;databaseName=TSOFTGH;user=terp;password=!tobesoft3034!";
// 			String connStr = "jdbc:sqlserver://engsoft.iptime.org:30211;databaseName=TSOFTGH;user=terp;password=!tobesoft3034!";
			String connStr = "jdbc:sqlserver://222.122.79.116:18697;databaseName=TERP;user=terp;password=!tobesoft3034!";

			System.out.println(connStr);
			conn = DriverManager.getConnection(connStr);
			System.out.println(conn);
			if (conn == null) {
				strMsg = "database 접속실패";
				throw new SQLException();
			}
			conn.setAutoCommit(false);
			booleanSuccess = true;

			SQLServerBulkCopyOptions copyOptions = new SQLServerBulkCopyOptions();
			copyOptions.setBatchSize(10000);

			SQLServerBulkCopy bulkCopy = new SQLServerBulkCopy(conn);
			bulkCopy.setBulkCopyOptions(copyOptions);
			bulkCopy.setDestinationTableName(tableName);
			bulkCopy.writeToServer(fileRecord);

			strMsg = "";
			strResult = "\"data\":[]";
			conn.setAutoCommit(true);

		}
		catch (SQLException se) {
			booleanSuccess = false;
			strMsg = se.toString().replace("com.microsoft.sqlserver.jdbc.SQLServerException: ", "");
			strMsg = strMsg.replace("\"","'");
			strResult = "\"data\":[]";
			rowCount = 0;
			if (conn != null) {
				conn.rollback();
				conn.setAutoCommit(true);
			}
		}
		catch (Exception ex) {
			if (strMsg.trim().length() == 0) {
				strMsg = ex.toString();
			}

			booleanSuccess = false;
			strResult = "\"data\":[]";
			rowCount = 0;
			if (conn != null) {
				conn.rollback();
				conn.setAutoCommit(true);
			}

		}
		finally {
			try {
				if (conn != null) {
					conn.close();
				}
			}
			catch (Exception ex) {
				ex.printStackTrace();
			}
			finally {
				if (dataReturnType != "tree") {
					strResult = "{ \"success\":" + booleanSuccess + ", " + strResult + ", \"msg\":\"" + strMsg + "\", \"rowCount\":" + rowCount + "}";
				}
				else {
					strResult = strResult.replace("\"data\" :[{\"\":\"", "");
					strResult = strResult.replace("\"}]", "");
				}
				return strResult;
			}
		}
	}
	///// END: Andrew 20201003

}
