package com.nemisolv.service.impl;

import com.nemisolv.entity.Setting;
import com.nemisolv.entity.type.SettingCategory;
import com.nemisolv.helper.EmailSettingBag;
import com.nemisolv.repository.SettingRepository;
import com.nemisolv.service.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SettingServiceImpl implements SettingService {
    private final SettingRepository settingRepo;


    @Override
    public EmailSettingBag getEmailSettings() {
        List<Setting> settings = settingRepo.findByCategory(SettingCategory.MAIL_SERVER);
        return new EmailSettingBag(settings);
    }
}
