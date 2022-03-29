package spb.ubooks.service;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.mongoEntity.ErrorLog;
import spb.ubooks.mongoRepository.ErrorLogRepository;

@Slf4j
@Service
public class ErrorLogServiceImpl implements ErrorLogService{
	
	@Autowired
	ErrorLogRepository errorLogRepository;

	@Override
	public void putErrorLog(HttpServletRequest request, HttpServletResponse response, Exception exception, int httpStatus, boolean isBasicError, String url) throws Exception {
		if(isBasicError) {
			try {
				Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
				ErrorLog errorLogEntity = new ErrorLog();
				errorLogEntity.setStatus( Integer.parseInt(status.toString()) );
				errorLogEntity.setUrl(url);
				errorLogEntity.setMessage("page not found error");
				errorLogEntity.setException(exception.toString());
				HttpSession session = request.getSession();
				if(session.getAttribute("memberId")!=null) { // 로그인시
					errorLogEntity.setUser_id(session.getAttribute("memberId").toString());
				}
				errorLogEntity.setUser_ip(request.getRemoteAddr());
				errorLogRepository.save(errorLogEntity);
			} catch (Exception e) {
				log.debug("에러 로깅 Exception - basicError");
				e.printStackTrace();
			}
		} else {
			try {
				ErrorLog errorLogEntity = new ErrorLog();
				errorLogEntity.setStatus(httpStatus);
				errorLogEntity.setUrl(url);
				errorLogEntity.setMessage(exception.getMessage());
				errorLogEntity.setException(exception.toString());
				HttpSession session = request.getSession();
				if(session.getAttribute("memberId")!=null) { // 로그인시
					errorLogEntity.setUser_id(session.getAttribute("memberId").toString());
				}
				errorLogEntity.setUser_ip(request.getRemoteAddr());
				errorLogRepository.save(errorLogEntity);
			} catch (Exception e) {
				log.debug("에러 로깅 Exception");
				e.printStackTrace();
			}
			
		}
		
	}
}
