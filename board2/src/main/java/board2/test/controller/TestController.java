package board2.test.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import board2.test.service.TestService;

@Controller
public class TestController {
	
	@Autowired
	TestService testService;
	
	@RequestMapping("/test/test.do")
	ModelAndView test(HttpServletRequest request, HttpServletResponse response) throws Exception{
		ModelAndView mv = new ModelAndView("/test/test");
		
		// 쿠키 초기값 = 장바구니 정보
		Cookie cookie = new Cookie("cartInfo","장바구니정보");
		cookie.setMaxAge(60*60*24*365); // 1년
		cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
		response.addCookie(cookie);
		
		
		Cookie[] myCookies = request.getCookies();
		for(Cookie c : myCookies) {
			if("cartInfo".equals(c.getName())) {
				c.setValue(null);
				c.setMaxAge(0);
				c.setPath("/");
				response.addCookie(c);
			}
		}
		
		Cookie[] myCookies2 = request.getCookies();
		for(Cookie c : myCookies2) {
			if("cartInfo".equals(c.getName())) {
				mv.addObject(c.getName(), c.getValue());
			}
		}
		return mv;
	}
}
