package spb;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import spb.ubooks.service.SearchService;

@SpringBootTest
public class SpbApplicationTests {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Autowired
	private SearchService searchService;
	
	@Test
	public void contextLoads() {
	}

	@Test
	public void testSqlSession() throws Exception{
		System.out.println(sqlSession.toString());
	}
	
	@Test
	public void searchTest() throws Exception{
		List<Map<String,Object>> list = searchService.getSelledQty();
		System.out.println(list.toString());
	}
}