package board2.test.controller;

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
	ModelAndView test() throws Exception{
		ModelAndView mv = new ModelAndView("/test/test");
		testService.addIndex();
		return mv;
	}
}
