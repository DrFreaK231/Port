package com.example.demo.Dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {
    private Integer userId;
    private LocalDateTime timestamp;
    private List<OrderItemDto> items;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public List<OrderItemDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDto> items) {
        this.items = items;
    }
}

