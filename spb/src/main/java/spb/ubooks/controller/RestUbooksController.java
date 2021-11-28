package spb.ubooks.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.service.CartService;
import spb.ubooks.service.MemberService;
import spb.ubooks.service.SearchService;

@Slf4j
@RestController
public class RestUbooksController {
	
	@Autowired
	private SearchService searchService;
	
	@Autowired 
	private MemberService memberService;
	
	@Autowired
	private CartService cartService;
	
	@RequestMapping(value="/searchOne/{bookId}", method=RequestMethod.GET) 
	public String searchOne(@PathVariable("bookId") int bookId, HttpServletResponse response) throws Exception {
		log.debug("/searchOne/" + bookId);
		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
		return searchService.searchOneAsJson("combook*", bookId);
	}
	
	@RequestMapping(value="/checkId/{memberId}", method=RequestMethod.GET) 
	public int checkId(@PathVariable("memberId") String memberId) throws Exception {
		return memberService.checkId(memberId);
	}
	
	@RequestMapping(value="/getCartList", method=RequestMethod.GET)
	public List<Map<String, Object>> getCartList(HttpServletRequest request) throws Exception {
		return cartService.getCartList(request);
	}
	
	@RequestMapping(value="/autoComplete", method=RequestMethod.GET) 
	public List<Map<String,Object>> autoComplete(@RequestParam("query")String query, HttpServletResponse response) throws Exception {
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", "POST, GET");
		response.addHeader("Access-Control-Allow-Headers", "origin, x-requested-with");
		return searchService.getAutoCompleteList(query);
	}
}
