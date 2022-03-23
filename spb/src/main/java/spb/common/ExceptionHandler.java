package spb.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.elasticsearch.ElasticsearchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.service.ErrorLogService;

@Slf4j
@ControllerAdvice // @ControllerAdvice 어노테이션을 사용해서 해당 클래스가 예외처리 클래스임을 알려줍니다. 
public class ExceptionHandler {
	
	@Autowired
	ErrorLogService errorLogService;
	
//	@ResponseStatus(HttpStatus.NOT_FOUND)
//	@org.springframework.web.bind.annotation.ExceptionHandler(NoHandlerFoundException.class)
//	public ModelAndView notfoundExceptionHandler(HttpServletRequest request, HttpServletResponse response, Exception exception) throws Exception {
//		log.debug("notFound");
//		ModelAndView mv = new ModelAndView("/ubooks/common/error");
//		mv.addObject("httpStatus",response.getStatus());
//		mv.addObject("exception",exception);
//		errorLogService.putErrorLog(request, response, exception, 404);
//		return mv;
//	}
	
	
	
	@org.springframework.web.bind.annotation.ExceptionHandler(ElasticsearchException.class)   
	public ModelAndView ElasticSearchExceptionHandler(HttpServletRequest request,HttpServletResponse response, Exception exception) throws Exception {
		log.debug("ElasticSearchExceptionHandler");
		ModelAndView mv = new ModelAndView("/ubooks/common/error");  
		mv.addObject("httpStatus",501);
		mv.addObject("exception",exception);
		log.error("exception",exception); // 에러 로그를 출력합니다. 
		
		errorLogService.putErrorLog(request, response, exception, 501, false);
		
		log.debug("ElasticSearchExceptionHandler - end");
		return mv;
	}
	
	@org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)   
	public ModelAndView defaultExceptionHandler(HttpServletRequest request,HttpServletResponse response, Exception exception) throws Exception {
		log.debug("defaultExceptionHandler");
		ModelAndView mv = new ModelAndView("/ubooks/common/error");  
		mv.addObject("httpStatus",500);
		mv.addObject("exception",exception);
		log.error("exception",exception); // 에러 로그를 출력합니다. 
		
		errorLogService.putErrorLog(request, response, exception, 500, false);
		log.debug("defaultExceptionHandler - end");
		return mv;
	}
	
}