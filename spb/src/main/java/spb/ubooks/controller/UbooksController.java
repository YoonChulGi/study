package spb.ubooks.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mysql.cj.xdevapi.JsonArray;

import spb.ubooks.service.SearchService;


@Controller
public class UbooksController {
	
	@Autowired
	SearchService searchService;
	@Value("#{elastic['els.url']}")
	String searchUrl;
	
	@RequestMapping(value={"/","/index"})
	public ModelAndView ubooksHome() throws Exception{
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
	
	@RequestMapping("/login")
	public ModelAndView ubooksLogin() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/login");
		return mv;
	}

	@RequestMapping("/signin")
	public ModelAndView ubooksSignin() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/pages/signin");
		return mv;
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
	public ModelAndView ubooksCompleteWorks() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/buy/complete-works");
		HashMap<String, Object> queryValue = new HashMap<String,Object>();
		HashMap<String, Object> queryValue2 = new HashMap<String,Object>();
//		queryValue.put("match_all", queryValue2);
//		HashMap<String, Object> resultMap = new HashMap<String, Object>();
//		resultMap.put("query", queryValue);
//		ObjectMapper mapper = new ObjectMapper();
//		String json = mapper.writeValueAsString(resultMap);
		String msgMap = searchService.sendREST(searchUrl, null);
		System.out.println("msgMap: "+msgMap);
		mv.addObject("res", msgMap);
		return mv;
	}
	/********* E:전집 ***********************************************/
	
	/********* S:중고단행본 ***********************************************/
	@RequestMapping("/usedBooks")
	public ModelAndView ubooks() throws Exception {
		ModelAndView mv = new ModelAndView("/ubooks/shop/usedBooks");
		HashMap<String, Object> resultMap = new HashMap();
		resultMap.put("key", "data");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(resultMap);
		String msgMap = sendREST(searchUrl, json);
		System.out.println("msgMap: " + msgMap);
		return mv;
	}
	/********* E:중고단행본 ***********************************************/
	
	public static String sendREST(String sendUrl, String jsonValue) throws IllegalStateException {
        String inputLine = null;
        StringBuffer outResult = new StringBuffer();
        
        try {
            System.out.println("REST API Start");
            URL url = new URL(sendUrl);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Accept-Charset", "UTF-8");
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(10000);
            /****** 인증이 있는경우 
            String id_pass = "id:password";
            String base64Credentials = new String(Base64.getEncoder().encode(id_pass.getBytes()));
            conn.setRequestProperty("Authorization", "Basic " + base64Credentials);
            */
            
            OutputStream os = conn.getOutputStream();
            os.write(jsonValue.getBytes("UTF-8"));
            os.flush();
            
            // 리턴된 결과 읽기
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            while ((inputLine = in.readLine()) != null) {
                outResult.append(inputLine);
            }
            
            conn.disconnect();
            System.out.println("REST API End");
        }catch(Exception e) {
            e.printStackTrace();
        }
        return outResult.toString();
    }
}
