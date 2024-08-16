package com.anasdev;

import com.anasdev.entities.Payment;
import com.anasdev.entities.PaymentStatus;
import com.anasdev.entities.PaymentType;
import com.anasdev.entities.Student;
import com.anasdev.repository.PaymentRepository;
import com.anasdev.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class StudentsApp {

    public static void main(String[] args) {
        SpringApplication.run(StudentsApp.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository, PaymentRepository paymentRepository){
        return args -> {
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .code("112233").firstName("anas").lastName("bensaid").programId("dev").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .code("112244").firstName("aymane").programId("data").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .code("112255").firstName("test").programId("cyber").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .code("112266").firstName("ok").programId("info").build());

            PaymentType[] paymentTypes = PaymentType.values();
            Random random=new Random();
            studentRepository.findAll().forEach(st->{
                for (int i = 0; i <10 ; i++) {
                    int index = random.nextInt(paymentTypes.length);
                    Payment payment = Payment.builder()
                            .date(LocalDate.now())
                            .amount(1000+(int)(Math.random()*20000))
                            .type(paymentTypes[index])
                            .status(PaymentStatus.CREATED)
                            .student(st)
                            .build();
                    paymentRepository.save(payment);
                }
            });
        };
    }

}
