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
@Table(name="spb_cart")
@NoArgsConstructor
@Data
public class CartEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int basketIdx;
	
	@Column(nullable=false)
	private String memberId;
	
	@Column(nullable=false)
	private String bookId;
	
	@Column(nullable=false)
	private int qty;
}
