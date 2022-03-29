package spb.ubooks.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSessionEvent;

public interface VisitorService {
	void putVisitorLog(HttpSessionEvent event, HttpServletRequest request );
	void putVisitorLogWithRedis(HttpServletRequest request);
}
