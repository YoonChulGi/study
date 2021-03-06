package board.configuration;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
//@EnableElasticsearchRepositories(basePackages = "com.baeldung.spring.data.es.repository")
//@ComponentScan(basePackages = { "com.baeldung.spring.data.es.service" })
public class ElasticSearchConfiguration{
	
	@Value("${es.url}")
	private String hostname;
	
	@Value("${es.port}")
	private Integer port;
	
	
	
	/*
	 * @Bean public RestHighLevelClient client() { ClientConfiguration
	 * clientConfiguration =
	 * ClientConfiguration.builder().connectedTo("localhost:9200").build(); return
	 * RestClients.create(clientConfiguration).rest(); }
	 */
	
	
	@Bean
    public RestHighLevelClient restHighLevelClient() {
		System.out.println("##RestHighLevelClient##");
		System.out.println("hostname: " + hostname);
		System.out.println("port: " + port);
		
        return new RestHighLevelClient(RestClient.builder(new HttpHost(hostname, port, "http")));
    }
	
	/*
	 * @Bean public ElasticsearchOperations elasticsearchTemplate() { return new
	 * ElasticsearchRestTemplate(restHighLevelClient()); }
	 */
	


}
