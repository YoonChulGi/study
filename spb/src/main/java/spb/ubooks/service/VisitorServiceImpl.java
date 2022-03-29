package spb.ubooks.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.mongoEntity.VisitorEntity;
import spb.ubooks.mongoRepository.VisitorRepository;

@Slf4j
@Service
public class VisitorServiceImpl implements VisitorService {
	
	@Autowired
	VisitorRepository visitorRepository;

	@Override
	public void putVisitorLog(HttpSessionEvent event, HttpServletRequest request) {

		log.debug("몽고 insert - start");
		try {
			VisitorEntity visitorEntity = new VisitorEntity();
			visitorEntity.setIp(request.getRemoteAddr());
			visitorEntity.setSession_id(event.getSession().getId());
			visitorEntity.setAgent(request.getHeader("User-Agent")); // browser Info
			visitorEntity.setRefer(request.getHeader("referer")); // prev site info 
			
			VisitorEntity result = visitorRepository.save(visitorEntity);    		
			log.debug("몽고 insert - end");
			log.debug(result.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void putVisitorLogWithRedis(HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		VisitorEntity visitorEntity = new VisitorEntity();
		visitorEntity.set_id(session.getId());
		visitorEntity.setIp(request.getRemoteAddr());
		visitorEntity.setSession_id(session.getId());
		visitorEntity.setAgent(request.getHeader("User-Agent")); // browser Info
		visitorEntity.setRefer(request.getHeader("referer")); // prev site info
		
		visitorRepository.save(visitorEntity);
	}

}
