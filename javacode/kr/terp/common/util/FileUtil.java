package kr.terp.common.util;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.StringTokenizer;

import javax.activation.MimetypesFileTypeMap;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.json.simple.JSONObject;

import com.google.gson.JsonObject;

public class FileUtil {

	public static String getVirtualPath(String sfx) {
		SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd");
		return String.format("files/%s/%s", sdf.format(new Date()), sfx);
	}

	public static String getVirtualPath(String pfx, String sfx) {
		SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd");
		String pfxPath = Common.isEmpty(pfx) ? "" : "/" + pfx;
		String sfxPath = Common.isEmpty(sfx) ? "" : "/" + sfx;
		return String.format("files%s/%s%s", pfxPath, sdf.format(new Date()), sfxPath);
	}

	public static String getVirtualPath(String pfx, String datePattern, String sfx) {
		if (Common.isEmpty(datePattern)) datePattern = "yy/MM/dd";
		SimpleDateFormat sdf = new SimpleDateFormat(datePattern);
		String pfxPath = Common.isEmpty(pfx) ? "" : "/" + pfx;
		String sfxPath = Common.isEmpty(sfx) ? "" : "/" + sfx;
		return String.format("files%s/%s%s", pfxPath, sdf.format(new Date()), sfxPath);
	}

	public static String getRealPath(String vp) {
		String rp = null;
		if (!Common.isEmpty(vp)) {
			String[] temp = vp.split("/");
			if ((temp.length > 0) && (temp[0].equalsIgnoreCase("files"))) {
				rp = getRootPath();
				for (int i=1; i<temp.length; i++) rp += File.separator + temp[i];
//System.out.println("getRealPath : " + rp + " ==> " + rp);
				File dir = new File(rp);
				if (!dir.exists()) dir.mkdirs();
				rp = dir.getAbsolutePath();
			}
		}
//System.out.println("getRealPath : " + rp + " ==> " + rp);
		return rp;
	}

	public static String getRootPath() {
		String path = null;
		InitialContext initContext;
		try {
			initContext = new InitialContext();
			Context lookContext = (Context) initContext.lookup("java:comp/env");
			String storageFolder = (String) lookContext.lookup("StorageFolder");
			String storageDrives= (String) lookContext.lookup("StorageDrives");
			StringTokenizer token = new StringTokenizer(storageDrives, ",");
			ArrayList<String> storageDriverList = new ArrayList<String>();
			while (token.hasMoreTokens()) {
				storageDriverList.add(token.nextToken().trim());
			}
//System.out.println(storageDriverList);
//System.out.println(storageFolder);

			String root = null;
			for (int i=0; i<storageDriverList.size(); i++) {
				root = storageDriverList.get(i);
				if (isExist(root)) break;
			}
			if (!Common.isEmpty(root)) {
				if (root.indexOf("//") == 0) path = root + "/" + storageFolder;
				path = root + File.separator + storageFolder;
			}
		}
		catch (NamingException e) {
			e.printStackTrace();
		}
		finally {
//System.out.println("===> "+path);
			return path;
		}
/*
		String[] dirs = new String[ ]{ "Z:", "N:", "D:", "C:", "/Users/Shared/Files" };
		for (int i=0; i<dirs.length; i++) {
			root = dirs[i];
//System.out.println("getRootPath : " + root + " ==> " + isExist(root));
			if (isExist(root)) break;
		}
*/
	}

	public static boolean isExist(String fn) {
		File f = new File(fn);
//System.out.println(fn+".exists() ==> " + f.exists());
		return f.exists();
	}

	public static boolean isExist(String path, String fn) {
		File f = new File(path, fn);
		return f.exists();
	}

	public static JsonObject getFileInfo(String fn) {
		return getFileInfo(new File(fn));
	}

	public static JsonObject getFileInfo(File f) {
		MimetypesFileTypeMap mimeMap = new MimetypesFileTypeMap();
		JsonObject json = new JsonObject();
		json.addProperty("filename", f.getName().substring(0, f.getName().lastIndexOf(".")));
		json.addProperty("fileext", f.getName().substring(f.getName().lastIndexOf(".")+1));
		json.addProperty("fullname", f.getName());
		json.addProperty("fullpath", f.getAbsolutePath());
		json.addProperty("filesize", f.length());
		json.addProperty("mimetype", mimeMap.getContentType(f));
		return json;
	}

	public static JSONObject getFileInfoJson(String fn) {
		File f = new File(fn);
		return Common.gsonObjectToSimpleJsonObject(getFileInfo(f));
	}


/*
	public static void main(String[] args) throws IOException {
		String virtualPath = getVirtualPath("TEST");
		String realPath = getRealPath(virtualPath);
System.out.println("main : " + virtualPath + " ==> " + realPath);
	}
*/
}
