import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { COLORS } from "../utils/colors";
import { useState } from "react";
import { TextInput } from "react-native";
import { apiClient } from "../utils/api";

export default function AddPostScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    try {
      const response = await apiClient.post("/posts", { title, content });
      console.log("Post created:", response.data);
      setContent("");
      setTitle("");
      Alert.alert("Success", "Post submitted successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to submit post");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Post</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter post title"
            placeholderTextColor={COLORS.textSecondary}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Write your post content here..."
            placeholderTextColor={COLORS.textSecondary}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 28,
    marginTop: 12,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: "#f9f9f9",
  },
  contentInput: {
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: "#f9f9f9",
    minHeight: 150,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});