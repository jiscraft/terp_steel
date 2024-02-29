package kr.terp;//import java.sql.Connection;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by jiscraft on 2015-11-18.
 */
public class TobeDataBaseConnect {
	public Connection connect(String dbString) {
		Connection conn = null;
		try {
			Context initCtx = new InitialContext();
			Context envCtx = (Context) initCtx.lookup("java:/comp/env");
			DataSource ds = (DataSource) envCtx.lookup("jdbc/" + dbString);
			conn = ds.getConnection();
		}
		catch (SQLException se) {
			se.printStackTrace();

		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}

	public void close(PreparedStatement pstmt, Connection conn) {
		try {
			if (pstmt != null) {
				pstmt.close();
			}
			if (conn != null) {
				conn.close();
			}
		}
		catch (SQLException se) {
			se.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void close(ResultSet rs, PreparedStatement pstmt, Connection conn) {
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
		catch (SQLException se) {
			se.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}
