package spb.ubooks.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface ErrorLogService {
	void putErrorLog(HttpServletRequest request, HttpServletResponse response, Exception exception, int httpStatus, boolean isBasicError, String url) throws Exception;
}
