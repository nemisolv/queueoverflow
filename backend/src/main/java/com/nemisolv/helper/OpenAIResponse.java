package com.nemisolv.helper;

import java.util.List;

public  class OpenAIResponse {
        private List<Choice> choices;

        public List<Choice> getChoices() {
            return choices;
        }

        public static class Choice {
            private String text;

            public String getText() {
                return text;
            }
        }
    }
