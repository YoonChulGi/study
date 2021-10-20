package spb.ubooks.mapper;

import org.apache.ibatis.annotations.Mapper;

import spb.ubooks.dto.MemberDto;

@Mapper
public interface MemberMapper {
	public int selectIdCheck(String memberId) throws Exception;
	public void insertMember(MemberDto member) throws Exception;
	public MemberDto selectMemberCheck(String memberId) throws Exception;
}
