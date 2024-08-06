package com.nemisolv.service;

import com.nemisolv.payload.global.GlobalSearchParams;
import com.nemisolv.payload.global.GlobalSearchResponse;

import java.util.List;

public interface GlobalService {
    List<GlobalSearchResponse> globalSearch(GlobalSearchParams params);
}
