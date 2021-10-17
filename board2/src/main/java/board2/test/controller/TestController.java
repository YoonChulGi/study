package board2.test.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import board2.test.service.TestService;

@RestController
public class TestController {
	
	@Autowired
	TestService testService;
	
	@RequestMapping("/test/test.do")
	List<Map<String,Object>> test(
			@RequestParam(value="sort",defaultValue = "") String sort,
			@RequestParam(value="department",defaultValue="") String department,
			@RequestParam(value="publisher",defaultValue="") String publisher,
			@RequestParam(value="age",defaultValue="") String age
		) throws Exception{
		
		return testService.sendHighLevelApi("combook_*", sort, department, publisher, age);
	}
}
