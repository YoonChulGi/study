package spb.ubooks.service;

public interface SearchService {
	public String sendREST(String sendUrl, String jsonValue) throws IllegalStateException;

	public String sendRest(String url, String jsonValue) throws Exception ;
}