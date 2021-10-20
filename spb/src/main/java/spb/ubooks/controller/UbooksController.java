package spb.ubooks.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.dto.MemberDto;
import spb.ubooks.mapper.CombookMapper;
import spb.ubooks.service.MemberService;
import spb.ubooks.service.SearchService;

@Slf4j
@Controller
public class UbooksController {

	@Autowired
	SearchService searchService;

	@Autowired
	MemberService memberService;

	@Autowired
	CombookMapper combookMapper;

	@RequestMapping(value = { "/", "/index" })
	public ModelAndView ubooksHome() throws Exception {
		log.debug("ubooksHome");
		ModelAndView mv = new ModelAndView("/ubooks/index");
		return mv;
	}

	/********* S:Shop ***********************************************/
	@RequestMapping("/shop")
	public ModelAndView ubooksShop() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/shop");
		return mv;
	}

	@RequestMapping("/checkout")
	public ModelAndView ubooksCheckout() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/checkout");
		return mv;
	}

	@RequestMapping("/cart")
	public ModelAndView ubooksCart() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/cart");
		return mv;
	}

	@RequestMapping("/pricing")
	public ModelAndView ubooksPricing() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/pricing");
		return mv;
	}

	@RequestMapping("/confirmation")
	public ModelAndView ubooksConfirmation() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/confirmation");
		return mv;
	}

	@RequestMapping("/product-single")
	public ModelAndView ubooksProductSingle() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/product-single");
		return mv;
	}

	@RequestMapping("/shop-sidebar")
	public ModelAndView ubooksShopSidebar() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/shop-sidebar");
		return mv;
	}

	/********* E:Shop ***********************************************/

	/********* S:Pages ***********************************************/
	@RequestMapping("/contact")
	public ModelAndView ubooksContact() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/contact");
		return mv;
	}

	@RequestMapping("/about")
	public ModelAndView ubooksAbout() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/about");
		return mv;
	}

	@RequestMapping("/404")
	public ModelAndView ubooks404() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/404");
		return mv;
	}

	@RequestMapping("/coming-soon")
	public ModelAndView ubooksCommingsoon() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/coming-soon");
		return mv;
	}

	@RequestMapping("/faq")
	public ModelAndView ubooksFaq() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/faq");
		return mv;
	}

	@RequestMapping("/dashboard")
	public ModelAndView ubooksDashboard() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/dashboard");
		return mv;
	}

	@RequestMapping("/order")
	public ModelAndView ubooksOrder() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/order");
		return mv;
	}

	@RequestMapping("/address")
	public ModelAndView ubooksAddress() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/address");
		return mv;
	}

	@RequestMapping("/profile-details")
	public ModelAndView ubooksProfileDetails() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/profile-details");
		return mv;
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView ubooksLogin() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/login");
		return mv;
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String memberLogin(MemberDto member, HttpServletRequest request) throws Exception {
		return memberService.loginMember(member, request);
	}

	@RequestMapping(value = "/loginFail")
	public ModelAndView memberLoginFail() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/loginFail");
		return mv;
	}
	
	@RequestMapping("/memberLogout")
	public String memberLogout(HttpServletRequest request) throws Exception {
		memberService.logoutMember(request);
		return "redirect:/";
	}

	@RequestMapping(value = "/signin", method = RequestMethod.GET)
	public ModelAndView ubooksSignin() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/signin");
		return mv;
	}

	@RequestMapping(value = "/signin", method = RequestMethod.POST)
	public String insertMember(MemberDto member) throws Exception {
		memberService.insertMember(member);
		return "redirect:/login";
	}

	@RequestMapping("/forget-password")
	public ModelAndView ubooksForgetPassword() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/forget-password");
		return mv;
	}

	/********* E:Pages ***********************************************/

	/********* S:Blog ***********************************************/
	@RequestMapping("/blog-left-sidebar")
	public ModelAndView blogLeftSidebar() throws Exception {
		ModelAndView mv = new ModelAndView("ubooks/blog/blog-left-sidebar");
		return mv;
	}

	@RequestMapping("/blog-right-sidebar")
	public ModelAndView blogRightSidebar() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/blog/blog-right-sidebar");
		return mv;
	}

	@RequestMapping("/blog-full-width")
	public ModelAndView blogFullWidth() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/blog/blog-full-width");
		return mv;
	}

	@RequestMapping("/blog-grid")
	public ModelAndView blogGrid() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/blog/blog-grid");
		return mv;
	}

	@RequestMapping("/blog-single")
	public ModelAndView blogSingle() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/blog/blog-single");
		return mv;
	}

	/********* E:Blog ***********************************************/

	/********* S:Elements ***********************************************/
	@RequestMapping("/typography")
	public ModelAndView ubooksTypography() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/elements/typography");
		return mv;
	}

	@RequestMapping("/buttons")
	public ModelAndView ubooksButtons() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/elements/buttons");
		return mv;
	}

	@RequestMapping("/alerts")
	public ModelAndView ubooksAlerts() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/elements/alerts");
		return mv;
	}

	/********* E:Elements ***********************************************/

	/********* S:전집 ***********************************************/
	@RequestMapping("/complete-works")
	public ModelAndView ubooksCompleteWorks(@RequestParam(value = "sort", defaultValue = "") String sort,
			@RequestParam(value = "department", defaultValue = "") String department,
			@RequestParam(value = "publisher", defaultValue = "") String publisher,
			@RequestParam(value = "age", defaultValue = "") String age) throws Exception {

		log.debug("complete-works");
		ModelAndView mv = new ModelAndView("/ubooks/buy/complete-works");
		mv.addObject("res", searchService.sendHighLevelApi("combook_*", sort, department, publisher, age)); // elasticsearch
																											// - high
																											// level
																											// client -
																											// search

		mv.addObject("departmentsList", combookMapper.selectDepartments()); // departments - mariadb
		mv.addObject("publishersList", combookMapper.selectPublishers()); // publishers - mariadb
		mv.addObject("agesList", combookMapper.selectAges()); // ages - mariadb

		Map<String, Object> searchParam = new LinkedHashMap<String, Object>();
		searchParam.put("sort", sort);
		searchParam.put("department", department);
		searchParam.put("publisher", publisher);
		searchParam.put("age", age);
		mv.addObject("searchParam", searchParam);
		return mv;
	}

	@RequestMapping("/complete-works/{bookId}")
	public ModelAndView ubooksCompleteWorksDetail(@PathVariable("bookId") int bookId) throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/buy/complete-works-detail");
		mv.addObject("res", searchService.searchOneAsMap("combook_*", bookId));
		return mv;
	}

	/********* E:전집 ***********************************************/

	/********* S:중고단행본 ***********************************************/
	@RequestMapping("/usedBooks")
	public ModelAndView ubooks() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/usedBooks");
//		HashMap<String, Object> resultMap = new HashMap();
//		resultMap.put("key", "data");
//		ObjectMapper mapper = new ObjectMapper();
//		String json = mapper.writeValueAsString(resultMap);
//		String msgMap = sendREST("127.0.0.1", json);
//		System.out.println("msgMap: " + msgMap);
		return mv;
	}
	/********* E:중고단행본 ***********************************************/

}
