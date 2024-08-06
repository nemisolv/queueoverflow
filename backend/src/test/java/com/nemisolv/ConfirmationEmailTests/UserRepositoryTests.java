package com.nemisolv.ConfirmationEmailTests;

import com.nemisolv.entity.Question;
import com.nemisolv.repository.QuestionRepository;
import com.nemisolv.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Test
    public void testGetSavedQuestionsPage() {
        Long userId = 1L;
        Page<Question> allBySavedQuestions = questionRepository.findAllBySavedQuestions(Pageable.unpaged(), userId, "");
        allBySavedQuestions.getContent().forEach(q -> System.out.println(q.getTitle())  );
        Assertions.assertNotNull(allBySavedQuestions);

    }
}
