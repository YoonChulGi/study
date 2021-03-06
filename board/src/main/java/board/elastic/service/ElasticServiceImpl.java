package board.elastic.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.http.HttpHost;
import org.apache.http.util.EntityUtils;
import org.apache.lucene.search.TotalHits;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.core.TimeValue;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.ScoreSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import board.elastic.document.선별진료소Dto;

@Service
public class ElasticServiceImpl implements ElasticService{
	
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	private String host = "127.0.0.1";
	private int port = 9200;
	
	private final String ELASTIC_INDEX = "선별진료소";
	private final String ELASTIC_TYPE = "_doc";
	
	@Autowired
	RestHighLevelClient client;
	

	@Override
	public Map<String, Object> sendGET() throws Exception {
		log.debug("sendGet() called !!");
		String id = "DfbtunsBcW0Djpftabvh";
//		String id = "";
		String url = ELASTIC_INDEX + "/" + ELASTIC_TYPE+"/"+id;
		Map<String, Object> result = callElasticApi("GET", url, null, null);
		log.debug("result ===>" + result);
		return result;
	}
	
	public Map<String, Object> callElasticApi(String method, String url, Object obj, String jsonData) { // low level client
		Map<String, Object> result = new HashMap<>();
        String jsonString;
        //json형태의 파라미터가 아니라면 gson으로 만들어주자.
        if (jsonData == null) {
            Gson gson = new Gson();
            jsonString = gson.toJson(obj);
        } else {
            jsonString = jsonData;
        }

        //엘라스틱서치에서 제공하는 restClient를 통해 엘라스틱서치에 접속한다
        try(RestClient restClient = RestClient.builder(new HttpHost(host, port)).build()) {
            Map<String, String> params =  Collections.singletonMap("pretty", "false");
            //엘라스틱서치에서 제공하는 response 객체
            Response response = null;
            Request request = new Request(method, url);
            request.addParameters(params);
            
            //GET, DELETE 메소드는 HttpEntity가 필요없다
            if (method.equals("GET") || method.equals("DELETE")) {
                response = restClient.performRequest(request);
            } else {
                //HttpEntity entity = new NStringEntity(jsonString, ContentType.APPLICATION_JSON);
                request.setJsonEntity(jsonString);
                response = restClient.performRequest(request);
            }
            //앨라스틱서치에서 리턴되는 응답코드를 받는다
            int statusCode = response.getStatusLine().getStatusCode();
            //엘라스틱서치에서 리턴되는 응답메시지를 받는다
            String responseBody = EntityUtils.toString(response.getEntity());
            log.debug(responseBody);
            result.put("resultCode", statusCode);
            result.put("resultBody", responseBody);
        } catch (Exception e) {
            result.put("resultCode", -1);
            result.put("resultBody", e.toString());
        }
        return result;
	}

	@Override
	public List<선별진료소Dto> highLevelSendGet() throws Exception {
		ArrayList<선별진료소Dto> list = null;
		try {
			SearchRequest searchRequest = new SearchRequest("선별진료소"); // param 없으면 모든 인덱스에 대해 실행
			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
			searchSourceBuilder.size(30);
			searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
//			searchSourceBuilder.query(QueryBuilders.termQuery("관할보건소", "강남구보건소")); // match_all 조건
			searchSourceBuilder.query(QueryBuilders.matchAllQuery()); // match_all 조건
			searchSourceBuilder.sort(new ScoreSortBuilder().order(SortOrder.DESC));  // score 높은순 (default)
			searchSourceBuilder.sort(new FieldSortBuilder("_id").order(SortOrder.ASC)); // id오름차순 정렬 
			searchRequest.source(searchSourceBuilder);
			
			SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
			
			RestStatus status = searchResponse.status();
			TimeValue took = searchResponse.getTook();
			Boolean terminatedEarly = searchResponse.isTerminatedEarly();
			boolean timedOut = searchResponse.isTimedOut();
			int totalShards = searchResponse.getTotalShards();
			int successfulShards = searchResponse.getSuccessfulShards();
			int failedShards = searchResponse.getFailedShards();
			
			log.debug("status: " + status);
			log.debug("took: " + took);
			log.debug("terminatedEarly: " + terminatedEarly);
			log.debug("timedOut: " + timedOut);
			log.debug("totalShards: " + totalShards);
			log.debug("successfulShards: " + successfulShards);
			log.debug("failedShards: " + failedShards);
			
			SearchHits hits = searchResponse.getHits();
			TotalHits totalHits = hits.getTotalHits(); // the total number of hits, must be interpreted in the context of totalHits.relation
			long numHits = totalHits.value; // whether the number of hits is accurate (EQUAL_TO) or a lower bound of the total (GREATER_THAN_OR_EQUAL_TO)
			TotalHits.Relation relation = totalHits.relation;
			float maxScore = hits.getMaxScore();
			
			log.debug("hits: " + hits);
			log.debug("totalHits: " + totalHits);
			log.debug("numHits: " + numHits);
			log.debug("relation: " + relation);
			log.debug("maxScore: " + maxScore);
			
			SearchHit[] searchHits = hits.getHits();
			list = new ArrayList<선별진료소Dto>();
			for (SearchHit hit : searchHits) {
//				String index = hit.getIndex();
//				String id = hit.getId();
//				float score = hit.getScore();
//				String sourceAsString = hit.getSourceAsString();
				Map<String, Object> sourceAsMap = hit.getSourceAsMap();
				선별진료소Dto dto = new 선별진료소Dto();
//				log.debug("index: " + index);
//				log.debug("id: " + id);
//				log.debug("score: " + score);
//				log.debug("sourceAsString: " + sourceAsString);
				log.debug("sourceAsMap: " + sourceAsMap);
//				list.add(sourceAsString);
				
				dto.set의료기관명(sourceAsMap.get("의료기관명").toString());
				dto.set시군구(sourceAsMap.get("시군구").toString());
				dto.set주소(sourceAsMap.get("주소").toString());
				dto.set기준일(sourceAsMap.get("기준일").toString());
				dto.set평일운영시간(sourceAsMap.get("평일 운영시간").toString());
				dto.set시도(sourceAsMap.get("시도").toString());
				dto.set관할보건소(sourceAsMap.get("관할보건소").toString());
				dto.set관할보건소전화번호(sourceAsMap.get("관할보건소 전화번호").toString());
				dto.set대표전화번호(sourceAsMap.get("대표 전화번호").toString());
				list.add(dto);
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			// client.close();
		}
		return list;
	}
}