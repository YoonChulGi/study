package spb.ubooks.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="spb_banner")
@NoArgsConstructor
@Data
public class BannerEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(nullable=false)
	private String adTitle;
	
	@Column(nullable=false)
	private String adDesc;
	
	@Column(nullable=false)
	private String originalname;
	
	@Column(nullable=false)
	private String mimetype;
	
	@Column(nullable=false)
	private int size;
	
	@Column(nullable=false)
	private String bucket;
	
	@Column(nullable=false)
	private String key;
	
	@Column(nullable=false)
	private String url;
	
	@Column(nullable=false)
	private LocalDateTime endDate;
	
	@Column(nullable=false)
	private char deletedYn = 'n';
	
	@Column(nullable=false)
	private LocalDateTime createdAt;
	
	@Column(nullable=false)
	private LocalDateTime updatedAt;
	
	@Column(nullable=false)
	private int bid;
	
}
