import React, { useEffect, useState } from 'react';
import api from '../../Api/AxiosConfig';
import { Box, Text, VStack, useDisclosure, Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/modal';
import dayjs from 'dayjs';
import './MainPage.css';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router';
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface Task {
  id: number;
  nameOfTask: string;
  description: string;
  endDate: string;
}

function MainPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>();
  const { open, onOpen, onClose } = useDisclosure();
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => { 
    api.get('/api/v1/tasks/allTasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleDelete = () => {
    if (!taskToDelete) return;
    
    api.delete(`/api/v1/tasks/deleteTask/${taskToDelete.id}`)
      .then(() => {
        setTasks(tasks?.filter(t => t.id !== taskToDelete.id));
        onClose();
      })
      .catch(err => {
        console.error("Error deleting task:", err);
        alert("Error deleting task. Please try again.");
        onClose();
      });
  };

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
              <Box className="task-actions" gap={2}>
                  <Text onClick={() => {
                    setTaskToDelete(task);
                    onOpen();
                  }} display="flex" justifyContent="flex-end" className='button-delete' >Delete <FaTrashAlt className='icons'/></Text>
                  <Text onClick={() => navigate(`/edit-task/${task.id}`)} display="flex" justifyContent="flex-end" className='button-edit'>Edit <FaPencil className='icons'/></Text>                  
              </Box>
            </Box>
          ))}
      </VStack>
      {tasks && tasks.length === 0 && (
        <Text className="no-tasks">No tasks available. Please add a new task.</Text>
      )}
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay className='blur-overlay'/>
        <ModalContent className='modal-content'>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete "{taskToDelete?.nameOfTask}"?
          </ModalBody>
          <ModalFooter>
            <Button bg="#e2e8f0" color="#4a5568" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button className='button-delete' onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default MainPage;