package com.touilicode.ecommerce.dao;

import com.touilicode.ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {

    //Page<Order> findByCustomerEmail(@RequestParam("email") String email, Pageable pageable);
    //To have orders displayed by DateCreation DESC order ----TRES PUISSANT --------------JPA DATA
    Page<Order> findByCustomerEmailOrderByDateCreatedDesc(@RequestParam("email") String email, Pageable pageable);




}
