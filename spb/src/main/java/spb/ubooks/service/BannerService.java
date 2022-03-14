package spb.ubooks.service;

import java.util.List;
import java.util.Map;

public interface BannerService {
	List<Map<String, Object>> selectBannerList() throws Exception;
}
