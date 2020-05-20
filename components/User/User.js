// Import dependencies
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from "react"
import { View, Alert, TouchableOpacity, FlatList,TextInput } from "react-native"
import { Button, Divider, Input, Text, Avatar, Icon, Card, AirbnbRating } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'

const AuthContext = React.createContext();
const Stack = createStackNavigator();
const REQUEST_URL = 'http://10.0.2.2:14816/api/Users/'
const REQUEST_COMMENT_URL = 'http://10.0.2.2:14816/api/Comments/userid/'
const REQUEST_EDIT_COMMENT_URL = 'http://10.0.2.2:14816/api/Comments'
const POST_URL = 'http://10.0.2.2:14816/api/Users'
const REQUEST_MUSEUMINFO_URL ='http://10.0.2.2:14816/api/maintables/'

function UserControl({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            usertoken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            usertoken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            usertoken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      usertoken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let usertoken
      usertoken = await AsyncStorage.getItem('usertoken')
      let str
      str = await AsyncStorage.getItem('userid')
      if(str!=null){
        let url = REQUEST_URL+str
        let response = await fetch(url)
        let json = await response.json()
        if(json['userpwd']!=usertoken){
          usertoken = null
          Alert.alert('Password Changed, Sign Out.')
        }
      }
      dispatch({ type: 'RESTORE_TOKEN', token: usertoken })
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        let url = REQUEST_URL+data.userid
        let response = await fetch(url)
        let json = await response.json()
        if(json['userid']==null){
          Alert.alert("Account not exist, please SignUp.")
        }
        else{
          if(json['userpwd']!=data.password)Alert.alert('Wrong Password.')
          else{
            await AsyncStorage.setItem('usertoken',json['userpwd'])
            await AsyncStorage.setItem('userid',json['userid'])
            await AsyncStorage.setItem('coright',json['coright'])
            dispatch({ type: 'SIGN_IN', token: json['userpwd'] })
          }
        }
      },
      signUp: async data => {
        const op = async () => {
          await fetch(POST_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "userid": data.userid,
              "nickname": data.userid,
              "userpwd": data.password,
              "coright": 1
            }),
          });
          await AsyncStorage.setItem('usertoken',data.password)
          await AsyncStorage.setItem('userid',data.userid )
          await AsyncStorage.setItem('coright','1')
          dispatch({ type: 'SIGN_IN', token: data.password })
        }

        let url = REQUEST_URL+data.userid
        let response = await fetch(url)
        let json = await response.json()
        if(json['userid']!=null){
          Alert.alert('Account already exists, please Sign In.')
        }
        else{
          Alert.alert(
            'You will Sign Up',
            'userid: '+data.userid,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => op() },
            ],
            { cancelable: false }
          )
        }

      },
      signOut: async () => {
        await AsyncStorage.removeItem('usertoken')
        await AsyncStorage.removeItem('userid')
        dispatch({ type: 'SIGN_OUT' })
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        headerMode='none'
      >
        {state.usertoken == null ? (
          <Stack.Screen name="Welcome" component={SignInScreen} />
        ) : (
          <Stack.Screen name="Home" component={UserHomeStackScreen} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}


function SignInScreen() {
  const [userid, setuserid] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn, signUp } = React.useContext(AuthContext);

  return (
    <View  style={{ flex: 1, justifyContent: 'center', width: '80%', left: '10%' }}>
      <View style={{alignItems: 'center', paddingBottom: '20%'}}>
      <Text h1>WELCOME</Text>
      </View>
      <Input
        leftIcon={{ type: 'octicon', name: 'person' }}
        leftIconContainerStyle={{left:0,paddingRight:10 }}
        placeholder="用户名"
        value={userid}
        onChangeText={setuserid}
      />
      <Input 
        leftIcon={{ type: 'octicon', name: 'key' }}
        leftIconContainerStyle={{left:0,paddingRight:8 }}
        containerStyle={{ paddingBottom: 100 }}
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="登录" onPress={() => signIn({ userid, password })} containerStyle={{ paddingBottom: 10 }} />
      <Button title="注册" onPress={() => signUp({ userid, password })} />

    </View>
  );
}

function UserHomeStackScreen({navigation,route}){
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='HomeScreen'
    >
      <Stack.Screen name="HomeScreen" component={ HomeScreen } navigation={navigation} route={route} />
      <Stack.Screen name="UserInfoScreen" component={ UserInfoScreen } navigation={navigation} route={route} />
      <Stack.Screen name="CommentListScreen" component={ CommentListScreen } navigation={navigation} route={route} />
      <Stack.Screen name="CommentEditScreen" component={ CommentEditScreen } navigation={navigation} route={route} />
    </Stack.Navigator>
  );
}

