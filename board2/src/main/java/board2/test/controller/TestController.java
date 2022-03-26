package board2.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import board2.test.entity.TestDataEntity;
import board2.test.service.TestService;

@RestController
public class TestController {
	
	@Autowired
	TestService testService;
	
	@RequestMapping("/test/insert.do")
	void insertTest() throws Exception {
		testService.insertData();
	}
	
	@RequestMapping("/test/find.do")
	List<TestDataEntity> findTest() throws Exception {
		return testService.findData();
	}
	
	@RequestMapping("/test/update.do")
	void updateTest() throws Exception {
		testService.updateData();
	}
	
	@RequestMapping("/test/delete.do")
	void deleteTest() throws Exception {
		testService.deleteData();
	}
}
