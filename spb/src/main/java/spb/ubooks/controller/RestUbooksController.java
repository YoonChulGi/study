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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import spb.ubooks.service.CartService;
import spb.ubooks.service.MemberService;
import spb.ubooks.service.SearchService;

@Slf4j
@Api(tags="spb - REST API") // @Api 어노테이션으로 컨트롤러에 설명을 추가합니다. 
@RestController
public class RestUbooksController {
	
	@Autowired
	private SearchService searchService;
	
	@Autowired 
	private MemberService memberService;
	
	@Autowired
	private CartService cartService;
	
	@ApiOperation(value = "elasticsearch - 게시글 1건 조회") // ApiOperation 어노테이션으로 API에 설명을 추가합니다. 
	@RequestMapping(value="/searchOne/{bookId}", method=RequestMethod.GET) 
	public String searchOne(@PathVariable("bookId") @ApiParam(value="책(상품) 번호") /*ApiParam어노테이션으로 API의 파라미터에 설명을 추가합니다.*/ int bookId, HttpServletResponse response) throws Exception {
		log.debug("/searchOne/" + bookId);
		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
		return searchService.searchOneAsJson("combook*", bookId);
	}
	
	@ApiOperation(value = "입력된 memberId와 일치하는 Id가 있는지 DB조회")
	@RequestMapping(value="/checkId/{memberId}", method=RequestMethod.GET) 
	public int checkId(@PathVariable("memberId") @ApiParam(value="DB조회할 아이디") String memberId) throws Exception {
		return memberService.checkId(memberId);
	}
	
	@ApiOperation(value = "장바구니 목록 조회")
	@RequestMapping(value="/getCartList", method=RequestMethod.GET)
	public List<Map<String, Object>> getCartList(HttpServletRequest request) throws Exception {
		return cartService.getCartList(request);
	}
	
	@ApiOperation(value = "elasticsearch - 자동완성 목록 조회")
	@RequestMapping(value="/autoComplete", method=RequestMethod.GET) 
	public List<Map<String,Object>> autoComplete(@RequestParam("query") @ApiParam(value = "자동완성 목록 조회에 사용될 검색어")String query, HttpServletResponse response) throws Exception {
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", "POST, GET");
		response.addHeader("Access-Control-Allow-Headers", "origin, x-requested-with");
		return searchService.getAutoCompleteList(query);
	}
	
	@ApiOperation(value = "elasticsearch - 인기검색어 목록 조회")
	@RequestMapping(value="/popword", method=RequestMethod.GET)
	public List<Map<String,Object>> getPopword(@RequestParam("range") @ApiParam(value = "인기검색어 목록 조회에 사용될 범위값(d:일간, w:주간, m:월간)")String range, HttpServletResponse response) throws Exception {
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", "POST, GET");
		response.addHeader("Access-Control-Allow-Headers", "origin, x-requested-with");
		
		return searchService.getPopwordList(range);
	}	
}
