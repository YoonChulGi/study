package board2;

import org.elasticsearch.client.RestHighLevelClient;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class Board2ApplicationTests {
	
	@Autowired
	RestHighLevelClient client;
	
	@Test
	void contextLoads() {
	}
	
	@Test
	public void restTest() throws Exception {
		System.out.println(client);
	}

}
