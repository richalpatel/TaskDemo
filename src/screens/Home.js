import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, PixelRatio, ImageBackground } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import database from '@react-native-firebase/database';


var userDATA=[];

const Home = () => {

    
    const [feedData, setFeedData] = useState([])
    const [userData, setUserData] = useState(
        [{"profile":"https://firebasestorage.googleapis.com/v0/b/taskdemo-7051f.appspot.com/o/p1.jpg?alt=media&token=df239b8a-54a4-4bfa-92b2-b049589b9ce2","posts":35,"post":
        {"save":"1.1k","desc":"heyy","msg":"2.2k","profileimg":"https://firebasestorage.googleapis.com/v0/b/taskdemo-7051f.appspot.com/o/img2.jpg?alt=media&token=7798712a-fd49-4e91-8a7e-b9f0fc38913a","like":"2.1k","date":"2 hrs"},
        "id":1,"name":"John Deo","follows":135,"followers":224}
    ]
    )
       
        useEffect(() => {
         // onValueChange()
        //return () => database().ref('/users').off('value', onValueChange);
        const data=  database()
        .ref('/users').orderByChild('/id')
        .on("value", function (snapshot) {
               console.log("data.......",JSON.stringify(snapshot) );
            //userDATA=snapshot;
           // setUserData(snapshot)
          // setFeedData(snapshot)
        })
       
    }, [userData])


    const onValueChange =async ()=>{
       const data=  database()
        .ref('/users').orderByChild('/id')
        .on("value", function (snapshot) {
              // console.log("data.......",JSON.stringify(snapshot) );
            //userDATA=snapshot;
            setUserData(snapshot)
        })
        

    }

    const feedRenderItem = ( {item} ) => {

        console.log("data....123",item);
        return (
            <Avatar.Image size={70} source={{uri:item.profile}} style={{ marginStart: 10 }} />
        )
    }


    const postRenderItem = ({ item }) => {
        return (

            <ImageBackground style={styles.imgback}
                source={{uri:item.post.profileimg}} resizeMode='cover'>

                <View style={{ margin: 10, flexDirection: 'row' }}>
                    <Avatar.Image size={40} source={{uri:item.profile}} />
                    <View style={{ margin: 2, width: '78%' }}>
                        <Text style={{ fontSize: 12 / PixelRatio.getFontScale(), color: '#fff' }}>{item.name}</Text>
                        <Text style={{ fontSize: 12 / PixelRatio.getFontScale(), color: '#f2f2f2' }}>{item.post.date} ago</Text>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name="dots-vertical" size={25} color='#fff' />
                    </View>
                </View>

                <View style={styles.imgbackbtm}>
                    <View style={styles.imgdata}>
                        <View style={styles.imgstyle}>
                            <MaterialCommunityIcons name='cards-heart-outline' size={20} color={'#fff'} />
                            <Text style={{ color: '#fff' }}>{item.post.like}</Text>

                        </View>

                    </View>
                    <View style={styles.imgdata}>
                        <View style={styles.imgstyle}>
                            <MaterialCommunityIcons name='message-outline' size={20} color={'#fff'} />
                            <Text style={{ color: '#fff' }}>{item.post.msg}</Text>

                        </View>

                    </View>
                    <View style={styles.imgdata}>
                        <View style={styles.imgstyle}>
                            <MaterialCommunityIcons name='bookmark-outline' size={20} color={'#fff'} />
                            <Text style={{ color: '#fff' }}>{item.post.save}</Text>

                        </View>

                    </View>
                </View>

            </ImageBackground>

        )
    }


  // console.log("user data...",userData);

    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.sociallytext}>Socially</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <MaterialCommunityIcons name='home-outline' size={28} color='#000' />
                </View>
            </View>


            <View style={styles.feedContainer}>
                <Text style={[styles.sociallytext, { fontSize: 18, fontWeight: '700' }]}>Feed</Text>
            </View>

            <View style={{ marginTop: 15, flexDirection: 'row', }}>

                <TouchableOpacity style={styles.feedaddbtn}>
                    <MaterialCommunityIcons name='plus' size={35} color={'#fff'} />
                </TouchableOpacity>

                <View style={{ marginStart: 10 }}>
                    <FlatList
                        data={userData}
                        renderItem={feedRenderItem}
                        keyExtractor={item => item.id}
                        horizontal
                    />
                    
                </View>
            </View>


            <View style={{}}>

                <FlatList
                    data={userData}
                    renderItem={postRenderItem}
                    keyExtractor={item => item.id}
 />
            </View>



        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        margin: 10,
        paddingLeft: 16,
        paddingRight: 16

        // justifyContent:'center'
    },
    nameContainer: {
        flexDirection: 'row',
        padding: 16,

    },
    sociallytext: {
        fontSize: 20 / PixelRatio.getFontScale(),
        fontWeight: 'bold',
        color: '#000'
    },
    feedContainer: {
        marginTop: 10,
        //   paddingLeft: 16
    },
    feedaddbtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#d7d7d9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgback: {
        marginTop: 30,
        height: 220,
        backgroundColor: 'green'
    },
    imgbackbtm: {
        flex: 1, height: 30, bottom: 10, position: 'absolute', left: 0, right: 0, flexDirection: 'row'
    },
    imgdata: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
    imgstyle: {
        backgroundColor: 'red', borderRadius: 15, flexDirection: 'row', padding: 4
    }

})