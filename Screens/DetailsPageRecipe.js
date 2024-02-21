import React from 'react'
import { Divider } from 'react-native-paper';
import { ScrollView, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { List } from 'react-native-paper';
import { Modal, Portal, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getIngredientName, getRecipesByRecipeName } from '../Data/MockDataApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const DetailsPageRecipe = ({ route, navigation }) => {
    const { recipeName } = route.params;
    const recipe = getRecipesByRecipeName(recipeName);

    const [visible, setVisible] = React.useState(false);
    const [PhotoArray, setPhotoArray] = React.useState([]);
    const showModal = (e) => {
        setPhotoArray(e.photosArray)
        setVisible(true);
    }
    const hideModal = () => setVisible(false);
    const containerStyle = { margin: 5, backgroundColor: 'white', borderRadius: 20, overflow: 'hidden' };

    // console.log(recipe);
    return (
        <SafeAreaView>
            <ScrollView>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
                        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
                            <View className='flex flex-row items-center justify-around p-2'>
                                <Text className='text-2xl py-3 p1-2 text-slate-500'>{recipeName} </Text>
                                <TouchableOpacity onPress={hideModal} className='bg-slate-200 p-2 rounded-full'>
                                    <AntDesign name="close" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            {PhotoArray?.map((value, i) => {
                                return <Image key={i} source={{ uri: value }} className='w-full h-[250px] my-1' />
                            })}
                        </ScrollView>
                    </Modal>
                </Portal>

                <View className='p-1'>
                    {recipe?.map((e, i) => {
                        return <View key={i} >
                            <Text className='text-2xl p-2'>{e.title}</Text>


                            <Animated.Image source={{ uri: e.photo_url }} className='w-full h-[250px] rounded-md' sharedTransitionTag="recipeImage" />

                            <View className='flex flex-row items-center justify-between'>
                                <View className='p-2 flex flex-row gap-2 items-center'>
                                    <MaterialCommunityIcons name="timer-outline" size={24} color="black" />
                                    <Text>{e.time} min</Text>
                                </View>
                                <Button onPress={() => { showModal(e) }}>Show more Images</Button>
                            </View>


                            <List.Accordion
                                title="Ingredient used"
                                left={props => <List.Icon {...props} icon="food" />}>
                                {e?.ingredients.map((e, i) => {
                                    const IngredientName = getIngredientName(e[0])
                                    return <View key={i}
                                        onPress={() => console.log('Pressed')} className='m-1 py-2'>
                                        <Text>{IngredientName} - {e[1]}</Text>
                                    </View>
                                })}
                            </List.Accordion>
                            <View className='p-2 bg-white'>
                                <Text >{e.description}</Text>
                            </View>
                        </View>
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailsPageRecipe