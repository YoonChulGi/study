package spb.ubooks.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.lucene.search.TotalHits;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.core.TimeValue;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.ScoreSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SearchServiceImpl implements SearchService{
	
	@Autowired
	RestHighLevelClient client;

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
	public List<Map<String,Object>> sendHighLevelApi(String indexName) throws Exception {
		ArrayList<Map<String,Object>> list = null;
		try {
			SearchRequest searchRequest = new SearchRequest(indexName);
			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
			searchSourceBuilder.size(100);
			searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
			searchSourceBuilder.query(QueryBuilders.matchAllQuery());
			searchSourceBuilder.sort(new ScoreSortBuilder().order(SortOrder.DESC));  // score 높은순 (default)
			searchSourceBuilder.sort(new FieldSortBuilder("_id").order(SortOrder.ASC)); // id오름차순 정렬 
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
			for (SearchHit hit : searchHits) {
				Map<String, Object> sourceAsMap = hit.getSourceAsMap();
				log.debug("sourceAsMap: " + sourceAsMap);
				list.add(sourceAsMap);
			}
			for(Map<String,Object> m : list) {
				log.debug(m.toString());
			}
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
		}
		
		return list;
	}
}
