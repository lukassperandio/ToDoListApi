import React, { useEffect, useState } from 'react';
import api from '../../Api/AxiosConfig';
import { Box, Text, VStack, useDisclosure, Button, Input } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const { open, onOpen, onClose } = useDisclosure();
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Novo estado para filtro e ordenação
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'closest' | 'farthest' | null>(null);

  useEffect(() => {
    api.get('/api/v1/tasks/allTasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      });
  }, []);

  const handleDelete = () => {
    if (!taskToDelete) return;

    api.delete(`/api/v1/tasks/deleteTask/${taskToDelete.id}`)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== taskToDelete.id));
        onClose();
      })
      .catch(err => {
        console.error("Error deleting task:", err);
        alert("Error deleting task. Please try again.");
        onClose();
      });
  };

  // Filtra por data específica, se selecionada
  const filteredTasks = tasks.filter(task => {
    if (!dayjs(task.endDate).isValid()) return false;

    if (selectedDate) {
      return dayjs(task.endDate).isSame(selectedDate, 'day');
    }
    return true;
  });

  // Ordena as tasks filtradas
  let displayedTasks = [...filteredTasks];
  if (sortBy === 'closest') {
    displayedTasks.sort((a, b) => dayjs(a.endDate).diff(dayjs(b.endDate)));
  } else if (sortBy === 'farthest') {
    displayedTasks.sort((a, b) => dayjs(b.endDate).diff(dayjs(a.endDate)));
  }

  return (
    <Box className="container">
      <Text
        className='add-new-task'
        onClick={() => navigate("/create-task")}
        style={{ cursor: 'pointer' }}
      >
        Add new Task <IoMdAddCircle className='add-icon' />
      </Text>

      <Box mt={4} mb={4} display="flex" alignItems="center" ml="13em" gap={3}>
        <label htmlFor="filter-date" style={{ fontWeight: '600' }}>Filter by date:</label>
        <Input
          id="filter-date"
          maxW="9em"
          type="date"
          value={selectedDate || ''}
          onChange={e => setSelectedDate(e.target.value || null)}
          style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <Button size="sm" onClick={() => setSelectedDate(null)}>Clear filter</Button>
      </Box>

      <Box mb={4} display="flex" ml="13em" gap={3}>
        <Button
          size="sm"
          colorScheme={sortBy === 'closest' ? 'blue' : 'gray'}
          onClick={() => setSortBy('closest')}
        >
          Closer dates
        </Button>
        <Button
          size="sm"
          colorScheme={sortBy === 'farthest' ? 'blue' : 'gray'}
          onClick={() => setSortBy('farthest')}
        >
          Farthest dates
        </Button>
        <Button
          size="sm"
          colorScheme={sortBy === null ? 'blue' : 'gray'}
          onClick={() => setSortBy(null)}
        >
          No Sorting
        </Button>
      </Box>

      <VStack mt={2} className="task-list" align="stretch">
        {displayedTasks.length > 0 ? (
          displayedTasks.map(task => (
            <Box key={task.id} className="task-item">
              <Text className="task-title">{task.nameOfTask}</Text>
              <Text className="task-description">{task.description}</Text>
              <Text className="task-date">
                {dayjs(task.endDate).format('DD/MM/YYYY')}
              </Text>
              <Box className="task-actions" gap={2}>
                <Text
                  onClick={() => {
                    setTaskToDelete(task);
                    onOpen();
                  }}
                  display="flex"
                  justifyContent="flex-end"
                  className='button-delete'
                >
                  Delete <FaTrashAlt className='icons' />
                </Text>
                <Text
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                  display="flex"
                  justifyContent="flex-end"
                  className='button-edit'
                >
                  Edit <FaPencil className='icons' />
                </Text>
              </Box>
            </Box>
          ))
        ) : (
          selectedDate ? (
            <Text className="no-tasks">
              There are no tasks for the day {dayjs(selectedDate).format('DD/MM/YYYY')}.
            </Text>
          ) : (
            <Text className="no-tasks">
              No tasks available. Please add a new task.
            </Text>
          )
        )}
      </VStack>

      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay className='blur-overlay' />
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
