package spb;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SpbApplicationTests {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Test
	public void contextLoads() {
	}

	@Test
	public void testSqlSession() throws Exception{
		System.out.println(sqlSession.toString());
	}
	
	@Test
	public void Test() throws Exception{
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("name", "apple");
		map1.put("price", 1000);
		
		Map<String,Object> map2 = new HashMap<String,Object>();
		map2.put("name", "orange");
		map2.put("price", 500);
		
		Map<String,Object> map3 = new HashMap<String,Object>();
		map3.put("name", "banana");
		map3.put("price", 2000);
		
		list.add(map1);
		list.add(map2);
		list.add(map3);
		
//		Collections.sort(list, new Comparator<Map<String,Object>>() {
//
//			@Override
//			public int compare(Map<String,Object> o1, Map<String,Object> o2) {
//				int first = Integer.parseInt(o1.get("price").toString());
//				int second = Integer.parseInt(o2.get("price").toString());
//				return first > second ? -1 : first< second ? 1 : 0; // 내림차순 정렬
//				//return second > first ? -1 : second< first ? 1 : 0; // 오름차순 정렬
//			}
//			
//		});
		
		Collections.sort(list, new Comparator<Map<String,Object>>() {

			@Override
			public int compare(Map<String,Object> o1, Map<String,Object> o2) {
				String first = o1.get("name").toString();
				String second = o2.get("name").toString();
				
				return second.compareTo(first); // 내림차순
//				return first.compareTo(second); // 오름차순
			}
			
		});
		
		System.out.println(list);
	}
}