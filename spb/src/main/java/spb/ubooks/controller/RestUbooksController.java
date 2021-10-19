package spb.ubooks.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.service.MemberService;
import spb.ubooks.service.SearchService;

@Slf4j
@RestController
public class RestUbooksController {
	
	@Autowired
	private SearchService searchService;
	
	@Autowired 
	private MemberService memberService;
	
	@RequestMapping(value="/searchOne/{bookId}", method=RequestMethod.GET) 
	public String searchOne(@PathVariable("bookId") int bookId, HttpServletResponse response) throws Exception {
		log.debug("/searchOne/" + bookId);
		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
		return searchService.searchOneAsJson("combook_*", bookId);
	}
	
	@RequestMapping(value="/checkId/{memberId}", method=RequestMethod.GET) 
	public int checkId(@PathVariable("memberId") String memberId) throws Exception {
		return memberService.checkId(memberId);
	}
}
