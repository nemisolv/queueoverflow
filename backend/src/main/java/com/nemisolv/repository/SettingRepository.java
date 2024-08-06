package com.nemisolv.repository;


import com.nemisolv.entity.Setting;
import com.nemisolv.entity.type.SettingCategory;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SettingRepository extends CrudRepository<Setting,Long> {
    List<Setting> findByCategory(SettingCategory category);
}