package spb.ubooks.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.lucene.search.TotalHits;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.core.TimeValue;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.ScoreSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.mapper.CombookMapper;
import spb.ubooks.repository.CombookRepository;

@Slf4j
@Transactional
@Service
public class SearchServiceImpl implements SearchService{
	
	@Autowired
	RestHighLevelClient client;
	
	@Autowired
	CombookRepository comBookRepository;
	
	@Autowired
	CombookMapper combookMapper;

	@Override
	public String sendREST(String sendUrl, String jsonValue) throws IllegalStateException {
		String inputLine = null;
        StringBuffer outResult = new StringBuffer();
        
        try {
            System.out.println("REST API Start");
            System.out.println("sendUrl: " + sendUrl);
            System.out.println("jsonValue: " + jsonValue);
            URL url = new URL(sendUrl);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Accept-Charset", "UTF-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(10000);
            /****** 인증이 있는경우 
            String id_pass = "id:password";
            String base64Credentials = new String(Base64.getEncoder().encode(id_pass.getBytes()));
            conn.setRequestProperty("Authorization", "Basic " + base64Credentials);
            */
            if(jsonValue != null) {
            	OutputStream os = conn.getOutputStream();
            	os.write(jsonValue.getBytes("UTF-8"));
            	os.flush();
            }
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
	
	@Override
	public String sendRest(String url, String jsonValue) throws Exception {
		int timeout = 10000; 
//		String query = map.get("query");
//		String convert = map.get("convert");
//		String target = map.get("target");
//		String charset = map.get("charset");
//		String datatype = map.get("datatype");
		
//		query = URLEncoder.encode(query,"UTF-8");
		
//		String url = "http://" + WNCollection.MANAGER_IP + ":" + WNCollection.MANAGER_PORT + "/manager/WNRun.do";
//		String param = "query=" + query + "&convert=" + convert + "&target=" + target + "&charset=" + charset + "&datatype=" + datatype;
//		System.out.println("url=" + url);
//		System.out.println("param=" + param);
		
		StringBuffer receiveMsg = new StringBuffer();
		HttpURLConnection uc = null;
		try {
			System.out.println("REST API Start");
            System.out.println("sendUrl: " + url);
            System.out.println("jsonValue: " + jsonValue);
			URL servletUrl = new URL(url);
			uc = (HttpURLConnection) servletUrl.openConnection();
			uc.setRequestProperty("Content-type", "application/json");
			uc.setRequestMethod("GET");
			uc.setDoOutput(true);
			uc.setDoInput(true);
			uc.setUseCaches(false);
			uc.setDefaultUseCaches(false);
			uc.setConnectTimeout(timeout);
			DataOutputStream dos = new DataOutputStream(uc.getOutputStream());
			dos.write(jsonValue.getBytes("UTF-8")); 
			dos.flush();
			dos.close();
			
			int errorCode = 0;
			// -- Network error check
			System.out.println("responseCode: " + uc.getResponseCode());
			if(uc.getResponseCode() == HttpURLConnection.HTTP_OK) {
				String currLine="";
				// UTF-8
				BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream(),"UTF-8"));
				while((currLine = in.readLine())!=null) {
					receiveMsg.append(currLine).append("\n\r");
				}
				in.close();
				uc.disconnect();
			} else {
				errorCode = uc.getResponseCode();
				return receiveMsg.toString();
			}
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			uc.disconnect();
		}
		return receiveMsg.toString();
	}

