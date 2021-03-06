package spb.ubooks.dto;

import lombok.Data;

@Data
public class ComBookDto {
	private int BOOK_ID; 
	private String TITLE;
	private String MIN_AGE;
	private String MAX_AGE;
	private String PUBLISHER;
	private String DEPARTMENT;
	private String STATE;
	private String SHIPPING_FEE;
	private String REG_DATE;
	private String UPDATED_DATE;
	private String NEW_OR_USED;
	private Integer LIST_PRICE;
	private Integer PRICE;
	private Integer PUB_YEAR;
	private String SELLER_ID;
	private String SELLER_NAME;
	private String SELLER_CONTACT;
	private String _id;
	private String _index;
	private String _score;
	private String _type;
	private String _timestamp;
	private String _version;
}
