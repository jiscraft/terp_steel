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
	String requestUrl = request.getRequestURL().toString();
	String requestUri = request.getRequestURI();
	String svcDomain = requestUrl.replaceAll(requestUri, "");
	String retScript = "";

	int maxMemSize = 512 * 1024;
	int maxFileSize = 1024 * 1024 * 1024;

	String virtualPath = FileUtil.getVirtualPath("TinyMCE_UploadedFiles", "yyMMdd", null);
	String realPath = FileUtil.getRealPath(virtualPath);

	boolean isMultipart = ServletFileUpload.isMultipartContent(request);
	if (isMultipart) {
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload uploader = new ServletFileUpload(factory);
		uploader.setHeaderEncoding("UTF-8");
		List<FileItem> fileItems = uploader.parseRequest(request);

		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;

		try {
			if (fileItems.size() > 0) {
				FileItem fileItem = fileItems.get(0);
				String srcFilePath = fileItem.getName();
				System.out.println("srcFilePath"+srcFilePath);

				System.out.println("virtualPath => " + virtualPath);
				System.out.println("realPath => " + realPath);

				if (!Common.isEmpty(srcFilePath)) {
					UUID uuid = UUID.randomUUID();
					String fn = uuid.toString() + "." + srcFilePath.substring(srcFilePath.lastIndexOf(".") + 1);
					File f = new File(realPath, fn);

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

					String cbFuncNm = "parent.tsoft_tinymce_image_upload_callback";
					String cbFldNm = "self.name.split('_form_action_target').join('')";
					String uploadedURL = svcDomain + "/ServerPage/common/download.jsp?path=" + virtualPath + "&fn=" + fn;
					retScript = String.format("<script>%s(%s,'%s');</script>", cbFuncNm, cbFldNm, uploadedURL);
				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if (bis != null) bis.close();
			if (bos != null) bos.close();
		}
	}
	else {
	}

	System.out.println(retScript);
	outResult.print(retScript);

%>
