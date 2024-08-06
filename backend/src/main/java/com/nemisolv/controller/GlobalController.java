package com.nemisolv.controller;

import com.nemisolv.payload.global.GlobalSearchParams;
import com.nemisolv.payload.global.GlobalSearchResponse;
import com.nemisolv.service.GlobalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/global")
public class GlobalController {
    private final GlobalService globalService;

    @GetMapping("/global-search")
    public ResponseEntity<?> globalSearch(@RequestParam("globalSearch") String globalSearch, @RequestParam("type") String type) {
        GlobalSearchParams params = new GlobalSearchParams(globalSearch, type);
        List<GlobalSearchResponse> globalSearchResponses = globalService.globalSearch(params);
        return ResponseEntity.ok(globalSearchResponses);

    }
}
