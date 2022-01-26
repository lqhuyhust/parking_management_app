import React, {useEffect, useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {useAuth} from "../../contexts/Auth";
import tw from "twrnc";
import {Button, Card, IconButton, List, Modal, Portal, Text, Title} from "react-native-paper";
import {getGuestInfo} from "../../api";
import {useUserDataContext} from "../../contexts/User";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ParkingHistory from "./ParkingHistory";
import EditForm from './EditForm'
import Toast from '../../components/Toast'
import ChangePasswordForm from "./ChangePasswordForm";

export default function UserProfile({navigation}) {
  const auth = useAuth();
  const {userData, setUserData} = useUserDataContext();
  const [editModal, setEditModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getGuestInfo(auth?.authData?.username);
      if (data) {
        setUserData?.(data);
      }
    } catch (e) {
      console.log({e});
    }
  }

  useEffect(() => {
    (async () => {
      await fetchData();
    })()
  }, []);

  const onSuccess = async () => {
    await fetchData();
    setEditModal(false);
    setChangePasswordModal(false);
    setToastVisible(true);
  }

  return (
    <KeyboardAwareScrollView>
      <View style={tw`flex flex-1 items-center`}>
        <Card style={tw`w-full`}>
          <Card.Cover
            source={{uri: 'https://picsum.photos/700'}}/>
          <Card.Content style={tw`justify-center items-center`}>
            <Title style={tw`text-green-700 font-bold`}>{userData?.first_name} {userData?.last_name}</Title>
            <Text>{userData?.email}</Text>
            <IconButton icon="pencil" style={tw`absolute right-0 top-0`} onPress={() => setEditModal?.(true)}/>
          </Card.Content>
        </Card>
        <List.Section style={tw`w-full`}>
          <List.Accordion
            title="Parking history"
            left={props => <List.Icon {...props} icon="car"/>}
          >
            <ParkingHistory navigation={navigation}/>
          </List.Accordion>
        </List.Section>
        <TouchableOpacity
          style={tw`text-lg w-10/12 h-10 flex items-center justify-center`}
          onPress={() => setChangePasswordModal?.(true)}
        >
          <Text style={tw`text-green-700 font-bold`}>Change password</Text>
        </TouchableOpacity>
        <Button onPress={() => auth.signOut()}>Sign out</Button>
      </View>
      <Portal>
        <Modal
          contentContainerStyle={tw`bg-white w-10/12 py-10 px-5 m-auto`}
          visible={editModal}
          onDismiss={() => setEditModal?.(false)}
        >
          <EditForm userInfo={userData} onSuccess={onSuccess}/>
        </Modal>
        <Modal
          contentContainerStyle={tw`bg-white w-10/12 py-10 px-5 m-auto`}
          visible={changePasswordModal}
          onDismiss={() => setChangePasswordModal?.(false)}
        >
          <ChangePasswordForm userInfo={userData} onSuccess={onSuccess}/>
        </Modal>
      </Portal>
      <Toast
        visible={toastVisible}
        setVisible={setToastVisible}
        content="Updated successfully!"
        style='absolute bottom-0'
      />
    </KeyboardAwareScrollView>
  )
}
