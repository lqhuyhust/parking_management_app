import * as React from 'react';
import {useEffect, useState} from 'react';
import {Chip, DataTable, Text} from 'react-native-paper';
import {getAllParkingRecords} from "../../api";
import {useAuth} from "../../contexts/Auth";
import tw from "twrnc";

const optionsPerPage = [2, 3, 4];

const bgChip = (status) => {
  if (status === 'Completed') return 'bg-gray-300';
  if (status === 'Pending') return 'bg-yellow-700';
  if (status === 'Booked') return 'bg-green-700';
}

const textChip = (status) => {
  if (status === 'Completed') return '';
  if (status === 'Pending') return 'text-white';
  if (status === 'Booked') return 'text-white';
}

const ParkingHistory = ({navigation}) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [parkingRecords, setParkingRecords] = useState([]);
  const {authData} = useAuth();
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllParkingRecords(authData.username);
        if (res) {
          setParkingRecords(res);
        }
      } catch (e) {
        console.log(e);
      }
    })()
  }, [])
  const handlePress = () => {
    navigation.navigate('Booking Result', parkingRecords?.[0]);
  }

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Car Park</DataTable.Title>
        <DataTable.Title>Parking Slot</DataTable.Title>
        <DataTable.Title>Fee</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
      </DataTable.Header>

      {parkingRecords.map((e) => (
        <DataTable.Row key={e.id} onPress={handlePress}>
          <DataTable.Cell>{e.car_park}</DataTable.Cell>
          <DataTable.Cell>{e.parking_slot}</DataTable.Cell>
          <DataTable.Cell numeric="">{e.fee}</DataTable.Cell>
          <DataTable.Cell>
            <Chip style={tw.style(bgChip(e.status))}>
              <Text style={tw.style(textChip(e.status))}>{e.status} </Text>
            </Chip>
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  );
}

export default ParkingHistory;
