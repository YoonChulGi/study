package spb.ubooks.service;

import spb.ubooks.dto.MemberDto;

public interface MemberService {
	public int checkId(String memberId) throws Exception;
	public void insertMember(MemberDto member) throws Exception;
}
