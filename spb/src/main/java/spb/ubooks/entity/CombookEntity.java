package spb.ubooks.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="combook")
@NoArgsConstructor
@Data
public class CombookEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int book_id;
	
	@Column(nullable=false)
	private String title;
	
	@Column(nullable=false)
	private String min_age;
	
	@Column(nullable=false)
	private String max_age;
	
	@Column(nullable=false)
	private String publisher;
	
	@Column(nullable=false)
	private String department;
	
	@Column(nullable=true)
	private String state;
	
	@Column(nullable=false)
	private String shipping_fee;
	
	@Column(nullable=true)
	private String reg_date;
	
	@Column(nullable=true)
	private String new_or_used;
	
	@Column(nullable=true)
	private int list_price;
	
	@Column(nullable=false)
	private int price;
	
	@Column(nullable=true)
	private int pub_year;
	
	@Column(nullable=true)
	private String seller_name;
	
	@Column(nullable=true)
	private String seller_contact;
	
	@Column(nullable=true)
	private char delete_yn='n';
	
}