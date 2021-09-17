package com.touilicode.ecommerce.dao;

import com.touilicode.ecommerce.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;


//NOW, WE DON'T NEED @CrossOrigin, BECAUSE WE USED 'CORS' IN 'MYDATARESTCONFIG' (CONFIG DIRECTORY)
//@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel ="productCategory", path ="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
   // @GetMapping(value = "/categories")
   // List<ProductCategory> findAll();

   // @GetMapping(value = "/theCategory")
    Page<ProductCategory> findById(@RequestParam("id") Long id, Pageable pageable);

}
