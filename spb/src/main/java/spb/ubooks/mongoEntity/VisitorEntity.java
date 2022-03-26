package spb.ubooks.mongoEntity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.ToString;

@Data
@Document("visitors")
@ToString
public class VisitorEntity {
	
	@Id
	private String _id;
	private String ip;
	private String session_id;
	private String agent;
	private String refer;
	private Date timestamp = new Date();
}
