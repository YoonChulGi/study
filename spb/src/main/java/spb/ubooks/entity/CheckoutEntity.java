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
@Table(name="spb_checkout")
@NoArgsConstructor
@Data
public class CheckoutEntity {
	@Id
	private String idx;
	
	@Column(nullable=false)
	private String fullName;
	
	@Column(nullable=false)
	private String postcode;
	
	@Column(nullable=false)
	private String address;
	
	@Column(nullable=false)
	private String extraAddress;
	
	@Column(nullable=false)
	private String detailAddress;
	
	@Column(nullable=false)
	private String cardNumber;
	
	@Column(nullable=false)
	private String cardExpiry;
	
	@Column(nullable=false)
	private String cardCvc;
	
	@Column(nullable=false)
	private String prdIds;
	
	@Column(nullable=false)
	private String qtys;
	
	@Column(nullable=false)
	private LocalDateTime checkoutTime = LocalDateTime.now();
}
