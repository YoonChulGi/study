package spb.ubooks.service;

import java.util.List;
import java.util.Map;

public interface SearchService {
	public String sendREST(String sendUrl, String jsonValue) throws IllegalStateException;

	public String sendRest(String url, String jsonValue) throws Exception ;
	
	public Map<String,Object> sendHighLevelApi(String indexName,String query,String searchField, String sort, String department, String publisher, String age) throws Exception;
	
	public String searchOneAsJson(String indexName, int bookId) throws Exception;
	
	public Map<String,Object> searchOneAsMap(String indexName, int bookId) throws Exception;
	
	public List<Map<String,Object>> searchManyAsMapByIds(String indexName, int[] ids) throws Exception;
	
	public Map<String,String> getIndexNameAndIdAndImagesByBookId(String indexNameWithWildCard, int bookId) throws Exception;
	
	public List<Map<String,Object>> getSelledQty() throws Exception;
	
	public List<Map<String,Object>> getAutoCompleteList(String query) throws Exception;
}
