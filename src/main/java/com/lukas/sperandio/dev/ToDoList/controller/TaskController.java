package com.lukas.sperandio.dev.ToDoList.controller;

import com.lukas.sperandio.dev.ToDoList.ToDoListApplication;
import com.lukas.sperandio.dev.ToDoList.models.Task;
import com.lukas.sperandio.dev.ToDoList.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private ToDoListApplication toDoListApplication;

    @Autowired
    private TaskService taskService;

    @CrossOrigin
    @GetMapping("/allTasks")
    public ResponseEntity<List<Task>> getTasks(){
        return new ResponseEntity<List<Task>>(taskService.findAllTasks(), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/addTask")
    public ResponseEntity<Void> addTask(@RequestBody Task task){
        taskService.createTask(task);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> filterTask(@PathVariable Long id){
        return taskService.filterTask(id);
    }

    @CrossOrigin
    @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task){
        Task updatedTask = taskService.editTask(id, task);
        if (updatedTask == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedTask);
    }

}












