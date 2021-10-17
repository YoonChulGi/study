package board2.test.service;

import java.util.List;
import java.util.Map;

public interface TestService {
	public List<Map<String,Object>> sendHighLevelApi(String indexName, String sort, String department, String publisher, String age) throws Exception;
}
