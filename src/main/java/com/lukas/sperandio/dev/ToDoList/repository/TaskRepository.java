package com.lukas.sperandio.dev.ToDoList.repository;

import com.lukas.sperandio.dev.ToDoList.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
