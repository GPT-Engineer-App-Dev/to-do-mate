import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, VStack, HStack, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (editIndex === -1) {
      setTodos([...todos, inputValue]);
      toast({
        title: "Todo added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      const newTodos = [...todos];
      newTodos[editIndex] = inputValue;
      setTodos(newTodos);
      setEditIndex(-1);
      toast({
        title: "Todo updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    setInputValue("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    toast({
      title: "Todo deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={8} width="100%" mt={16}>
        <Heading>Todo App</Heading>
        <HStack width="100%">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a new todo"
            size="lg"
          />
          <Button onClick={handleAddTodo} colorScheme="blue" size="lg">
            {editIndex === -1 ? "Add" : "Update"}
          </Button>
        </HStack>
        <VStack width="100%" align="stretch">
          {todos.map((todo, index) => (
            <Box
              key={index}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>{todo}</Text>
              <HStack>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => handleEditTodo(index)}
                  aria-label="Edit todo"
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTodo(index)}
                  aria-label="Delete todo"
                />
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;