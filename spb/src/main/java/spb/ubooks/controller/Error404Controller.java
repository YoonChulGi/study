package spb.ubooks.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import spb.ubooks.service.ErrorLogService;

@Slf4j
@Controller
public class Error404Controller implements ErrorController{
	
	@Autowired
	ErrorLogService errorLogService;
	
	@RequestMapping("/error")
	public ModelAndView error(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.debug("/error");
		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
		Object errorMessage = request.getAttribute(RequestDispatcher.ERROR_MESSAGE);
		String url = request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI).toString();
		
		ModelAndView mv = new ModelAndView("/ubooks/common/error");  
		mv.addObject("httpStatus",status);
		if ("404".equals(status.toString())) {
			NotFoundException e = new NotFoundException(errorMessage.toString());
			mv.addObject("exception",e);
			log.error("exception", e); // 에러 로그를 출력합니다. 
			
			errorLogService.putErrorLog(request, response, e, Integer.parseInt(status.toString()), true, url);
			log.debug("/error - end");
		}
		return mv;
		
	}
}
