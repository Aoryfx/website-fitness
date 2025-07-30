import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTask } from '../context/TaskContext';
import { Task } from '../services/database';

export default function TasksScreen() {
  const { tasks, loading, addNewTask, updateExistingTask, deleteExistingTask } = useTask();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'general' as Task['category'],
    priority: 'medium' as Task['priority'],
    calories: '',
    duration: '',
    equipment: '',
  });

  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      Alert.alert('Error', 'Task title is required');
      return;
    }

    try {
      await addNewTask({
        title: newTask.title,
        description: newTask.description,
        category: newTask.category,
        priority: newTask.priority,
        completed: false,
        calories: newTask.calories ? parseInt(newTask.calories) : undefined,
        duration: newTask.duration ? parseInt(newTask.duration) : undefined,
        equipment: newTask.equipment || undefined,
      });

      setNewTask({
        title: '',
        description: '',
        category: 'general',
        priority: 'medium',
        calories: '',
        duration: '',
        equipment: '',
      });
      setShowAddModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to add task');
    }
  };

  const toggleTaskCompletion = async (task: Task) => {
    try {
      await updateExistingTask(task.id, { completed: !task.completed });
    } catch (error) {
      Alert.alert('Error', 'Failed to update task');
    }
  };

  const handleDeleteTask = (task: Task) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExistingTask(task.id);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete task');
            }
          },
        },
      ]
    );
  };

  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'workout': return 'fitness-outline';
      case 'nutrition': return 'restaurant-outline';
      case 'equipment': return 'build-outline';
      default: return 'checkbox-outline';
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'workout': return '#EF4444';
      case 'nutrition': return '#10B981';
      case 'equipment': return '#8B5CF6';
      default: return '#3B82F6';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#DC2626';
      case 'medium': return '#F59E0B';
      case 'low': return '#6B7280';
    }
  };

  const renderTask = ({ item: task }: { item: Task }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => toggleTaskCompletion(task)}
        >
          <Ionicons
            name={task.completed ? 'checkbox' : 'checkbox-outline'}
            size={24}
            color={task.completed ? '#10B981' : '#9CA3AF'}
          />
        </TouchableOpacity>
        
        <View style={styles.taskContent}>
          <Text style={[styles.taskTitle, task.completed && styles.completedTask]}>
            {task.title}
          </Text>
          {task.description && (
            <Text style={[styles.taskDescription, task.completed && styles.completedTask]}>
              {task.description}
            </Text>
          )}
          
          <View style={styles.taskMeta}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(task.category) + '20' }]}>
              <Ionicons
                name={getCategoryIcon(task.category)}
                size={12}
                color={getCategoryColor(task.category)}
              />
              <Text style={[styles.categoryText, { color: getCategoryColor(task.category) }]}>
                {task.category}
              </Text>
            </View>
            
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) + '20' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                {task.priority}
              </Text>
            </View>
            
            {!task.synced && (
              <View style={styles.syncBadge}>
                <Ionicons name="cloud-offline-outline" size={12} color="#F59E0B" />
              </View>
            )}
          </View>
          
          {(task.calories || task.duration) && (
            <View style={styles.taskStats}>
              {task.calories && (
                <Text style={styles.statText}>🔥 {task.calories} cal</Text>
              )}
              {task.duration && (
                <Text style={styles.statText}>⏱️ {task.duration} min</Text>
              )}
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTask(task)}
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalCalories = tasks
    .filter(task => task.completed && task.calories)
    .reduce((sum, task) => sum + (task.calories || 0), 0);

  return (
    <View style={styles.container}>
      {/* Stats Header */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{tasks.length - completedTasks}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalCalories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
      </View>

      {/* Tasks List */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="checkbox-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>Add your first fitness task to get started!</Text>
          </View>
        }
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Task Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Task</Text>
            <TouchableOpacity onPress={handleAddTask}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Task title"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optional)"
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
              multiline
              numberOfLines={3}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Category</Text>
              <View style={styles.pickerOptions}>
                {(['general', 'workout', 'nutrition', 'equipment'] as const).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.pickerOption,
                      newTask.category === category && styles.pickerOptionSelected
                    ]}
                    onPress={() => setNewTask({ ...newTask, category })}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      newTask.category === category && styles.pickerOptionTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Priority</Text>
              <View style={styles.pickerOptions}>
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.pickerOption,
                      newTask.priority === priority && styles.pickerOptionSelected
                    ]}
                    onPress={() => setNewTask({ ...newTask, priority })}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      newTask.priority === priority && styles.pickerOptionTextSelected
                    ]}>
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Calories"
                value={newTask.calories}
                onChangeText={(text) => setNewTask({ ...newTask, calories: text })}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Duration (min)"
                value={newTask.duration}
                onChangeText={(text) => setNewTask({ ...newTask, duration: text })}
                keyboardType="numeric"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Equipment (optional)"
              value={newTask.equipment}
              onChangeText={(text) => setNewTask({ ...newTask, equipment: text })}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  syncBadge: {
    padding: 4,
  },
  taskStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 12,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  cancelText: {
    fontSize: 16,
    color: '#6B7280',
  },
  saveText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  pickerOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    marginBottom: 8,
  },
  pickerOptionSelected: {
    backgroundColor: '#3B82F6',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#374151',
    textTransform: 'capitalize',
  },
  pickerOptionTextSelected: {
    color: '#FFFFFF',
  },
});