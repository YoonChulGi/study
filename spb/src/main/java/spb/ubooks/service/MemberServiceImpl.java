package spb.ubooks.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.dto.MemberDto;
import spb.ubooks.exception.DuplicatedIdException;
import spb.ubooks.mapper.MemberMapper;
import spb.ubooks.mongoEntity.LoginLog;
import spb.ubooks.mongoRepository.LoginLogRepository;

@Service
@Slf4j
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private LoginLogRepository loginLogRepository;

	@Override
	public int checkId(String memberId) throws Exception {
		log.debug("checkId: " + memberId);
		return memberMapper.selectIdCheck(memberId);
	}

	@Override
	public void insertMember(MemberDto member) throws Exception {
		if(memberMapper.selectIdCheck(member.getMemberId()) > 0) { // 이미 아이디가 존재할 때 (front 에서 선처리해서 일반적인 방법으로는 탈 일이 없다.)
			throw new DuplicatedIdException("아이디가 중복되어 회원가입에 실패했습니다.");
		} else {
			member.setMemberPw(passwordEncoder.encode(member.getMemberPw())); // BCryptPasswordEncoder
			memberMapper.insertMember(member);
		}
	}

	@Override
	public String loginMember(MemberDto member, HttpServletRequest request) throws Exception {
		
		MemberDto m = memberMapper.selectMemberCheck(member.getMemberId());
		
		if(m!= null) {
			if(passwordEncoder.matches(member.getMemberPw(), m.getMemberPw())) { // 로그인 성공
				HttpSession session = request.getSession();
				session.setAttribute("memberId", m.getMemberId());
				session.setAttribute("memberName", m.getMemberName());
//				log.debug("user_ip: "+ request.getRemoteAddr());
				putLoginLog(m.getMemberId(), request.getRemoteAddr());
				return "redirect:/";
			}
		}
		return "redirect:/loginFail";
	}

	@Override
	public void putLoginLog(String userId, String userIp) throws Exception {
		LoginLog loginLogEntity = new LoginLog();
		loginLogEntity.setUser_id(userId);
		loginLogEntity.setUser_ip(userIp);
		loginLogRepository.save(loginLogEntity);
	}

//	@Override
//	public void logoutMember(HttpServletRequest request) {
//		HttpSession session = request.getSession();
//		session.invalidate();
//	}
}
