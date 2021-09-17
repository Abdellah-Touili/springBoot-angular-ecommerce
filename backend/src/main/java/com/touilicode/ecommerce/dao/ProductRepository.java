package com.touilicode.ecommerce.dao;

import com.touilicode.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

//NOW, WE DON'T NEED @CrossOrigin, BECAUSE WE USED 'CORS' IN 'MYDATARESTCONFIG' (CONFIG DIRECTORY)
//@CrossOrigin("http://localhost:4200")

//WE MUST USE '@RepositoryRestResource' ANNOTATION TO BE ABLE TO EXPOSE THIS REPOSITORY (VOIRE 'application.properties' file...Annotation)
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product,Long> {

    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

    // @Query("select p from Product p where p.name LIKE CONCAT('%',:searchword,'%')")
    @Query(value = "select * from product p, product_category pc where p.name LIKE CONCAT('%',?1,'%') and pc.id = ?2 " +
            "and p.category_id=pc.id",nativeQuery = true)
    Page<Product> findProductByKeyWordAndCategoryId(String name, Long idCategory, Pageable pageable);

    /*
     @Query(value = "select p from Product p where p.id=8")
    Page<Product> findUserByNameLikeAndCategoryId(Long category_id, Pageable pageable);
    Page<Product> findUserByNameLikeAndCategoryId(Pageable pageable);
    @Query("select p from Product p where p.name like '%searchword%' and p.category ='idCategory'")
     List<Product> findUserByNameLikeAndCategoryId(@Param("searchword") String searchword, @Param("idCategory") Long idCategory);
    */

}

