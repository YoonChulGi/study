package spb.ubooks.service;

import java.util.Map;

public interface SearchService {
	public String sendREST(String sendUrl, String jsonValue) throws IllegalStateException;

	public String sendRest(String url, String jsonValue) throws Exception ;
	
	public Map<String,Object> sendHighLevelApi(String indexName) throws Exception;
	
	public String searchPrev(String indexName, int bookId) throws Exception;
}