function HomeScreen({navigation,route}) {
  
  const initialState = { userid: '' }
  
  function reducer(state, action) {
    switch (action.type) {
      case 'GET_userid':
        return {
          userid: action.id,
        };
    }
  }
  
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let str = ''
      str = await AsyncStorage.getItem('userid')
      dispatch({ type: 'GET_userid', id: str })
    };
    bootstrapAsync();
  }, []);
  
  const { signOut }=React.useContext(AuthContext)

  return(
    <View>
        <View style={{justifyContent: 'center', height: '40%',backgroundColor:'white'}}>
          <TouchableOpacity style={{ left: '10%',flexDirection: 'row',alignItems:'center'}}
                            onPress={() => navigation.navigate('UserInfoScreen')}
                          >
            <View style={{ left: '5%',flexDirection: 'row',alignItems:'center'}}>
              <Avatar
                size="large"
                title={state.userid[0]}
                rounded
                containerStyle={{marginRight:20}}
            />
            <Text h3>{state.userid}</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{height: '1%'}}></View>
        <View style={{height: '40%'}}>
          <TouchableOpacity style={{ paddingleft: '10%',flexDirection: 'row',alignItems:'center',height:'30%',backgroundColor:'white'}}
                            onPress={() => navigation.navigate('CommentListScreen')}
                          >
            <View style={{  left: '12%',flexDirection: 'row',alignItems:'center',}}>
              <Icon
                name='comment-discussion' 
                type='octicon'
                containerStyle={{marginRight:20}}
                size={30}
              />
              <Text style={{fontSize:20}}>已发表评论</Text>
              <Icon
                name='chevron-right'
                containerStyle={{flex:1,float:'right',left:'75%'}}
              />
            </View>
          </TouchableOpacity>
        </View>
             
        <View style={{width: '80%', left: '10%' }}>
          <Button title="注销" onPress={() => signOut()} buttonStyle={{backgroundColor: '#a61b29'}}/>
        </View>
        
    </View>
  )
}

function UserInfoScreen({navigation,route}){
  const initialState = { userid: '',nickname: '' }
  
  function reducer( state, action ) {
    switch (action.type) {
      case 'CHANGE':
        return {
          userid: action.userid,
          nickname: action.nickname,
        };
    }
  }
  
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let str = ''
      str = await AsyncStorage.getItem('userid')
      let url = REQUEST_URL+str
      let response = await fetch(url)
      let json = await response.json()
      dispatch({ type: 'CHANGE', userid:json['userid'], nickname:json['nickname'] })
    };
    bootstrapAsync();
  }, []);

  const ChangeNickname = async data => {
    let url = REQUEST_URL+state.userid
    let response = await fetch(url)
    let json = await response.json()
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        'userid': state.userid,
        'nickname': data.usernickname,
        'userpwd': json['userpwd'],
        'coright': json['coright']
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    dispatch({ type: 'CHANGE', userid:state.userid, nickname:data.nickname })
    Alert.alert("Success.")
  }

  const ChangeUserpwd = async data => {
    let url = REQUEST_URL+state.userid
    let response = await fetch(url)
    let json = await response.json()
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        'userid': state.userid,
        'nickname': json['nickname'],
        'userpwd': data.userpwd,
        'coright': json['coright']
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    await AsyncStorage.setItem('usertoken',data.userpwd)
    Alert.alert("Success.")
  }

  const [usernickname, setusernickname] = React.useState('');
  const [userpwd, setuserpwd] = React.useState('');

  return(
    <View  style={{flex:1}}>
      <View style={{height: '30%',left:'5%',justifyContent:'center'}}>
        <Text h3>{state.userid}</Text>
      </View>
      <View style={{width:'78%',height: '20%',flexDirection:'row'}}>
        <Input
          leftIcon={{ type: 'octicon', name: 'mention' }}
          leftIconContainerStyle={{left:0,paddingRight:10 }}
          placeholder={state.nickname}
          onChangeText={setusernickname}
          value={usernickname}
        />
        <Button title="CHANGE" onPress={() => ChangeNickname({ usernickname })}/>
      </View>
      <View style={{width:'78%',height: '20%',flexDirection:'row'}}>
        <Input 
          leftIcon={{ type: 'octicon', name: 'key' }}
          leftIconContainerStyle={{left:0,paddingRight:10 }}
          placeholder="NewPassword"
          value={userpwd}
          onChangeText={setuserpwd}
          secureTextEntry
        />
        <Button title="CHANGE" onPress={() => ChangeUserpwd({ userpwd })} />
      </View>
    </View>
  )
}

