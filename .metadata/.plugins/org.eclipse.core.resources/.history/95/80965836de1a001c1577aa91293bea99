package board.elastic.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import board.elastic.document.선별진료소Dto;
import board.elastic.service.ElasticService;

@RestController
public class ElasticController {
	
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	ElasticService elasticService;
	
	@RequestMapping("/elastic/write.do")
	public ModelAndView openBoardList() throws Exception {
		log.debug("/elastic/write.do");
		ModelAndView mv = new ModelAndView("/elastic/write");
		return mv;
	}
	
	@RequestMapping("/elastic/get.do")
	public String getels() throws Exception {
		log.debug("/elastic/get.do");
//		ModelAndView mv = new ModelAndView("/elastic/result");
		Map<String, Object> res = elasticService.sendGET();
//		mv.addObject("res", resultMap);
		return res.get("resultBody").toString();
	}
	
	@RequestMapping("/elastic/high-get.do")
	public List<선별진료소Dto> highLevelGet() throws Exception {
		log.debug("/elastic/high-get.do");
		List<선별진료소Dto> resultList = elasticService.highLevelSendGet();
		return resultList;
	}
}
