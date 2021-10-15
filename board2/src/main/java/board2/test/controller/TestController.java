package board2.test.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestController {
	
	@RequestMapping("/test/test.do")
	ModelAndView test() throws Exception{
		ModelAndView mv = new ModelAndView("/test/test");
		List<String> list = new ArrayList<String>();
		list.add("사과");
		list.add("배");
		list.add("포도");
		list.add("귤");
		list.add("낑깡");
		mv.addObject("list", list);
		return mv;
	}
}