function CommentListScreen({navigation,route}){
  const initialState = { data:[] }
  
  function reducer( state, action ) {
    switch (action.type) {
      case 'BOOT':
        return {
          data: action.data
        };
    }
  }
  
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let str = ''
      str = await AsyncStorage.getItem('userid')
      let url = REQUEST_COMMENT_URL+str
      let response = await fetch(url)
      let json = await response.json()
      console.log(json.length)
      for (var i=0;i<json.length;i++){
        let u = REQUEST_MUSEUMINFO_URL+json[i]['midex']
        let r = await fetch(u)
        let j = await r.json()
        json[i]['mname']=j['mname']
      }
      dispatch({ type: 'BOOT', data:json })
    };
    bootstrapAsync();
  }, []);

  var keyExtractor = (item, index) => index.toString()

  var renderItem = ({ item }) => (
    <View>
      <Card
        title={item.mname}
        >
        <View style={{marginBottom: 30}}>
          <View style={{ flexDirection:'row'}}>
            <Text style={{fontSize: 15,margin: 5,marginRight:10,color: "gray"}}>服务态度</Text>
            <AirbnbRating
                count={5}
                showRating={false}
                defaultRating={item.serscore}
                size={15}
            />
          </View>
          <View style={{ flexDirection:'row'}}>
            <Text style={{fontSize: 15,margin: 5,marginRight:10,color: "gray"}}>馆内环境</Text>
            <AirbnbRating
                count={5}
                showRating={false}
                defaultRating={item.envscore}
                size={15}
            />
          </View>
          <View style={{ flexDirection:'row'}}>
            <Text style={{fontSize: 15,margin: 5,marginRight:10,color: "gray"}}>展览质量</Text>
            <AirbnbRating
                count={5}
                showRating={false}
                defaultRating={item.exhscore}
                size={15}
            />
          </View>
          <Text style={{marginTop: 20,marginLeft: 5, fontSize:18}}>
            {item.msg}
          </Text>
        </View>
        <Button
          icon={<Icon name='edit' color='#ffffff' />}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          onPress={() => navigation.navigate('CommentEditScreen',{
            midex: item.midex,
            userid: item.userid,
            exhscore: item.exhscore,
            serscore: item.serscore,
            envscore: item.envscore,
            msg: item.msg,
          })}
          title=' 编辑 ' />
      </Card>
    </View>
  )

  return(
    <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={state.data}
          renderItem={renderItem}
        />
    </View>
  )
}

function CommentEditScreen({navigation,route}){
  const initialState = { 
    midex: 0,
    userid: '',
    exhscore: 0,
    serscore: 0,
    envscore: 0,
    msg: ''
   }
  
  function reducer( state, action,prevState ) {
    switch (action.type) {
      case 'BOOT':
        return {
          midex: action.midex,
          userid: action.userid,
          exhscore: action.exhscore,
          serscore: action.serscore,
          envscore: action.envscore,
          msg: action.msg,
        };
      case 'CHANGE_exhscore':
        return{
          ...state,
          exhscore: action.exhscore,
        };
      case 'CHANGE_serscore':
        return{
          ...state,
          serscore: action.serscore
        };
      case 'CHANGE_envscore':
        return{
          ...state,
          envscore: action.envscore,
        };
      case 'CHANGE_msg':
        return{
          ...state,
          msg: action.msg,
        };
    }
  }
  
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      dispatch({ type: 'BOOT', 
        midex: route.params.midex,
        userid: route.params.userid,
        exhscore: route.params.exhscore,
        serscore: route.params.serscore,
        envscore: route.params.envscore,
        msg: route.params.msg
    })
    };
    bootstrapAsync();
  }, []);

  const EditComment = async () => {
    let url = REQUEST_EDIT_COMMENT_URL +'/'+state.midex+'/'+state.userid
    await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "midex": state.midex,
        "userid": state.userid,
        "exhscore": state.exhscore,
        "serscore": state.serscore,
        "envscore": state.envscore,
        "msg": state.msg
      }),
    });
    Alert.alert("Success.")
  }

  return(
    <View style={{left:'10%',width:'80%',top:'20%',alignItems:'center'}}>
      <View style={{ flexDirection:'row'}}>
        <Text style={{fontSize: 25,margin: 5,marginRight:15,color: "gray"}}>服务态度</Text>
        <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={state.serscore}
            size={25}
            onFinishRating={rating => dispatch({ type: 'CHANGE_serscore', serscore:rating })}
        />
      </View>
      <View style={{ flexDirection:'row'}}>
        <Text style={{fontSize: 25,margin: 5,marginRight:15,color: "gray"}}>馆内环境</Text>
        <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={state.envscore}
            size={25}
            onFinishRating={rating => dispatch({ type: 'CHANGE_envscore', envscore:rating })}
        />
      </View>
      <View style={{ flexDirection:'row'}}>
        <Text style={{fontSize: 25,margin: 5,marginRight:15,color: "gray"}}>展览质量</Text>
        <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={state.exhscore}
            size={25}
            onFinishRating={rating => dispatch({ type: 'CHANGE_exhscore', exhscore:rating })}
        />
      </View>
      <Text style={{fontSize: 25,margin: 20,color: "gray",float:'left'}}>评价</Text>
      <TextInput
        style={{width:'100%',borderColor: "#C2C2C2",borderWidth: 0.5,backgroundColor: "white",textAlignVertical: 'top',fontSize:17}}
        multiline = {true}
        numberOfLines={5}
        placeholder={state.msg}
        value={state.msg}
        onChangeText={ text =>dispatch({ type: 'CHANGE_msg', msg:text })}
      />
    <Button
      containerStyle={{width: '100%', marginTop:30}}
      title=' 完成 ' 
      onPress={()=>EditComment()}
      />
    </View>
  )
}

// Export components
export { UserControl };