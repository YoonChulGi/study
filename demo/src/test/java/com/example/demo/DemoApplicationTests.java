package com.example.demo;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.common.xcontent.XContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.images.builder.ImageFromDockerfile;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class DemoApplicationTests {
	Logger log = LoggerFactory.getLogger(this.getClass());
	static GenericContainer elastic;
	static RestHighLevelClient client;


	@BeforeAll
	@DisplayName("testContainer를 활용하여 RestHighLevelClient 생성")
	static void setElasticAndRestHighLevelClient() {
		elastic = new GenericContainer(
				new ImageFromDockerfile().withDockerfileFromBuilder(builder -> builder
						.from("docker.elastic.co/elasticsearch/elasticsearch:7.8.1")
//						.run("bin/elasticsearch-plugin install analysis-nori")
						.build())
		).withExposedPorts(9200,9300)
				.withEnv("discovery.type","single-node");
		elastic.start();

		String hostAddress = new StringBuilder()
				.append(elastic.getHost())
				.append(":")
				.append(elastic.getMappedPort(9200))
				.toString();

		client = new RestHighLevelClient(RestClient
				.builder(HttpHost
						.create(hostAddress)));

		CreateIndexRequest request = new CreateIndexRequest("my-shop");

		request.mapping("{\n" +
				"\"properties\": {\n" +
				"      \"shopNumber\": {\n" +
				"        \"type\": \"long\"\n" +
				"      },\n" +
				"      \"shopName\": {\n" +
				"        \"type\": \"text\"\n" +
				"      },\n" +
				"      \"address\": {\n" +
				"        \"type\": \"text\"\n" +
				"      },\n" +
				"      \"isOpen\": {\n" +
				"        \"type\": \"boolean\"\n" +
				"      }, \n" +
				"      \"shopLocation\": {\n" +
				"        \"type\": \"geo_point\"\n" +
				"      }, \n" +
				"      \"shopNameLength\": {\n" +
				"        \"type\": \"long\"\n" +
				"      }, \n" +
				"      \"score\": {\n" +
				"        \"type\": \"long\"\n" +
				"      }\n" +
				"    }\n" +
				"}", XContentType.JSON);

		try {
			client
					.indices()
					.create(request, RequestOptions
							.DEFAULT);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Test
	void contextLoads() {
		log.info("로그출력");
		assertThat(1).isEqualTo(1);
	}

}
