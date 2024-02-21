import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { categories as Categories } from '../Data/dataArray'
import { getNumberOfRecipes } from '../Data/MockDataApi'
import { Searchbar } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

const HomeScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <SafeAreaView >
            <ScrollView className='p-3'>
                <View className='p-2 pb-5 pt-7'>
                    <Text className='text-5xl font-bold text-slate-700'>Recipe</Text>
                </View>
                <Searchbar className='mb-5'
                    placeholder="Search recipies..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <View className='pb-8'>
                    {Categories?.map((e, i) => {
                        const NumberOfRecipes = getNumberOfRecipes(e.id);
                        return <TouchableWithoutFeedback
                            key={i} onPress={() => {
                                navigation.navigate('DetailPageCategory', { "CategoryId": e.id, "CategoryName": e.name })
                                Haptics.selectionAsync()
                            }}
                        >
                            <View className='flex p-1 relative'>
                                <Image
                                    source={{ uri: e.photo_url }}
                                    width={140} height={140}
                                    className='w-full rounded-lg'
                                    blurRadius={1}
                                />
                                <Text className='absolute bottom-5 left-5 font-extrabold text-xl  text-gray-100 text-center'>{e.name} ({NumberOfRecipes}) </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen