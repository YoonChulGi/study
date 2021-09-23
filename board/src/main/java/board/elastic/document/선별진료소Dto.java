package board.elastic.document;

import lombok.Data;

@Data
public class 선별진료소Dto {
	private String 의료기관명;
	private String 시군구;
	private String 주소;
	private String 기준일;
	private String 평일운영시간;
	private String 시도;
	private String 관할보건소;
	private String 관할보건소전화번호;
	private String 대표전화번호;
}
