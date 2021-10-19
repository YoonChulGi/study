package spb.ubooks.dto;

import lombok.Data;

@Data
public class MemberDto {
	String memberId;     
	String memberPw;     
	String memberName;    
	String memberContact;
	String signupTime;   
	String deletedYn;   
}
	