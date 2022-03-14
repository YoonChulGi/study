package spb.ubooks.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.repository.BannerRepository;

@Slf4j
@Service
public class BannerServiceImpl implements BannerService{
	
	@Autowired
	BannerRepository bannerRepository;

	@Override
	public List<Map<String, Object>> selectBannerList() throws Exception {
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat sdf;
	    sdf = new SimpleDateFormat("yyyy-MM-dd");
	    sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
	    String stamp = sdf.format(date);
	    String ymd = stamp.toString();
	    log.debug(ymd);
		return bannerRepository.findAllActive(ymd);
	}

}
