package spb.ubooks.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="spb_cart")
@NoArgsConstructor
@ApiModel(value="CartEntity : 장바구니 목록", description="장바구니 목록")
@Data
public class CartEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@ApiModelProperty(value="장바구니 번호")
	private int cartIdx;
	
	@Column(nullable=false)
	@ApiModelProperty(value="장바구니 조회 Id")
	private String memberId;
	
	@Column(nullable=false)
	@ApiModelProperty(value="조회한 책(상품) 번호")
	private int bookId;
	
	@Column(nullable=false)
	@ApiModelProperty(value="장바구니에 추가된 책(상품) 갯수")
	private int qty;
	
}
