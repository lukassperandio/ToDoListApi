import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/AxiosConfig";
import { FaArrowCircleLeft } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { MdSave } from "react-icons/md";

function EditTask() {
  const { taskId } = useParams();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [originalTaskName, setOriginalTaskName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/v1/tasks/${taskId}`)
      .then((response) => {
        const task = response.data;
        setTaskName(task.nameOfTask);
        setOriginalTaskName(task.nameOfTask);
        setDescription(task.description);
        setDueDate(task.endDate?.slice(0, 10));
      })
      .catch((error) => {
        console.error("Error when searching for a task:", error);
      });
  }, [taskId]);


  const handleTaskEdit = () => {
    api.put(`/api/v1/tasks/editTask/${taskId}`, {
      nameOfTask: taskName,
      description: description,
      endDate: dueDate
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error when editing task:", error);
      });
  }

  return (
    <Box className="page-container">
      <Box className="back-button" onClick={() => navigate('/')}>
        <FaArrowCircleLeft size={28} />
      </Box>

      <Box className="inputs-container">
        <Text fontSize="xl" fontWeight="bold">Edit Task {originalTaskName}</Text>

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
            bg="#e2e8f0"
            color="#4a5568"
            mt={4}
            onClick={handleTaskEdit}
          >
            Edit Task <MdSave />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditTask;