	@Override
	public Map<String,Object> sendHighLevelApi(
			String indexName, String query,String searchField, String sort, 
			String department, String publisher, String age) throws Exception {
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = null;
		ArrayList <String> departmentList = null;
		if("".equals(sort)) sort = "date";
		if(!"".equals(query)) query = "*" + query + "*";
		log.debug("query: "+query);
		log.debug("searchField: "+searchField);
		log.debug("sort: "+sort);
		log.debug("publisher: " + publisher);
		log.debug("department: " + department);
		log.debug("age: " + age);
		
		try {
			SearchRequest searchRequest = new SearchRequest(indexName);
			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
			searchSourceBuilder.size(10000);
			searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
			
			BoolQueryBuilder boolQuery = new BoolQueryBuilder();
			
			if(!"".equals(query)) {
				if("".equals(searchField) || "_all".equals(searchField)) { // searchField : _all , ''
					boolQuery.must(QueryBuilders.queryStringQuery(query));
				} else { 
					Map<String,Float> searchFieldsMap = new HashMap<String,Float>();
					searchFieldsMap.put(searchField,(float) 1);
					boolQuery.must(QueryBuilders.queryStringQuery(query).fields(searchFieldsMap));
				}
			}
			
			if(!"".equals(publisher)) {
				boolQuery.must(QueryBuilders.matchQuery("publisher.keyword",publisher));
			}
			
			if(!"".equals(department)) {
				boolQuery.must(QueryBuilders.matchQuery("department.keyword", department));
			}
			
			if(!"".equals(age)) {
				if("초등3학년이상".equals(age) || "초등전학년".equals(age)) {
					age = age.concat("-"+age);
				}
				String minAge = age.split("-")[0];
				String maxAge = age.split("-")[1].replaceAll("세", "");
				boolQuery.must(QueryBuilders.matchQuery("min_age.keyword", minAge));
				boolQuery.must(QueryBuilders.matchQuery("max_age.keyword", maxAge));
			}
			
			if("".equals(publisher) && "".equals(department) && "".equals(age) && "".equals(query) ) {
				searchSourceBuilder.query(QueryBuilders.matchAllQuery());
			} else {
				searchSourceBuilder.query(boolQuery);
			}
			
			// sort
			if("date".equals(sort)) {
				searchSourceBuilder.sort(new FieldSortBuilder("reg_date.keyword").order(SortOrder.DESC)); // 등록일순 정렬
			} else if("cheap".equals(sort) ) {
				searchSourceBuilder.sort(new FieldSortBuilder("price").order(SortOrder.ASC)); 
			} else if("expensive".equals(sort) ) {
				searchSourceBuilder.sort(new FieldSortBuilder("price").order(SortOrder.DESC)); 
			}
			
			searchSourceBuilder.sort(new ScoreSortBuilder().order(SortOrder.DESC));  // score 높은순 (default)
			//searchSourceBuilder.sort(new FieldSortBuilder("_id").order(SortOrder.ASC)); // id오름차순 정렬 
			searchRequest.source(searchSourceBuilder);
			
			SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
			
			/*
			 * RestStatus status = searchResponse.status(); TimeValue took =
			 * searchResponse.getTook(); Boolean terminatedEarly =
			 * searchResponse.isTerminatedEarly(); boolean timedOut =
			 * searchResponse.isTimedOut(); int totalShards =
			 * searchResponse.getTotalShards(); int successfulShards =
			 * searchResponse.getSuccessfulShards(); int failedShards =
			 * searchResponse.getFailedShards();
			 */
			
			SearchHits hits = searchResponse.getHits();
			TotalHits totalHits = hits.getTotalHits(); // the total number of hits, must be interpreted in the context of totalHits.relation
			/*
			 * long numHits = totalHits.value; // whether the number of hits is accurate
			 * (EQUAL_TO) or a lower bound of the total (GREATER_THAN_OR_EQUAL_TO)
			 * TotalHits.Relation relation = totalHits.relation; float maxScore =
			 * hits.getMaxScore();
			 */
			
			SearchHit[] searchHits = hits.getHits();
			list = new ArrayList<Map<String,Object>>();
			
			resultMap.put("totalHits", totalHits);
			
			for (SearchHit hit : searchHits) {
				Map<String, Object> sourceAsMap = hit.getSourceAsMap();
				// log.debug("sourceAsMap: " + sourceAsMap);
				sourceAsMap.put("images", sourceAsMap.get("images").toString().replaceAll("/dev/workspace/spb/src/main/resources/static", ""));
				sourceAsMap.put("selled_qty", 0); 
				list.add(sourceAsMap);
			}
			
			departmentList = new ArrayList<String>();
			for(Map<String,Object> m : list) {
				departmentList.add(m.get("department").toString());
			}
			
			if("best".equals(sort)) {
				List<Map<String,Object>> selledQty = getSelledQty();
				for(Map<String,Object> doc : list) {
					for(Map<String,Object> qtyDoc : selledQty) {
						if(qtyDoc.get("prdIds").toString().equals(doc.get("book_id").toString())) {
							doc.put("selled_qty", Integer.parseInt(doc.get("selled_qty").toString()) + Integer.parseInt(qtyDoc.get("qtys").toString()));
						}
					}
				}
				Collections.sort(list, new Comparator<Map<String,Object>>() {

					@Override
					public int compare(Map<String,Object> o1, Map<String,Object> o2) {
						int cnt1 =Integer.parseInt(o1.get("selled_qty").toString());
					    int cnt2 =Integer.parseInt(o2.get("selled_qty").toString());
						return cnt1 > cnt2 ? -1 : cnt1< cnt2 ? 1 : 0; // 내림차순 정렬
					}
				
				});
			}
			log.debug("list.toString(): "+list.toString());
			resultMap.put("totalHits", totalHits);
			resultMap.put("searchResult", list);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultMap;
	}

	@Override
	public String searchOneAsJson(String indexName, int bookId) throws Exception {
		SearchRequest searchRequest = new SearchRequest(indexName);
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		searchSourceBuilder.size(1);
		searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
		searchSourceBuilder.query(QueryBuilders.matchQuery("book_id", bookId));
		searchRequest.source(searchSourceBuilder);
		
		SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
		SearchHits hits = searchResponse.getHits();
		SearchHit[] searchHits = hits.getHits();
		return searchHits[0].getSourceAsString();
	}

	@Override
	public Map<String, Object> searchOneAsMap(String indexName, int bookId) throws Exception {
		SearchRequest searchRequest = new SearchRequest(indexName);
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		searchSourceBuilder.size(1);
		searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
		searchSourceBuilder.query(QueryBuilders.matchQuery("book_id", bookId));
		searchRequest.source(searchSourceBuilder);
		
		SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
		SearchHits hits = searchResponse.getHits();
		SearchHit[] searchHits = hits.getHits();
		TotalHits totalHits = hits.getTotalHits();
		
		if(totalHits.value > 0) {
			Map<String, Object> m = searchHits[0].getSourceAsMap();
			m.put("images",  m.get("images").toString().replaceAll("/dev/workspace/spb/src/main/resources/static", ""));
			m.put("nextBid", 0);
			m.put("prevBid", 0);
			List<Integer> nextPrevBids = combookMapper.selectNextPrevBookIds(bookId);
			for(Integer i : nextPrevBids) {
				if(i > bookId) {
					m.put("nextBid", i);
				} else {
					m.put("prevBid", i);
				}
			}
			return m;
		} else {
			return null;
		}
	}
	
	@Override
	public List<Map<String, Object>> searchManyAsMapByIds(String indexName, int[] ids) throws Exception {
		List<Map<String,Object>> resultList = new ArrayList<>();
		SearchRequest searchRequest = new SearchRequest(indexName);
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		searchSourceBuilder.size(ids.length);
		searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
		BoolQueryBuilder query = new BoolQueryBuilder();
		
		for(int id : ids) {
			query.should(QueryBuilders.matchQuery("book_id", id));
		}
		searchSourceBuilder.query(query);
		searchSourceBuilder.sort(new FieldSortBuilder("book_id").order(SortOrder.DESC));
		searchRequest.source(searchSourceBuilder);
		
		SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
		SearchHits hits = searchResponse.getHits();
		SearchHit[] searchHits = hits.getHits();
		
		for (SearchHit hit : searchHits) {
			Map<String, Object> sourceAsMap = hit.getSourceAsMap();
			// log.debug("sourceAsMap: " + sourceAsMap);
			sourceAsMap.put("images", sourceAsMap.get("images").toString().replaceAll("/dev/workspace/spb/src/main/resources/static", ""));
			resultList.add(sourceAsMap);
		}
		
		return resultList;
	}

	@Override
	public Map<String,String> getIndexNameAndIdAndImagesByBookId(String indexNameWithWildCard, int bookId) throws Exception {
		SearchRequest searchRequest = new SearchRequest(indexNameWithWildCard);
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		searchSourceBuilder.size(1);
		searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
		searchSourceBuilder.query(QueryBuilders.matchQuery("book_id", bookId));
		searchRequest.source(searchSourceBuilder);
		
		SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
		SearchHits hits = searchResponse.getHits();
		SearchHit[] searchHits = hits.getHits();
		
		String indexName = searchHits[0].getIndex();
		String _id = searchHits[0].getId();
		String images = searchHits[0].getSourceAsMap().get("images").toString();
		Map<String,String> result = new LinkedHashMap<String,String>();
		result.put("indexName", indexName);
		result.put("_id", _id);
		result.put("images", images);
		return result;
	}
	
	public List<Map<String,Object>> getSelledQty() throws Exception {
		List<Map<String,Object>> resultList = new ArrayList<>();
		SearchRequest searchRequest = new SearchRequest("checked_out_products");
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
		searchSourceBuilder.query(QueryBuilders.matchAllQuery());
		searchRequest.source(searchSourceBuilder);
		
		SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
		SearchHits hits = searchResponse.getHits();
		SearchHit[] searchHits = hits.getHits();
		
		for (SearchHit hit : searchHits) {
			Map<String, Object> sourceAsMap = hit.getSourceAsMap();
			// log.debug("sourceAsMap: " + sourceAsMap);
			resultList.add(sourceAsMap);
		}
		
		return resultList;
	}

	
}

class MapComparator implements Comparator<Map<String, String>> {
	 
    private final String key;
    
    public MapComparator(String key) {
        this.key = key;
    }
    
    @Override
    public int compare(Map<String, String> first, Map<String, String> second) {
        int result = first.get(key).compareTo(second.get(key));
        return result;
    }
}