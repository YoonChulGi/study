package board.elastic.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import board.elastic.service.ElasticService;


@Controller
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
	public ModelAndView getels() throws Exception {
		log.debug("/elastic/get.do");
		ModelAndView mv = new ModelAndView("/elastic/result");
		elasticService.sendGET();
		return mv;
	}
}
