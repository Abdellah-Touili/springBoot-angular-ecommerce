package com.touilicode.ecommerce.dao;

import com.touilicode.ecommerce.entity.Country;
import org.apache.catalina.Session;
import org.apache.catalina.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.List;

//NOW, WE DON'T NEED @CrossOrigin, BECAUSE WE USED 'CORS' IN 'MYDATARESTCONFIG' (CONFIG DIRECTORY)
//@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
//@RepositoryRestResource
public interface CountryRepository extends JpaRepository<Country, Integer> {
    // @Query("select p from Product p where p.name LIKE CONCAT('%',:searchword,'%')")
    @Query(value = "select c.name from Country c")
    List<String> findByName();

    @PostMapping(path = "/create")
    public default void createCountry(@RequestBody() Country country) throws IOException {
        Store countryRepository = null;
        countryRepository.save((Session) country);
    }
}



