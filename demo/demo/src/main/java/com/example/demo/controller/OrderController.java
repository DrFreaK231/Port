package com.example.demo.controller;

import com.example.demo.Dto.OrderItemDto;
import com.example.demo.IService.IOrderService;

import com.example.demo.model.Item;
import com.example.demo.model.Order;
import com.example.demo.Dto.OrderDto;
import com.example.demo.model.User;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping
    public ResponseEntity<?> createBatchOrder(@RequestBody OrderDto orderRequest) {
        User user = userRepository.findById(orderRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        LocalDateTime timestamp = orderRequest.getTimestamp();
        for (OrderItemDto itemDto : orderRequest.getItems()) {
            Item item = itemRepository.findById(itemDto.getItemId())
                    .orElseThrow(() -> new RuntimeException("Item not found: " + itemDto.getItemId()));
            if(item.getStock() < itemDto.getAmount()) {
                return ResponseEntity.badRequest()
                        .body("Not enough stock for item id " + itemDto.getItemId());
            }
            item.setStock(item.getStock() - itemDto.getAmount());
            itemRepository.save(item);
            Order order = new Order();
            order.setUser(user);
            order.setItem(item);
            order.setTimestamp(timestamp);
            order.setAmount(itemDto.getAmount());
            orderService.createOrder(order);
        }
        return ResponseEntity.ok("Batch order created successfully");
    }
}

