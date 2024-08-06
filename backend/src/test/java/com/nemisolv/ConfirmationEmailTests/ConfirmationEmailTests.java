package com.nemisolv.ConfirmationEmailTests;

import com.nemisolv.entity.ConfirmationEmail;
import com.nemisolv.entity.type.MailType;
import com.nemisolv.repository.ConfirmationEmailRepository;
import com.nemisolv.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@Rollback(false)
public class ConfirmationEmailTests {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfirmationEmailRepository confirmationEmailRepository;

    @Test
    public void testListConfirmationEmailsByUserIdAndMailType() {
        Long userId =11l;
       List<ConfirmationEmail> list= confirmationEmailRepository.findByTypeAndUserId(MailType.REGISTRATION_CONFIRMATION, userId)
                ;

        Assertions.assertThat(list).isNotEmpty();
        list.forEach(System.out::println);


    }
}
