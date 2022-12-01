import { View, Text, FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '1',
    title: 'Third Item',
  },
  {
    id: '2',
    title: 'Third Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Third Item',
  },
  {
    id: '5',
    title: 'Third Item',
  },
]

export default function NotificationListScreen() {
  const tabBarHeight = useBottomTabBarHeight()
  return (
    <SafeAreaView style={{ paddingBottom: tabBarHeight }}>
      <Header />

      <FlatList
        data={DATA}
        ListHeaderComponent={() => (
          <Text className='text-3xl font-Bold px-4 mt-6 mb-2'>Notifikasi</Text>
        )}
        progressViewOffset={50}
        refreshing={false}
        onRefresh={() => {}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='bg-primary-100 mx-4 my-3 rounded-lg'>
            <Pressable
              className='px-4 py-5'
              android_ripple={{ borderless: true }}
              onPress={() => {}}
            >
              <View className='flex-row'>
                <Image
                  className='w-12 h-12 mr-5'
                  source={require('../../assets/images/logo.png')}
                />

                <View className='justify-between'>
                  <Text className='text-lg text-primary-700 font-SemiBold'>
                    Lembaga
                  </Text>
                  <Text className='text-sm font-Regular text-gray-400'>
                    dd/mm/yyyy 12:00 WIB
                  </Text>
                </View>
              </View>

              <Text className='mt-5 text-base font-Regular'>Nama kegiatan</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  )
}
