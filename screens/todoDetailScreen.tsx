// screens/TodoDetailScreen.tsx
import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  updateTodoTitle,
  updateTodoDescription,
} from "../reducers/todoReducer";
import { RootState } from "../store";

const TodoDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { todoId }: { todoId: number } = route.params as any;

  const todos = useSelector((state: RootState) => state.todos);
  const todo = todos.find((t) => t.id === todoId);

  const [newTitle, setNewTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [isEditing, setIsEditing] = useState(!todo?.description); // Initially set to true if there's no existing description

  const handleUpdateTitle = () => {
    if (newTitle.trim() !== "" && todo) {
      dispatch(updateTodoTitle({ id: todo.id, newTitle }));
    }
    setIsEditing(false);
  };

  const handleTitlePress = () => {
    setIsEditing(true);
  };

  const handleUpdateDescription = () => {
    if (todo) {
      dispatch(
        updateTodoDescription({ id: todo.id, newDescription: description })
      );
    }
    setIsEditing(false);
  };

  const handleDescriptionPress = () => {
    setIsEditing(true);
  };

  const handleConfirmChanges = () => {
    // Add logic to confirm and save changes to the Redux store
    if (isEditing) {
      // If editing, trigger update logic
      if (newTitle.trim() !== "" && todo) {
        dispatch(updateTodoTitle({ id: todo.id, newTitle }));
      }
      if (todo) {
        dispatch(
          updateTodoDescription({ id: todo.id, newDescription: description })
        );
      }
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.title, isEditing && styles.editableTitle]}
        value={newTitle}
        onChangeText={(text) => setNewTitle(text)}
        onFocus={handleTitlePress}
        onBlur={handleUpdateTitle}
      />
      <Text
        style={styles.createdAt}
      >{`Created on: ${new Date(todo?.createdAt).toLocaleString()}`}</Text>
      {todo?.completed && todo?.completedAt && (
        <Text style={styles.completedAt}>{`Completed on: ${new Date(todo.completedAt).toLocaleString()}`}</Text>
      )}
      <TextInput
        style={[
          styles.descriptionInput,
          isEditing && styles.editableDescription,
        ]}
        placeholder="Add description as per your choice..."
        multiline
        value={description}
        onChangeText={(text) => setDescription(text)}
        onFocus={handleDescriptionPress}
        onBlur={handleUpdateDescription}
      />
      {isEditing && (
        <View style={styles.buttonContainer}>
          <Button title="Confirm Changes" onPress={handleConfirmChanges} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  editableTitle: {
    borderBottomWidth: 1,
    borderColor: "#3498db",
    paddingBottom: 5,
  },
  createdAt: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },

  completedAt: {
    fontSize: 14,
    color: '#27ae60', // Green color for Completed at date
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top", // Allow multiline text to start from the top
  },
  editableDescription: {
    borderWidth: 1,
    borderColor: "#3498db",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default TodoDetailScreen;
