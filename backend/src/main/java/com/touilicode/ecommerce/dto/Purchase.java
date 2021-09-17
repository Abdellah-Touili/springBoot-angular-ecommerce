package com.touilicode.ecommerce.dto;

import com.touilicode.ecommerce.entity.Address;
import com.touilicode.ecommerce.entity.Customer;
import com.touilicode.ecommerce.entity.Order;
import com.touilicode.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
