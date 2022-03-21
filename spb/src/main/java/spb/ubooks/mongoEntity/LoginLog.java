package spb.ubooks.mongoEntity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.ToString;

@Data
@Document("login-log")
@ToString
public class LoginLog {
	
	@Id
	private String _id;
	private String user_id;
	private String user_ip;
	private LocalDateTime timestamp = LocalDateTime.now();
}
