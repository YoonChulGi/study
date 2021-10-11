package spb.ubooks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.service.SearchService;

@Slf4j
@RestController
public class RestUbooksController {
	
	@Autowired
	private SearchService searchService;
	
	@RequestMapping(value="/searchPrev/{bookId}", method=RequestMethod.GET) 
	public String modalAjax(@PathVariable("bookId") int bookId) throws Exception {
		return searchService.searchPrev("combook_*", bookId);
	}
}
