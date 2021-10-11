package spb.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice // @ControllerAdvice 어노테이션을 사용해서 해당 클래스가 예외처리 클래스임을 알려줍니다. 
public class ExceptionHandler {
	
	@org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)   
	public ModelAndView defaultExceptionHandler(HttpServletRequest request,HttpServletResponse response, Exception exception) {
		ModelAndView mv = new ModelAndView("/ubooks/common/error");  
		mv.addObject("httpStatus",response.getStatus());
		mv.addObject("exception",exception);
		
		log.error("exception",exception); // 에러 로그를 출력합니다. 
		
		return mv;
	}
}