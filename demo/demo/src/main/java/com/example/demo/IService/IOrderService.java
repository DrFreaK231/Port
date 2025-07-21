package com.example.demo.IService;

import com.example.demo.model.Order;

import java.util.List;

public interface IOrderService {
    List<Order> getAllOrders();
    Order createOrder(Order order);

}