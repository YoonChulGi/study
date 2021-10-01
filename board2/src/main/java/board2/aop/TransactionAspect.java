package board2.aop;


import java.util.Collections;

import org.springframework.aop.Advisor;
import org.springframework.aop.aspectj.AspectJExpressionPointcut;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.interceptor.MatchAlwaysTransactionAttributeSource;
import org.springframework.transaction.interceptor.RollbackRuleAttribute;
import org.springframework.transaction.interceptor.RuleBasedTransactionAttribute;
import org.springframework.transaction.interceptor.TransactionInterceptor;

@Configuration
public class TransactionAspect {
	
	// 트랜잭션을 설정할 때 사용되는 설정값을 상수로 선언합니다. 
	private static final String AOP_TRANSACTION_METHOD_NAME = "*";
	private static final String AOP_TRANSACTION_EXPRESSION = "execution(* board2..service.*Impl.*(..))";
	
	@Autowired
	private TransactionManager transactionManager;
	
	@Bean
	public TransactionInterceptor transactionAdvice() {
		MatchAlwaysTransactionAttributeSource source = new MatchAlwaysTransactionAttributeSource();
		RuleBasedTransactionAttribute transactionAttribute = new RuleBasedTransactionAttribute();
		transactionAttribute.setName(AOP_TRANSACTION_METHOD_NAME); // 트랜잭션의 이름을 설정합니다. 트랜잭션 모니터에서 트랜잭션의 이름으로 확인할 수 있습니다. 

		// 트랜잭션에서 롤백을 하는 룰(rule)을 설정합니다. 여기서는 예외가 일어나면 롤백이 수행되도록 지정했습니다.
		// Exception.class를 롤백의 룰로 등록하면 자바의 모든 예외는 Exception 클래스를 상속받기 때문에 어떤 예외가 발생해도 롤백이 수행됩니다.
		transactionAttribute.setRollbackRules(Collections.singletonList(new RollbackRuleAttribute(Exception.class))); 
		 
		source.setTransactionAttribute(transactionAttribute);
		
		return new TransactionInterceptor(transactionManager, source);
	}
	
	@Bean
	public Advisor transactionAdviceAdvisor() {
		AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
		pointcut.setExpression(AOP_TRANSACTION_EXPRESSION); // AOP의 포인트컷을 설정합니다. 여기서는 비즈니스 로직이 수행되는 모든 ServiceImpl 클래스의 모든 메서드를 지정했습니다. 
		return new DefaultPointcutAdvisor(pointcut,transactionAdvice());
	}
}
