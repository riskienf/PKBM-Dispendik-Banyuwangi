import { useMutation } from '@tanstack/react-query'
import * as NavigationBar from 'expo-navigation-bar'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Input from '../../components/Input'
import LoadingModal from '../../components/LoadingModal'
import colors from '../../constants/colors'

import {
  ForgotPassword,
  Home,
  Main,
  RegisterUser,
} from '../../constants/screens'
import { AuthContext } from '../../contexts'
import api from '../../network/api'

export default function LoginScreen({ route, navigation }) {
  const { isAdmin } = route.params
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useContext(AuthContext)

  const mutation = useMutation({
    mutationFn: async (params) => {
      const result = await api.post('/login', params)
      return result
    },
    onSuccess: async (result) => {
      if (result.ok) {
        const tokenData = result.data.data.token
        const roleData = result.data.data.role_id
        api.setHeader('Authorization', `Bearer ${tokenData}`)
        await SecureStore.setItemAsync('token', tokenData)
        await SecureStore.setItemAsync('role', roleData)

        auth.setAuth({ signedIn: true, isAdmin: roleData == 1 ? false : true })

        navigation.replace(Main, { screen: Home })
      } else {
        return Alert.alert(
          'Kesalahan',
          'Terjadi kesalahan saat login, silahkan cek email dan password kembali',
          [{ text: 'OK' }]
        )
      }
    },
  })

  NavigationBar.setBackgroundColorAsync(colors.primary[100])

  return (
    <SafeAreaView className='bg-primary-100 flex-1'>
      <StatusBar backgroundColor='transparent' style='dark' />
      <ScrollView>
        {mutation.error
          ? Alert.alert(
              'Kesalahan',
              'Terjadi kesalahan saat login, silahkan cek email dan password kembali',
              [{ text: 'OK' }]
            )
          : null}

        {mutation.isLoading ? <LoadingModal /> : null}

        <View className='px-5 items-center py-10'>
          <Image
            className='h-40'
            resizeMode='contain'
            source={require('../../assets/images/logo.png')}
          />
          <Text className='text-2xl mt-10 font-Medium'>Masuk dengan akun</Text>
          <View className='overflow-hidden rounded-md p-5 bg-white w-full mt-6'>
            <Input placeholder='E-mail atau username' onChangeText={setEmail} />
            <Input
              placeholder='Kata sandi'
              onChangeText={setPassword}
              className='mt-2'
            />

            <TouchableOpacity
              className='self-end mt-6'
              onPress={() => navigation.navigate(ForgotPassword)}
            >
              <Text className='text-sm font-Medium text-primary-600'>
                Lupa Sandi?
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            className='self-stretch mt-5'
            onPress={() => mutation.mutate({ email, password })}
          >
            Masuk
          </Button>

          {!isAdmin ? (
            <Button
              outline={true}
              className='self-stretch mt-3'
              onPress={() => navigation.navigate(RegisterUser)}
            >
              Daftar
            </Button>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
