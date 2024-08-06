package com.nemisolv.util;

import java.time.LocalDateTime;
import java.util.Date;

public class Constants {
    public static final LocalDateTime EXP_TIME_REGISTRATION_EMAIL= LocalDateTime.now().plusMinutes(15);
    public static final LocalDateTime EXP_TIME_RESET_PASSWORD_EMAIL= LocalDateTime.now().plusMinutes(15);

    public static final String CLIENT_BASE_URL = "https://queueoverflow-azure.vercel.app";
    public static final String UPLOAD_DIR_PREFIX = "queueoverflow";

}
