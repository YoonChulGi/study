package spb.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoggerInterceptor implements HandlerInterceptor{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
		String requestUri = request.getRequestURI();
		
		if(!requestUri.contains("/plugins/") && 
			!requestUri.contains("/images/") &&
			!requestUri.contains("/css/") &&
			!requestUri.contains("/js/")
			) {
			log.debug("====================================START====================================");
			log.debug(" Request URI \t: " + request.getRequestURI());			
		}
		return true;
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		String requestUri = request.getRequestURI();
		
		if(!requestUri.contains("/plugins/") && 
			!requestUri.contains("/images/") &&
			!requestUri.contains("/css/") &&
			!requestUri.contains("/js/")
			) {
			log.debug("=====================================END=====================================");			
		} 
	}
}