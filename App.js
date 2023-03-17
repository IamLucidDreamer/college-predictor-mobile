import { StatusBar as Status } from 'expo-status-bar';
import { View, BackHandler, Platform, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import store from "./src/store/store"
import { Provider } from 'react-redux';
import Navigation from './src/navigation/Navigation';
import theme from './src/helpers/theme';
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview';
import { useEffect, useRef, useState } from 'react';
import NewUpdatePage from './src/UpdateScreen';
import { server, serverUnauth } from './src/helpers/apiCall';
import { expo } from './app.json'

export default function App() {
  const [updateData, setUpdateData] = useState()
  useEffect(() => {
    updateChecker()
  }, [])

  const updateChecker = () => {
    server.get('/update')
      .then((res) => { setUpdateData(res.data) })
      .catch((err) => { console.log(err); })
  }

  return (
    <Provider store={store}>
      <Status style="dark" />

      {updateData?.version > expo?.android?.versionCode ?
        <NewUpdatePage updateUrl={updateData?.updateUrl} />
        :
        <>
          <Navigation />
          <Toast />
        </>}
    </Provider>
  );
}