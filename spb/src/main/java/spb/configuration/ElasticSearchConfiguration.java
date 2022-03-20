package spb.configuration;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class ElasticSearchConfiguration {
	/*
	 * @Bean(name="elastic") public PropertiesFactoryBean propertiesFactoryBean()
	 * throws Exception { PropertiesFactoryBean propertiesFactoryBean = new
	 * PropertiesFactoryBean(); ClassPathResource classPathResource = new
	 * ClassPathResource("/search.properties");
	 * propertiesFactoryBean.setLocation(classPathResource); return
	 * propertiesFactoryBean; }
	 */
	
	@Value("${elasticsearch.host}")
	private String hostname;
	
	@Value("${elasticsearch.port}")
	private Integer port;
	
	@Bean
    public RestHighLevelClient restHighLevelClient() {
//		log.debug("##RestHighLevelClient##");
//		log.debug("hostname: " + hostname);
//		log.debug("port: " + port);
		
        return new RestHighLevelClient(RestClient.builder(new HttpHost(hostname, port, "http")));
    }

}
