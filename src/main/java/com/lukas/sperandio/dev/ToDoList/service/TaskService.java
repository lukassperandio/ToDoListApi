package com.lukas.sperandio.dev.ToDoList.service;

import com.lukas.sperandio.dev.ToDoList.models.Task;
import com.lukas.sperandio.dev.ToDoList.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public ResponseEntity<Task> filterTask(Long id){
        Optional<Task> task = taskRepository.findById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Task editTask(Long id, Task task) {
        return taskRepository.findById(id)
                .map(existingTask -> {
                    existingTask.setNameOfTask(task.getNameOfTask());
                    existingTask.setDescription(task.getDescription());
                    existingTask.setEndDate(task.getEndDate());
                    return taskRepository.save(existingTask);
                }).orElse(null);  // Ou lançar exceção, conforme tua escolha
    }

}
