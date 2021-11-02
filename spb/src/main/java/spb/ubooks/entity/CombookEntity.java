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
	private int bookId;
	
	@Column(nullable=false)
	private String title;
	
	@Column(nullable=false)
	private String minAge;
	
	@Column(nullable=false)
	private String maxAge;
	
	@Column(nullable=false)
	private String publisher;
	
	@Column(nullable=false)
	private String department;
	
	@Column(nullable=true)
	private String state;
	
	@Column(nullable=false)
	private String shippingFee;
	
	@Column(nullable=true)
	private String regDate;
	
	@Column(nullable=true)
	private String newOrUsed;
	
	@Column(nullable=true)
	private int listPrice;
	
	@Column(nullable=false)
	private int price;
	
	@Column(nullable=true)
	private int pubYear;
	
	@Column(nullable=true)
	private String sellerName;
	
	@Column(nullable=true)
	private String sellerContact;
	
	@Column(nullable=true)
	private char deleteYn='n';
	
}