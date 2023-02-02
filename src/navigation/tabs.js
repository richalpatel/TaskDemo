import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from 'react-native';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab=createBottomTabNavigator();

const CustomTabbarButton=({children,onPress})=>(
    <TouchableOpacity style={{
        top:-30,
        justifyContent:'center',
        alignItems:'center'
    }}
    onPress={onPress}>
        <View style={{
            width:70,
            height:70,
            borderRadius:35,
            backgroundColor:'red'
        }}>
{children}
        </View>
    </TouchableOpacity>
)



const Tabs=()=>{
    return(
        <Tab.Navigator 
        
        screenOptions={{
            tabBarShowLabel:false,
            headerShown:false,
            tabBarStyle:{
                position:'absolute',
                elevation:0,
                backgroundColor:'#fff',
                height:90
            }
        }}>
            <Tab.Screen name='Home' component={Home} options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <MaterialCommunityIcons name='home-outline' size={25} color={focused ? '#32a852' : '#000'} />
                    </View>
                )
            }}/>
            <Tab.Screen name='message' component={Home} options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <MaterialCommunityIcons name='message-outline' size={25} color={focused ? '#32a852' : '#000'}/>
                    </View>
                ),
               
            }} />
            <Tab.Screen name='post' component={Home} options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <MaterialCommunityIcons name='plus' size={28} color={focused ? '#32a852' : '#000'} />
                    </View>
                ),
                tabBarButton:(props)=>(
                    <CustomTabbarButton {...props} />
                )


            }} />
            <Tab.Screen name='like' component={Home} options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <MaterialCommunityIcons name='cards-heart-outline' size={25} color={focused ? '#32a852' : '#000'} />
                    </View>
                )

            }} />
            <Tab.Screen name='Profile' component={Profile} 
                options={{
                    tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Ionicons name='md-person-circle' size={25} color={focused ? '#32a852' : '#000'}/>
                    </View>
                )
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;