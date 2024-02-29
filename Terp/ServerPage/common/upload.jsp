<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="kr.terp.common.util.Common" %>
<%@ page import="kr.terp.common.util.FileUtil" %>
<%@ page import="org.apache.commons.fileupload.FileItem" %>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory" %>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"  %>
<%@ page import="org.json.simple.JSONArray"  %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.UUID" %>
<%

	response.setContentType("text/html; charset=utf-8");
	PrintWriter outResult = response.getWriter();
	JSONObject jsonResponse = new JSONObject();
	JSONArray jsonFiles = new JSONArray();
	JSONArray jsonErrors = new JSONArray();

	int maxMemSize = 512 * 1024;
	int maxFileSize = 1024 * 1024 * 1024;

	String noAf = "";
	String fileName = "";
	String virtualPath = "";
	String realPath = "";
	String realPathParam = "";

	boolean isMultipart = ServletFileUpload.isMultipartContent(request);
	if (isMultipart) {
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload uploader = new ServletFileUpload(factory);
		uploader.setHeaderEncoding("UTF-8");
		List<FileItem> fileItems = uploader.parseRequest(request);

		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;

		try {
			Iterator<FileItem> iterFileItems = fileItems.iterator();
			long TotLen = 0;
			boolean bPass = false;
			while (iterFileItems.hasNext()) {
				FileItem fileItem = iterFileItems.next();
				String srcFilePath = fileItem.getName();
				System.out.println("1srcFilePath"+srcFilePath);
				if (!Common.isEmpty(srcFilePath)) TotLen = TotLen + fileItem.getSize();
				if (fileItem.isFormField() && !bPass) {
					if (fileItem.getFieldName().equalsIgnoreCase("noaf")) {
						noAf = fileItem.getString("UTF-8");
					}
					if (fileItem.getFieldName().equalsIgnoreCase("fn")) {
						fileName = fileItem.getString("UTF-8");
					}
					if (fileItem.getFieldName().equalsIgnoreCase("pfx")) {
						virtualPath = FileUtil.getVirtualPath(fileItem.getString("UTF-8"), "yyMMdd", null);
						realPath = FileUtil.getRealPath(virtualPath);
						bPass = true;
					}
				}
			}

			System.out.println("TotLen => " + TotLen);
			System.out.println("virtualPath => " + virtualPath);
			System.out.println("realPath => " + realPath);

			int cnt1 = 0;
			iterFileItems = fileItems.iterator();
			while (iterFileItems.hasNext()) {
				System.out.println("cnt1="+(++cnt1));
				FileItem fileItem = iterFileItems.next();
				String srcFilePath = fileItem.getName();
				System.out.println("2srcFilePath="+srcFilePath);
				if (!Common.isEmpty(srcFilePath)) {
					JSONObject fileInfo = FileUtil.getFileInfoJson(srcFilePath);
					System.out.println("fileInfo="+fileInfo);

					//UUID uuid = UUID.randomUUID();
					//String fn = String.format("%s.%s", uuid.toString(), fileInfo.get("fileext").toString();
					String fn = String.format("%s.%s", fileName, fileInfo.get("fileext").toString());
//					String fn = String.format("%s.%s", fileName, fileInfo.get("fileext").toString());
					File f = new File(realPath, fn);

					fileInfo.put("vpath", virtualPath);
					fileInfo.put("rpath", realPath);
					fileInfo.put("fn", fn);
					fileInfo.put("fullpath", realPath + File.separator + fn);
					fileInfo.put("filesize", fileItem.getSize());
					fileInfo.put("noaf", noAf);
					fileInfo.put("trans", 0);
					fileInfo.put("finished", 0);
					fileInfo.put("completed", 0);

					System.out.println(fileInfo);

					bis = new BufferedInputStream(fileItem.getInputStream());
					bos = new BufferedOutputStream(new FileOutputStream(f));

					byte[] buf = new byte[4096];
					int tot = 0;
					int cnt = 0;
					while ((cnt = bis.read(buf)) != -1) {
						tot = tot + cnt;
						bos.write(buf, 0, cnt);
					}

					bis.close();
					bos.close();

					jsonFiles.add(fileInfo);
				}
			}
			jsonResponse.put("success", true);
			jsonResponse.put("data", jsonFiles);
		}
		catch (Exception e) {
			jsonResponse.put("success", false);
			jsonResponse.put("msg", "파일 업로드 실패!");
			e.printStackTrace();
		}
		finally {
			if (bis != null) bis.close();
			if (bos != null) bos.close();
		}
	}
	else {
		jsonResponse.put("success", false);
		jsonResponse.put("msg", "인코딩 형식(multipart/form-data) 오류!");
	}

	System.out.println(jsonResponse.toJSONString());
	outResult.print(jsonResponse.toJSONString());

%>
