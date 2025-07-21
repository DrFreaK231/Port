package com.example.demo.IService;


import com.example.demo.model.Item;

import java.util.List;

public interface IItemService {
    List<Item> getAllItems();
    Item createItem(Item item);

}