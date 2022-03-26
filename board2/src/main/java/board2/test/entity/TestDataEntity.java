package board2.test.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.ToString;

@Data
@Document("test_data")
@ToString
public class TestDataEntity {
	
	@Id
	private String _id;
	
	private String name;
	private int age;
	private int score=100;
	
}
