import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, PermissionsAndroid, FlatList ,Image} from "react-native";
import { Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';



const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Geolocation Permission',
                message: 'Can we access your location?',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
            console.log('You can use Geolocation');
            return true;
        } else {
            console.log('You cannot use Geolocation');
            return false;
        }
    } catch (err) {
        return false;
    }
};

const Profile = () => {

    const [location, setLocation] = useState(false);
    const [data, setData] = useState([
        {
            id: 1,
            profile: require('../assets/img1.jpg')
        },
        {
            id: 2,
            profile: require('../assets/img2.jpg')
        }, {
            id: 3,
            profile: require('../assets/img3.jpg')
        }

    ])
    const [profile,setProfile]=useState({});


    useEffect(() => {
         getLocation()

        const data = database()
            .ref('/profile').once('value')
            .then(snapshot => {
              console.log('User data: ', snapshot.val());
              setProfile(snapshot.val())
            });

    }, [])


    //function to check permissions and get Location
    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
            console.log('res is:', res);
            if (res) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        setLocation(position);
                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        setLocation(false);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        });
        console.log(location);
    };


    const renderData = ({ item }) => {
        console.log("item data..",item);
        return (
            <Image source={{uri: item.img}} style={{width:'50%',height:150,}}/>
        )
    }

    console.log("profile data..",);
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', borderBottomLeftRadius: 200, borderBottomEndRadius: 200 }}>
                    <Avatar.Image size={90} source={{uri:profile.profile}} style={{ marginStart: 10 }} />
                    <Text style={{ marginTop: 5, fontSize: 18, fontWeight: '700', color: '#000' }}>{profile.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Posts</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{profile.posts}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Followers</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{profile.followers}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Follows</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{profile.follows}</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <MaterialIcons name="photo" size={35} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <MaterialIcons name="bookmark-border" size={35} />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>

                    <FlatList
                        data={profile.post}
                        renderItem={renderData}
                        numColumns={2}

                    />

                </View>


            </View>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    }
})