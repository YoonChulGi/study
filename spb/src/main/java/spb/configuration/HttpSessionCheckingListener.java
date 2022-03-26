package spb.configuration;

//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;

import java.util.Date;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.service.VisitorServiceImpl;

@Slf4j
@WebListener
public class HttpSessionCheckingListener implements HttpSessionListener {
	
	
	static private int activeSessions = 0;
    
    public static int getActiveSessions() {
        return activeSessions;
    }
    @Override
    public void sessionCreated(HttpSessionEvent event) {
    	
    	HttpServletRequest req = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
    	
    	activeSessions++;
    	System.out.println("SessionCnt:" + activeSessions + " Session ID ".concat(event.getSession().getId()).concat(" created at ").concat(new Date().toString()));
    	log.debug("SessionCnt:" + activeSessions + " Session ID ".concat(event.getSession().getId()).concat(" created at ").concat(new Date().toString()));
    	
    	HttpSession session = event.getSession();
    	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(session.getServletContext());
    	
    	VisitorServiceImpl visitorServiceImpl = (VisitorServiceImpl)wac.getBean("visitorServiceImpl");
    	visitorServiceImpl.putVisitorLog(event, req);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
    	activeSessions--;
    	log.debug("SessionCnt:" + activeSessions + " Session ID ".concat(event.getSession().getId()).concat(" destroyed at ").concat(new Date().toString()));
    }

}




