import { Box, Button, Input, Text } from "@chakra-ui/react";
import './CreateTask.css';
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../Api/AxiosConfig'; 
import { FaArrowCircleLeft } from "react-icons/fa";

export default function CreateTaskPage() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const navigate = useNavigate();

  const handleCreateTask = () => {
    if (!taskName.trim() || !description.trim() || !dueDate) {
      alert("Fill in all fields before creating the task.");
      return;
    }

    api.post("/api/v1/tasks/addTask", {
      nameOfTask: taskName,
      description,
      endDate: dueDate
    })
    .then(() => {
      navigate('/');
    })
    .catch(err => {
      console.error("Error creating task:", err);
      alert("Error creating task. Please try again.");
    });
  };

  return (
    <Box className="page-container">
      <Box className="back-button" onClick={() => navigate('/')}>
        <FaArrowCircleLeft size={28} />
      </Box>

      <Box className="inputs-container">
        <Text fontSize="xl" fontWeight="bold">Create a new task</Text>

        <Input
          placeholder="Task Name"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <Input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          placeholder="Due Date"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <Box display="flex" justifyContent="flex-end">
          <Button
            className="create-task-button"
            bg="green"
            mt={4}
            onClick={handleCreateTask}
          >
            Create Task <LuPlus />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
