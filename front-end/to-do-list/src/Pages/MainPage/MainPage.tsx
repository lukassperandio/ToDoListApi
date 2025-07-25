import React, { useEffect, useState } from 'react';
import api from '../../Api/AxiosConfig';
import { Box, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import './MainPage.css';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router';

interface Task {
  id: number;
  nameOfTask: string;
  description: string;
  endDate: string;
}


function MainPage() {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    api.get('/api/v1/tasks/allTasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <Box className="container">
      <Text
        className='add-new-task'
        onClick={() => navigate("/create-task")}
        style={{ cursor: 'pointer' }}
      >Add new Task <IoMdAddCircle className='add-icon'/></Text>
      <VStack mt={4} className="task-list" align="stretch">
        {tasks
          ?.filter(task => dayjs(task.endDate).isValid())
          .map(task => (
            <Box key={task.id} className="task-item">
              <Text className="task-title">{task.nameOfTask}</Text>
              <Text className="task-description">{task.description}</Text>
              <Text className="task-date">
                {dayjs(task.endDate).format('DD/MM/YYYY')}
              </Text>
            </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default MainPage;
