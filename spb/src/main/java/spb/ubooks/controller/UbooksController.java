package spb.ubooks.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.dto.ComBookIndexDto;
import spb.ubooks.dto.MemberDto;
import spb.ubooks.entity.CheckoutEntity;
import spb.ubooks.entity.CombookEntity;
import spb.ubooks.mapper.CombookMapper;
import spb.ubooks.service.BannerService;
import spb.ubooks.service.CartService;
import spb.ubooks.service.MemberService;
import spb.ubooks.service.SearchService;
import spb.ubooks.service.SellService;
import spb.ubooks.service.VisitorService;

@Controller
public class UbooksController {

	@Autowired
	SearchService searchService;

	@Autowired
	MemberService memberService;
	
	@Autowired
	CartService cartService;
	
	@Autowired
	SellService sellService;

	@Autowired
	CombookMapper combookMapper;
	
	@Autowired
	BannerService bannerService;
	
	@Autowired
	VisitorService visitorService;
	
	
	@RequestMapping(value = { "/", "/index" })
	public ModelAndView ubooksHome(HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/index");
		
		List<Map<String, Object>> bannerInfo = bannerService.selectBannerList();
		mv.addObject("bannerInfo", bannerInfo);
		visitorService.putVisitorLogWithRedis(request);
		
		return mv;
	}

