package board2.common;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice // @ControllerAdvice 어노테이션을 사용해서 해당 클래스가 예외처리 클래스임을 알려줍니다. 
public class ExceptionHandler {
	
	@org.springframework.web.bind.annotation.ExceptionHandler(Exception.class) // 해당 메서드에서 처리할 예뢰를 지정합니다. 여기서는 모든 예외를 처리하였으나, 에러 하나 하나를 먼저 처리하고 Exception.class 로 전역 에러 처리는 맨 밑에다가 만들어놓아야합니다.Exception.class가 맨 위에 있을 경우, 모든 에러가 그곳에서 잡혀서 다른 방법으로는 에러 처리를 할 수 없습니다.  
	public ModelAndView defaultExceptionHandler(HttpServletRequest request, Exception exception) {
		ModelAndView mv = new ModelAndView("/error/error_default"); // 예외 발생 시 보여줄 화면을 지정합니다. 
		mv.addObject("exception",exception);
		
		log.error("exception",exception); // 에러 로그를 출력합니다. 
		
		return mv;
	}
}
