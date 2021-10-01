package board2.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@Aspect // @Aspect 어노테이션을 이용하여 자바 코드에서 AOP를 설정합니다. 
public class LoggerAspect {
	// 먼저 @Around 어노테이션으로 해당 기능이 실행될 시점, 즉 어드바이스를 정의합니다. Around 어드바이스는 대상 메서드의 실행 전후 또는 예외 발생 시점입니다. execution은 포인트컷 표현식으로 적용할 메서드를 명시할 때 사용됩니다. 
	@Around("execution(* board2..controller.*Controller.*(..)) or execution(* board2..service.*Impl.*(..)) or execution(* board2..mapper.*Mapper.*(..))")
	public Object logPrint(ProceedingJoinPoint joinPoint) throws Throwable {
		String type = "";
		String name = joinPoint.getSignature().getDeclaringTypeName();
		
		// 실행되는 메서드의 이름을 이용해서 컨트롤러, 서비스, 매퍼를 구분한 후 실행되는 메서드의 이름을 출력합니다. 
		if(name.indexOf("Controller") > -1) {
			type = "Controller  \t:  ";
		} else if(name.indexOf("Service") > -1) {
			type = "ServiceImpl  \t:  ";
		} else if(name.indexOf("Mapper") > -1) {
			type = "Mapper  \t:  ";
		}
		log.debug(type + name + "." + joinPoint.getSignature().getName() + "()");
		return joinPoint.proceed();
	}
}
