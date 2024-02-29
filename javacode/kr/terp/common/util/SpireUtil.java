package kr.terp.common.util;

import com.spire.license.LicenseProvider;
import com.spire.xls.FileFormat;
import com.spire.xls.Workbook;
import com.spire.xls.Worksheet;


public class SpireUtil {

	private String LicenseKey = "MDDNodxwd7YXGwEAI1PQYv/enDIXSj8ky5qjNn07rH2HwZzSrPv+Kj2z3aMSJs/pGa9unKpSFg03inYQikviPIgvikE/S6nAE5pRlgTtQ6pvwffuqbDS7SyyEQ4mfVZZnqKI1ufr13aJ1J0j2dIoHZXKFL4jFvKO3eFIEPPoGwCj+gDQ67F4qGxkTI3DH8KYIts9yDMM2489J+X/Gun+lO36+zMLtSakhbmdtQ5ZOFV0XKd+B9IUt9vKXzfsymjGczIEhtqc7NH3DQo2HjoQ778N9HSk5fSKCiT3pf6nBfPP/Qvz+EhPjBJWmf3bS0YlJGpVSXggIO8MU5FJX0zxPU4Er/MgfIlGu0tVeEKAmghFABZrZxZYWKjXlAhARL1rwmuAAAUHJ29g87xIEDaVg7Vuv5KmvzAyDiloy3aecd6u6QoMvsN7sCvOIO1vWswHM7rtaF/lnqo/NWD+2RmV/tHNfKNcu4RI+8cykWTCLNqhb+07zzWqPdYqzDPM+gMw3GhNVNCf67+mPbrSO79BShNtahdC+ZF6hxXAgLqrkw2P3C3WycXODt6jQkScl6d2dXKBvYBkCrigCS4efzTJQ1TDOeuQSofCZC+Er1XfVI+HjA8eOnZWKFjhiTwq3Ydxit+yYY870wzDjM3ma8szrHEhD6WtgZW+rJ9OBaxglw/nGQ0/dAv7V9WPMr8b+qCT2yPbWjc0kUCDDuSa8l8UkjZjbVwEMlyXPldR8z61Scv9Sk3vgC8C7yWHi9CaYqmEytw5s0y8QJoNOmhXbiF1tKnYu/lbV3W/VuOuxBGZfbbpCud3oIAuRtsXJVNB6caSCYTEajRz6D1b/C1VF+sEUGMwM2qf7iM6yeIX+G4Vp91SeYtvpSHi93SlfWAZ69Nblbq2IKfRYmroQY9WS+az1GMbcRfBMQWMlESBro4k99iiOgXRqds8Q1u3zbcgX8LFh6VcYyGDEOww11pY2HpVf8/oCZXBBIutTEn4leYfXsPpb4ZiLNqXdZYexPJBtVHrw+eqd+xf01t9RErle30HNL83mdNV8leXQW4RgDn7F6KQjNksyK6tQ3frMG/p8dqQzap/J2E/iji/wlWS2ygXujXyQQPeAYURUsmJMx8RTLETg3q6s66r1fuRRuxqHsvEinkh8CFTR3xzlWJonpnm72qQ+g7f3BaJ4GiJ5WXUQ6uibT22ZKy2jg04n901ZYieOqeoQnzZ6+oWuPJEW4f+LvgdxitJZL3j013PLKTums65J7f/1+k4NcDCHub3hMJH5xuIF/yCwBTCk/SomDjxwiWUcEQFpSe2YNXlQzPEx9Wew20bb9h5Z/F4yHgBFmoZzRL807vnB65720EOzC7IV/U43T2eLDfGp1wmuGObJTyd6bexXJ5fNO9YhdA/t6B3ec/yVdfkLqpeotRKt8pc9kPZC19LSEautxarcQFG33u3ujEX5msHpAFMojusp+qxLpGbK1wengw=";

	public SpireUtil() {
		LicenseProvider.setLicenseKey(LicenseKey);
	}

	public SpireUtil(String licenseKey)	{
		LicenseProvider.setLicenseKey(licenseKey);
	}

	public void exportToPdf(String path, String xlsFileName, String pdfFileName) {
		String xlsPath = String.format("%s\\%s", path, xlsFileName);
		String pdfPath = String.format("%s\\%s", path, pdfFileName);
		Workbook workbook = new Workbook();
		workbook.loadFromFile(xlsPath);
		workbook.saveToFile(pdfPath, FileFormat.PDF);
		workbook.dispose();
	}

	public void exportToPdf(String path, String xlsFileName, String pdfFileName, int sheetIdx) {
		String xlsPath = String.format("%s\\%s", path, xlsFileName);
		String pdfPath = String.format("%s\\%s", path, pdfFileName);
		Workbook workbook = new Workbook();
		workbook.loadFromFile(xlsPath);
		if ((sheetIdx > -1) && (sheetIdx < workbook.getWorksheets().size())) {
			Worksheet workSheet = workbook.getWorksheets().get(sheetIdx);
			workSheet.saveToPdf(pdfPath);
		}
		else {
			workbook.saveToFile(pdfPath, FileFormat.PDF);
		}
		workbook.dispose();
	}

}