	/********* S:Shop ***********************************************/
	@RequestMapping("/shop")
	public ModelAndView ubooksShop() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/shop");
		return mv;
	}

	@RequestMapping(value="/checkout", method=RequestMethod.POST)
	public ModelAndView ubooksCheckout(@RequestParam("checkoutValues")String checkoutValues) throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/checkout");
		List<Map<String,Object>> checkoutProducts = sellService.checkoutProduct(checkoutValues);
		mv.addObject("checkoutProducts", checkoutProducts );
		mv.addObject("totals", sellService.calcProductsPrice(checkoutProducts));
		return mv;
	}
	
	@RequestMapping(value="/orderProducts", method=RequestMethod.POST)
	public ModelAndView ubooksOrderProducts(CheckoutEntity orderInfo,HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/confirmation");
		sellService.indexOrderedProducts(sellService.orderProducts(orderInfo, request, response));
		return mv;
	}

	@RequestMapping("/cart")
	public ModelAndView ubooksCart(HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/cart");
		mv.addObject("resultList", cartService.getCartList(request));
		return mv;
	}
	
	@RequestMapping("/addCart/{bookId}/{qty}")
	public String ubooksAddCart(HttpServletRequest request,HttpServletResponse response, @PathVariable("bookId")int bookId, @PathVariable("qty")int qty) throws Exception {
		cartService.addCart(searchService.searchOneAsMap("combook*",bookId), qty, request, response);
		return "redirect:/cart";
	}
	
	@RequestMapping("/deleteCart")
	public String ubooksDeleteCart(HttpServletRequest request, HttpServletResponse response, @RequestParam("book_id")String book_id) throws Exception {
		cartService.deleteCart(book_id, request, response);
		return "redirect:/cart";
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
			@RequestParam(value = "age", defaultValue = "") String age,
			@RequestParam(value = "query", defaultValue = "")String query,
			@RequestParam(value = "searchField", defaultValue="")String searchField, HttpServletRequest request) throws Exception {
		Map<String, Object> searchParam = new LinkedHashMap<String, Object>();
		searchParam.put("query", query);

		ModelAndView mv = new ModelAndView("/ubooks/buy/complete-works");
		mv.addObject("res", searchService.sendHighLevelApi("combook*", query,searchField, sort, department, publisher, age, request)); // elasticsearch
		mv.addObject("departmentsList", combookMapper.selectDepartments()); // departments - mariadb
		mv.addObject("publishersList", combookMapper.selectPublishers()); // publishers - mariadb
		mv.addObject("agesList", combookMapper.selectAges()); // ages - mariadb

		searchParam.put("sort", sort);
		searchParam.put("department", department);
		searchParam.put("publisher", publisher);
		searchParam.put("age", age);
		searchParam.put("searchField", searchField);
		mv.addObject("searchParam", searchParam);
		mv.addObject("popd",searchService.getPopwordList("d"));
		mv.addObject("popw",searchService.getPopwordList("w"));
		mv.addObject("popm",searchService.getPopwordList("m"));
		
		
		return mv;
	}

	@RequestMapping(value="/complete-works/{bookId}", method=RequestMethod.GET) // 상세보기
	public ModelAndView ubooksCompleteWorksDetail(@PathVariable("bookId") int bookId) throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/buy/complete-works-detail");
		mv.addObject("res", searchService.searchOneAsMap("combook*", bookId));
		return mv;
	}
	
	@RequestMapping(value="/update-usedbook/{bookId}", method=RequestMethod.GET)
	public ModelAndView ubooksUpdateCompleteWorks(@PathVariable("bookId") int bookId,HttpServletRequest request) throws Exception {
		Map<String,Object> res = searchService.searchOneAsMap("combook*", bookId);
		if(request.getSession().getAttribute("memberId")==null) {
			return new ModelAndView("/ubooks/common/gotoLogin");
		} else if(!request.getSession().getAttribute("memberId").equals(res.get("seller_id").toString())) {
			return new ModelAndView("/ubooks/common/invalidApproach");
		} else {
			ModelAndView mv = new ModelAndView("/ubooks/sell/sell-usedbook");
			res = sellService.dataSettingForUpdateProduct(res);
			mv.addObject("res", res);
			
			return mv;
		}
	}
	
	@RequestMapping(value="/update-usedbook/{bookId}", method=RequestMethod.PUT)
	public String ubooksUpdateUsedbook(@PathVariable("bookId") int bookId,CombookEntity combook, MultipartHttpServletRequest multipartHttpServletRequest) throws Exception {
		ComBookIndexDto combookIndexDto = sellService.registProduct(combook, multipartHttpServletRequest,bookId);
		sellService.updateIndexProduct(combookIndexDto);
		return "redirect:/complete-works/"+bookId;
	}
	
	@RequestMapping(value="/delete-usedbook/{bookId}", method=RequestMethod.DELETE)
	public String ubooksDeleteUsedbook(@PathVariable("bookId") int bookId,HttpServletRequest request) throws Exception {
		if(request.getSession().getAttribute("memberId")==null) {
			return "redirect:/gotoLogin";
		} else {
			if(sellService.deleteProduct(request,bookId)) {
				sellService.deleteIndexProduct(bookId);
				return "redirect:/complete-works";
			} else {
				return "redirect:/invalidApproach";
			}
			
		}
	}
	
	@RequestMapping(value="/sell-usedbook", method=RequestMethod.GET)
	public ModelAndView sellUsedbook(HttpServletRequest request) throws Exception {
		if(request.getSession().getAttribute("memberId")==null) {
			return new ModelAndView("/ubooks/common/gotoLogin");
		} else {
			ModelAndView mv = new ModelAndView("/ubooks/sell/sell-usedbook");
			return mv;
		}
	}
	
	@RequestMapping(value="/sell-usedbook", method=RequestMethod.POST)
	public String sellUsedbook(CombookEntity combook, MultipartHttpServletRequest multipartHttpServletRequest) throws Exception {
		ComBookIndexDto combookIndexDto = sellService.registProduct(combook, multipartHttpServletRequest,0);
		sellService.indexProduct(combookIndexDto);
		return "redirect:/complete-works";
	}

	/********* E:전집 ***********************************************/

	/********* S:중고단행본 ***********************************************/
	@RequestMapping("/usedBooks")
	public ModelAndView ubooks() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/usedBooks");
		return mv;
	}
	/********* E:중고단행본 ***********************************************/
	
	@RequestMapping("/invalidApproach")
	public ModelAndView invalidApproach() throws Exception {
		return new ModelAndView("/ubooks/common/invalidApproach");
	}
	
	@RequestMapping("/gotoLogin")
	public ModelAndView gotoLogin() throws Exception {
		return new ModelAndView("/ubooks/common/gotoLogin");
	}

}
