package kr.terp.common.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class HtmlUtil {

	public static JsonObject stripAndSaveHtml(String strHtml, String vp) {
		JsonObject json = null;
		String path = FileUtil.getRealPath(vp);
		String savedAbsolutePath = saveHtmlFile(strHtml, path);
		if (!Common.isEmpty(savedAbsolutePath)) {
			json = new JsonObject();
			json.addProperty("text", stripHtmlTags(strHtml));
			json.addProperty("vpath", vp);
			json.addProperty("rpath", path);
			JsonObject fileInfo = FileUtil.getFileInfo(savedAbsolutePath);
			Set<Map.Entry<String, JsonElement>> entries = fileInfo.entrySet();
			for (Map.Entry<String, JsonElement> entry: entries) {
				String key = entry.getKey();
				String val = fileInfo.get(entry.getKey()).getAsString();
				json.addProperty(key, val);
			}
		}
		return json;
	}

	public static String stripHtmlTags(String strHtml) {
		return Jsoup.parse(strHtml, "UTF-8").text();
	}

	public static Document getHtmlDoc(String strHtml) {
		return Jsoup.parse(strHtml, "UTF-8");
	}

	public static Element getHtmlBodyElem(String strHtml) {
		Document doc = getHtmlDoc(strHtml);
		if (doc != null) return doc.body();
		else return null;
	}

	public static Elements getHtmlElem(String strHtml, String selector ) {
		Document doc = getHtmlDoc(strHtml);
		if (doc != null) return doc.select(selector);
		else return null;
	}

	public static String getHtmlTag(String strHtml) {
		Document doc = getHtmlDoc(strHtml);
		if (doc != null) return doc.html();
		else return null;
	}

	public static String getHtmlBodyTag(String strHtml) {
		Element body = getHtmlBodyElem(strHtml);
		if (body != null) return body.html();
		else return null;
	}

	public static String getHtmlElemTag(String strHtml, String selector ) {
		StringBuilder sb = new StringBuilder();
		Elements els = getHtmlElem(strHtml, selector);
		if (els != null) {
			for (Element el : els) {
				sb.append(el.html());
			}
		}
		return sb.toString();
	}

	public static String getHtmlText(String strHtml) {
		return stripHtmlTags(getHtmlTag(strHtml));
	}

	public static String getHtmlBodyText(String strHtml) {
		return stripHtmlTags(getHtmlBodyTag(strHtml));
	}

	public static String getHtmlElemText(String strHtml, String selector ) {
		return stripHtmlTags(getHtmlElemTag(strHtml, selector));
	}

	public static String saveHtmlFile(String strHtml, String path) {
		Document doc = Jsoup.parse(strHtml, "UTF-8");
		doc.head().appendElement("meta").attr("charset","utf-8");

		BufferedOutputStream bos = null;
		String savedAbsolutePath = null;
		UUID uuid = UUID.randomUUID();
		String fn = uuid.toString() + ".html";
		File f = new File(path, fn);

		try {
			bos = new BufferedOutputStream(new FileOutputStream(f));
			bos.write(doc.html().getBytes(StandardCharsets.UTF_8));
			savedAbsolutePath = f.getAbsolutePath();
		}
		catch (Exception e) {
//System.out.println("----saveHtmlFile: " + e);
			e.printStackTrace();
		}
		finally {
			try {
				bos.close();
			}
			catch (Exception e) {
				//System.out.println("----saveHtmlFile2: " + e);
				e.printStackTrace();
			}
			finally {
				return savedAbsolutePath;
			}
		}
	}
	
	public static String saveHtmlFile(String strHtml, String vp, String fn) {
		Document doc = Jsoup.parse(strHtml, "UTF-8");
		doc.head().appendElement("meta").attr("charset","utf-8");
		
		BufferedOutputStream bos = null;
		String savedAbsolutePath = null;
		String path = FileUtil.getRealPath(vp);
		fn = fn + ".html";
		File f = new File(path, fn);

		try {
			bos = new BufferedOutputStream(new FileOutputStream(f));
			bos.write(doc.html().getBytes(StandardCharsets.UTF_8));
			savedAbsolutePath = f.getAbsolutePath();
		}
		catch (Exception e) {
//System.out.println("----saveHtmlFile: " + e);
			e.printStackTrace();
		}
		finally {
			try {
				bos.close();
			}
			catch (Exception e) {
				//System.out.println("----saveHtmlFile2: " + e);
				e.printStackTrace();
			}
			finally {
				return savedAbsolutePath;
			}
		}
	}
	
	public static Document readHtmlFile2Doc(String fn, String path) {
		Document doc = null;
		try {
			File f = new File(path, fn);
			if (f.exists()) doc = Jsoup.parse(f, "UTF-8");
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		finally {
			return doc;
		}
	}

	public static Element readHtmlFile2HtmlBodyElem(String fn, String path) {
		Document doc = readHtmlFile2Doc(fn, path);
		if (doc != null) return doc.body();
		else return null;
	}

	public static Elements readHtmlFile2HtmlElem(String fn, String path, String selector ) {
		Document doc = readHtmlFile2Doc(fn, path);
		if (doc != null) return doc.select(selector);
		else return null;
	}

	public static String readHtmlFile2Html(String fn, String path) {
		Document doc = readHtmlFile2Doc(fn, path);
		if (doc != null) return doc.html();
		else return null;
	}

	public static String readHtmlFile2HtmlBodyTag(String fn, String path) {
		Element body = readHtmlFile2HtmlBodyElem(fn, path);
		if (body != null) return body.html();
		else return null;
	}

	public static String readHtmlFile2HtmlElemTag(String fn, String path, String selector ) {
		StringBuilder sb = new StringBuilder();
		Elements els = readHtmlFile2HtmlElem(fn, path, selector);
		if (els != null) {
			for (Element el : els) {
				sb.append(el.html());
			}
		}
		return sb.toString();
	}

	public static String readHtmlFile2Text(String fn, String path) {
		return stripHtmlTags(readHtmlFile2Html(fn, path));
	}

	public static String readHtmlFile2HtmlBodyText(String fn, String path) {
		return stripHtmlTags(readHtmlFile2HtmlBodyTag(fn, path));
	}

	public static String readHtmlFile2HtmlElemText(String fn, String path, String selector ) {
		return stripHtmlTags(readHtmlFile2HtmlElemTag(fn, path, selector));
	}


	public static void main(String[] args) throws IOException {
		String strHtml = "<div><a href='#'>TTTTT</a><img src='data:image/jpeg;base64, ssssxxx'/> TEST<div class='test'><span>TEST SELECT ELEM #1</span></div><div class='test'><span>TEST SELECT ELEM #2</span></div></div>";
//		System.out.println("== stripHtmlTags ==\n" + stripHtmlTags(strHtml) + "\n");
//		System.out.println("== getHtmlTag ==\n" + getHtmlTag(strHtml) + "\n");
//		System.out.println("== getHtmlBodyTag ==\n " + getHtmlBodyTag(strHtml) + "\n");
//		System.out.println("== getHtmlElemTag ==\n" + getHtmlElemTag(strHtml, "div.test") + "\n");
//		System.out.println("== getHtmlText ==\n" + getHtmlText(strHtml) + "\n");
//		System.out.println("== getHtmlBodyText ==\n " + getHtmlBodyText(strHtml) + "\n");
//		System.out.println("== getHtmlElemText ==\n" + getHtmlElemText(strHtml, "div.test") + "\n");

//		JsonObject res = stripAndSaveHtml(strHtml, "files/test");
//System.out.println(res);
//System.out.println(readHtmlFile2HtmlBodyTag(res.get("fullname").getAsString(), res.get("rpath").getAsString()));
	}

}
