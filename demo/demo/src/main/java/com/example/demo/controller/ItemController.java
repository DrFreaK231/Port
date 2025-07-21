package com.example.demo.controller;

import com.example.demo.Dto.ItemResDto;
import com.example.demo.IService.IItemService;
import com.example.demo.model.Item;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/items")
public class ItemController {
    @Autowired
    private IItemService itemService;

    @GetMapping
    public List<ItemResDto> getAll() {
        List<Item> items = itemService.getAllItems();

        return items.stream().map(item -> {
            ItemResDto dto = new ItemResDto();
            dto.setId(item.getId());
            dto.setStock(item.getStock());
            dto.setRating(item.getRating());
            dto.setName(item.getName());
            dto.setDescription(item.getDescription());
            dto.setPrice(item.getPrice());
            return dto;
        }).collect(Collectors.toList());
    }


    @PostMapping
    public Item create(@RequestBody Item item) {
        return itemService.createItem(item);
    }
}

