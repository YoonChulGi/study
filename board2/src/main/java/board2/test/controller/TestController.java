package board2.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestController {
	
	@RequestMapping("/test/test.do")
	ModelAndView test(@RequestParam(value="param1",defaultValue = "default파라미터")String param1) throws Exception{
		ModelAndView mv = new ModelAndView("/test/test");
		mv.addObject("param1", param1);
		return mv;
	}
}
