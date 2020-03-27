import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { locationDetailQuery } from '../../../apollo/server/QueryTags';
import { format } from 'date-fns';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Map from '../../../components/Map';

const EmployeeDetail = ({ route }) => {
  const { name, locationId, date } = route.params;

  const { error, loading, data } = useQuery(locationDetailQuery, { variables: { locationId: locationId } });

  let map;
  let time;
  if (loading === false) {
    console.log(data);
    const location = {
      latitude: parseFloat(data.locationDetail.latitude),
      longitude: parseFloat(data.locationDetail.longitude),
    }
    map = (<Map employeeLocation={location} />);

    const dateObject = new Date(parseInt(data.locationDetail.timestamp));
    time = format(dateObject, 'h:mm a');
  }

  /**
   * date
   * latitude
   * longitude
   * timestamp
   * type
   */

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Details for: {name}</Text>
      <Text>Location Details for {name} on {date} at {time}</Text>
      {map}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2c9c5',
  },
  header: {
    fontSize: 30,
    color: '#c0392b',
    fontWeight: '100',
    marginVertical: 15,
  },
  listTitle: {
    color: 'white',
    fontWeight: '100',
    fontSize: 20,
  },
  listItem: {
    backgroundColor: '#c0392b',
    borderBottomColor: 'white',
    borderBottomWidth: .5,
    borderStyle: 'solid',
  },
});

export default EmployeeDetail;