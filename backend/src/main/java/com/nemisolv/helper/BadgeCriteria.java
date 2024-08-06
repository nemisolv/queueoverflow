package com.nemisolv.helper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@AllArgsConstructor
@Getter
@Setter
public class BadgeCriteria {
    private Map<String,Integer> criteria;
}
