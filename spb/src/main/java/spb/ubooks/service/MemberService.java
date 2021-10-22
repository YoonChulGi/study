package spb.ubooks.service;

import javax.servlet.http.HttpServletRequest;

import spb.ubooks.dto.MemberDto;

public interface MemberService {
	public int checkId(String memberId) throws Exception;
	public void insertMember(MemberDto member) throws Exception;
	public String loginMember(MemberDto member, HttpServletRequest request) throws Exception;
	//public void logoutMember(HttpServletRequest request);
}
