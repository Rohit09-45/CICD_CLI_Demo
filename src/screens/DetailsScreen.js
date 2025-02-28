import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Switch} from 'react-native';

function DetailsScreen({route, navigation}) {
  const {item} = route.params;
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Status: </Text>
          <Text
            style={[
              styles.statusValueText,
              {color: isCompleted ? 'green' : 'orange'},
            ]}>
            {isCompleted ? 'Completed' : 'In Progress'}
          </Text>
        </View>

        <View style={styles.toggleContainer}>
          <Text>Mark as completed</Text>
          <Switch
            value={isCompleted}
            onValueChange={setIsCompleted}
            trackColor={{false: '#d3d3d3', true: '#90ee90'}}
          />
        </View>

        <View style={styles.dueContainer}>
          <Text style={styles.dueText}>Due Date: </Text>
          <Text>March 15, 2025</Text>
        </View>

        <View style={styles.priorityContainer}>
          <Text style={styles.priorityText}>Priority: </Text>
          <Text style={styles.priorityValueText}>High</Text>
        </View>
      </View>

      <Button title="Go Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusValueText: {
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  dueContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dueText: {
    fontWeight: 'bold',
  },
  priorityContainer: {
    flexDirection: 'row',
  },
  priorityText: {
    fontWeight: 'bold',
  },
  priorityValueText: {
    color: 'red',
  },
});

export default DetailsScreen;
