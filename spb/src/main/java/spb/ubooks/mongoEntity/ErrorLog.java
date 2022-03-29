package spb.ubooks.mongoEntity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.ToString;

@Data
@Document("error-log")
@ToString
public class ErrorLog {
	
	@Id
	private String _id;
	private String user_id = null;
	private String user_ip;
	private int status;
	private String url;
	private String message;
	private String exception;
	private LocalDateTime timestamp = LocalDateTime.now();
}
