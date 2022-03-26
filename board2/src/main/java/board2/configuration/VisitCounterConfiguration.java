package board2.configuration;

import java.util.Date;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@WebListener
public class VisitCounterConfiguration implements HttpSessionListener {
	static private int activeSessions = 0;
    
    public static int getActiveSessions() {
        return activeSessions;
    }
	public void sessionCreated(HttpSessionEvent event) {
		activeSessions++;
    	System.out.println("SessionCnt:" + activeSessions + " Session ID ".concat(event.getSession().getId()).concat(" created at ").concat(new Date().toString()));
    	log.debug("SessionCnt:" + activeSessions + " Session ID ".concat(event.getSession().getId()).concat(" created at ").concat(new Date().toString()));
	}
	public void sessionDestroyed(HttpSessionEvent event) {
    	activeSessions--;
    	log.debug("SessionCnt:" + activeSessions + " Session ID ".concat(event.getSession().getId()).concat(" destroyed at ").concat(new Date().toString()));
    	
    }
}
