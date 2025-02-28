import React, {useState} from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const dummyData = [
  {id: '1', title: 'Complete React Native tutorial', description: 'Learn the basics of React Native', priority: 'high', completed: false},
  {id: '2', title: 'Build a sample app', description: 'Create a working prototype', priority: 'medium', completed: false},
  {id: '3', title: 'Publish to app store', description: 'Prepare for submission to stores', priority: 'low', completed: false},
  {id: '4', title: 'Share with friends', description: 'Get feedback from peers', priority: 'medium', completed: true},
];

const HomeScreen = ({navigation}) => {
  const [tasks, setTasks] = useState(dummyData);
  
  // Get counts for summary cards
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#FF5252';
      case 'medium': return '#FFB142';
      case 'low': return '#2ED573';
      default: return '#70A1FF';
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity 
      style={styles.taskCard}
      onPress={() => navigation.navigate('Details', {item})}
      activeOpacity={0.7}
    >
      <View style={styles.taskHeader}>
        <View style={styles.titleContainer}>
          <View style={[styles.priorityIndicator, {backgroundColor: getPriorityColor(item.priority)}]} />
          <Text style={styles.taskTitle}>{item.title}</Text>
        </View>
        <TouchableOpacity style={styles.checkbox}>
          {item.completed && <Icon name="check" size={16} color="#FFF" />}
        </TouchableOpacity>
      </View>
      
      <Text style={styles.taskDescription}>{item.description}</Text>
      
      <View style={styles.taskFooter}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{item.priority}</Text>
        </View>
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => navigation.navigate('Details', {item})}
        >
          <Text style={styles.detailsButtonText}>Details</Text>
          <Icon name="arrow-right" size={14} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5352ED" />
      
      {/* Header */}
      <LinearGradient colors={['#5352ED', '#7B68EE']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>My Tasks</Text>
            <Text style={styles.headerSubtitle}>You have {pendingTasks} pending tasks</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image 
              source={{uri: 'https://via.placeholder.com/60'}} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, {backgroundColor: '#5352ED'}]}>
          <Icon name="format-list-bulleted" size={24} color="#FFF" />
          <Text style={styles.summaryValue}>{totalTasks}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        
        <View style={[styles.summaryCard, {backgroundColor: '#2ED573'}]}>
          <Icon name="check-circle" size={24} color="#FFF" />
          <Text style={styles.summaryValue}>{completedTasks}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        
        <View style={[styles.summaryCard, {backgroundColor: '#FF5252'}]}>
          <Icon name="clock-outline" size={24} color="#FFF" />
          <Text style={styles.summaryValue}>{pendingTasks}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
      </View>
      
      {/* Tasks List */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Today's Tasks</Text>
          <TouchableOpacity>
            <Text style={styles.sortText}>Sort by</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
      
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  profileButton: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -25,
  },
  summaryCard: {
    width: '30%',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sortText: {
    fontSize: 14,
    color: '#5352ED',
  },
  listContent: {
    paddingBottom: 80,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priorityIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#5352ED',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5352ED',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    backgroundColor: 'rgba(83, 82, 237, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#5352ED',
    textTransform: 'capitalize',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5352ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailsButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginRight: 4,
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    backgroundColor: '#5352ED',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default HomeScreen;