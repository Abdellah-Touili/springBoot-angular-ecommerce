package com.touilicode.ecommerce.dao;

import com.touilicode.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// ON NE VEUT PAS EXPOSER CE REPOSITORY (REST-API) : DONC ON NE MET PAS l'AANOTATION
@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
// voir 'application.properties : spring.data.rest.detection-strategy=ANNOTATED !!!!!!!

public interface CustomerRepository extends JpaRepository<Customer, Long> {

   Customer findByEmail(String theEmail);

    //Page<Customer> findCustomerByEmail(@RequestParam("email") String email, Pageable pageable);
    //Customer findCustomerByEmail(@RequestParam("email") String email);
}

