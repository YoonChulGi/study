package board2.test.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import board2.test.service.TestService;

@RestController
public class TestController {
	
	@Autowired
	TestService testService;
	
	@RequestMapping("/test/test.do")
	Map<String, Object> test() throws Exception{
		return testService.doSearch();
	}
}
