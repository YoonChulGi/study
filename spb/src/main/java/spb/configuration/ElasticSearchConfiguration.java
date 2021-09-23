package spb.configuration;

import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class ElasticSearchConfiguration {
	@Bean(name="elastic")
	public PropertiesFactoryBean propertiesFactoryBean() throws Exception {
		PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
		ClassPathResource classPathResource = new ClassPathResource("/search.properties");
		propertiesFactoryBean.setLocation(classPathResource);
		return propertiesFactoryBean;
	}
	

}