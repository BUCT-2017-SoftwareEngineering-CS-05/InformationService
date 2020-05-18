// Import dependencies
import React, { Component } from "react";
import { FlatList, StyleSheet, View, AsyncStorage, TextInput, Alert, ScrollView, TouchableOpacity, Linking, Image} from "react-native";
import { Button, ListItem, SearchBar, Rating, AirbnbRating, Card, Icon, Overlay, Text } from 'react-native-elements'
import { useRoute } from '@react-navigation/native';
list = [
    {
        midex: 2,
        mname: '中国国家博物馆1',
        picture_address: 'https://img.dpm.org.cn/Uploads/Picture/dc/51[1024].jpg',
        maddress: '我也不知道1',
        mbase: '中国国家博物馆是代表国家收藏、研究、展示、阐释能够充分反映中华优秀传统文化、革命文化和社会主义先进文化代表性物证的最高机构，是国家最高历史文化艺术殿堂和文化客厅。',
        mopentime: '09:00开馆时间16:00停止入馆16:30观众退场17:00闭馆时间周六延长至晚9点闭馆-->每周一例行闭馆',
        // hidden: false
    },
    {
        midex: 3,
        mname: '中国国家博物馆2',
        picture_address: 'https://img.dpm.org.cn/Uploads/Picture/dc/51[1024].jpg',
        maddress: '我也不知道2',
        mbase: '中国国家博物馆是代表国家收藏、研究、展示、阐释能够充分反映中华优秀传统文化、革命文化和社会主义先进文化代表性物证的最高机构，是国家最高历史文化艺术殿堂和文化客厅。',
        mopentime: '09:00开馆时间16:00停止入馆16:30观众退场17:00闭馆时间周六延长至晚9点闭馆-->每周一例行闭馆',
        // hidden: false
    },
    {
        midex: 4,
        mname: '中国国家博物馆3',
        picture_address: 'https://img.dpm.org.cn/Uploads/Picture/dc/51[1024].jpg',
        maddress: '我也不知道3',
        mbase: '中国国家博物馆是代表国家收藏、研究、展示、阐释能够充分反映中华优秀传统文化、革命文化和社会主义先进文化代表性物证的最高机构，是国家最高历史文化艺术殿堂和文化客厅。',
        mopentime: '09:00开馆时间16:00停止入馆16:30观众退场17:00闭馆时间周六延长至晚9点闭馆-->每周一例行闭馆',
        // hidden: false
    },
]

class MuseumListHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search: '',
        };
    }
    componentWillMount(){
        this.fetchData()
    } 
    async fetchData(){
        await fetch('http://10.0.2.2:14816/api/maintables')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                data : data
            })
        })
        .catch(error =>
            alert(error)
            );
    } 
    addHidden = () => {
        //给数据每项加入hidden属性，控制是否隐藏
        data = this.state.data
        for(let i=0,len=data.length;i<len;i++){
            data[i].hidden = false
        }
    }
    filter = (search) => { //根据输入筛选要渲染的item
        var data = this.state.data
        for(var i = 0; i < data.length; i++){
            if(data[i].mname.includes(search)){
                data[i].hidden = false
            }else{
                data[i].hidden = true
            }
        }
        this.setState({data:data})
        
    }
    updateSearch = search => {
        this.setState({ search : search });
        this.filter(search);
        //根据输入筛选要显示的数据  对数据的hidden属性进行修改
    };
    renderItem = ({ item }) => {
        return(
            item.hidden
            ? (null)
            : (
                    <ListItem
                        title={item.mname}
                        titleStyle={styles.title}
                        // subtitle={item.subtitle}
                        // leftAvatar={{ style: styles.avater, source: { uri: item.picture_address } }}
                        bottomDivider
                        // chevron
                        onPress={() => this.props.navigation.navigate('MuseumListDetail', { id: item.midex })}//页面跳转并传递点击的项目的标识
                    />
            )
    )}
    keyExtractor = (item, index) => index.toString()//flatlist
    render() {
        const { search } = this.state;

        return (
            // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                {/* 搜索栏 */}
                <SearchBar
                    placeholder="Search..."
                    onChangeText={this.updateSearch}
                    value={search}
                    platform="android"
                    containerStyle={styles.searchBarContiner}
                    inputContainerStyle={styles.searchBarInputContiner}
                />
                <View style={height= 10}></View>
                {/* 博物馆列表 */}
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    //解决刷新问题，查的，不知道为嘛
                    handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                />
                {/* <Text>MuseumListHome!</Text>
                <Button
                    title={`Go to Detail and change num to 999`}
                    onPress={() => this.props.navigation.navigate('MuseumListDetail',{num:999})}
                /> */}
            </View>
        );
    }
}

class MuseumListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            serviceRate: 5,
            environmentRate: 5,
            exhibitionRate: 5,
            comment: "",
            rateOverlayVisible: false,
            introOverlayVisible: false,
        };
    
    }
    componentWillMount(){
        this.fetchData()
    } 
    async fetchData(){
        await fetch('http://10.0.2.2:14816/api/maintables')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                data : data
            })
        })
        .catch(error =>
            alert(error)
            );
    } 
    rateCommit = () => {
        let rateData = {
            "midex": this.props.route.params.id,
            "userid": "user22",
            "exhscore": this.state.exhibitionRate,
            "serscore": this.state.serviceRate,
            "envscore": this.state.environmentRate,
            "msg": this.state.comment
        }
        fetch('http://10.0.2.2:14816/api/Comments', {
            method: 'POST', // or 'PUT'
            headers: { Accept: 'application/json',
                       'Content-Type': 'application/json',},
            body: JSON.stringify(rateData), // data can be `string` or {object}!
        })
        .then(response => {
            if(response.status == 409) {
                alert("您已评价过该博物馆，可在用户界面进行修改！")
            }else if(response.status == 201){
                Alert.alert('评价成功')
            }
        })
        .catch(error =>
            alert(error)
            );
        
    }
    render() {
        let data = {}
        for(let i=0,len=this.state.data.length;i<len;i++){
            if(this.state.data[i].midex === this.props.route.params.id){
                data = this.state.data[i]
            }
        }
        
        return (
            <View>
                <View style={{justifyContent: 'center', height: '20%',backgroundColor:'white'}}>
                    <View style={styles.detialTitleContiner}>
                        <Text style={styles.detialTitle}>{data.mname}</Text>
                    </View>
                </View>
                <View style={{height: '1%'}}></View>
                <View style={{height: '70%'}}>
                    <TouchableOpacity style={{ paddingleft: '10%',flexDirection: 'row',alignItems:'center',height:'18%',backgroundColor:'white'}}
                                    onPress={() => this.setState({ introOverlayVisible : true })}
                                    >
                    <View style={{  left: '12%',flexDirection: 'row',alignItems:'center',}}>
                        <Icon
                        name='book' 
                        type='octicon'
                        containerStyle={{marginRight:20}}
                        size={30}
                        />
                        <Text
                        style={{fontSize:20}}
                        >简介</Text>
                        <Icon
                        name='chevron-right'
                        containerStyle={{flex:1,float:'right',left:'75%'}}
                        />
                    </View>
                    </TouchableOpacity>
                    <View style={{height: '1%'}}></View>
                    <TouchableOpacity style={{ paddingleft: '10%',flexDirection: 'row',alignItems:'center',height:'18%',backgroundColor:'white'}}
                                    onPress={() => this.props.navigation.navigate('MuseumListExhibition', { id: this.props.route.params.id })}
                                    >
                    <View style={{  left: '12%',flexDirection: 'row',alignItems:'center',}}>
                        <Icon
                        name='eye' 
                        type='octicon'
                        containerStyle={{marginRight:20}}
                        size={30}
                        />
                        <Text
                        style={{fontSize:20}}
                        >展览</Text>
                        <Icon
                        name='chevron-right'
                        containerStyle={{flex:1,float:'right',left:'75%'}}
                        />
                    </View>
                    </TouchableOpacity>
                    <View style={{height: '1%'}}></View>
                    <TouchableOpacity style={{ paddingleft: '10%',flexDirection: 'row',alignItems:'center',height:'18%',backgroundColor:'white'}}
                                    onPress={() => this.props.navigation.navigate('MuseumListActivity', { id: this.props.route.params.id })}
                                    >
                    <View style={{  left: '12%',flexDirection: 'row',alignItems:'center',}}>
                        <Icon
                        name='bell' 
                        type='octicon'
                        containerStyle={{marginRight:20}}
                        size={30}
                        />
                        <Text
                        style={{fontSize:20}}
                        >活动</Text>
                        <Icon
                        name='chevron-right'
                        containerStyle={{flex:1,float:'right',left:'75%'}}
                        />
                    </View>
                    </TouchableOpacity>
                    <View style={{height: '1%'}}></View>
                    <TouchableOpacity style={{ paddingleft: '10%',flexDirection: 'row',alignItems:'center',height:'18%',backgroundColor:'white'}}
                                    onPress={() => this.props.navigation.navigate('MuseumListObject', { id: this.props.route.params.id })}
                                    >
                    <View style={{  left: '12%',flexDirection: 'row',alignItems:'center',}}>
                        <Icon
                        name='inbox' 
                        type='octicon'
                        containerStyle={{marginRight:20}}
                        size={30}
                        />
                        <Text
                        style={{fontSize:20}}
                        >藏品</Text>
                        <Icon
                        name='chevron-right'
                        containerStyle={{flex:1,float:'right',left:'75%'}}
                        />
                    </View>
                    </TouchableOpacity>
                    <View style={{height: '1%'}}></View>
                    <TouchableOpacity style={{ paddingleft: '10%',flexDirection: 'row',alignItems:'center',height:'18%',backgroundColor:'white'}}
                                    onPress={() => this.props.navigation.navigate('MuseumListObject', { id: this.props.route.params.id })}
                                    >
                    <View style={{  left: '12%',flexDirection: 'row',alignItems:'center',}}>
                        <Icon
                        name='file' 
                        type='octicon'
                        containerStyle={{marginRight:20}}
                        size={30}
                        />
                        <Text
                        style={{fontSize:20}}
                        >新闻</Text>
                        <Icon
                        name='chevron-right'
                        containerStyle={{flex:1,float:'right',left:'75%'}}
                        />
                    </View>
                    </TouchableOpacity>
                </View>
                        
                <View style={{width: '80%', left: '10%' }}>
                    <Button title="我要评价" onPress={() => this.setState({ rateOverlayVisible : true })}/>
                </View>  
                {/* 简介 */}
                <Overlay 
                    isVisible={this.state.introOverlayVisible} 
                    onBackdropPress={() => this.setState({ rateOverlayVisible : false })}
                    overlayStyle={styles.evaluationOverlay}
                    fullScreen={true}
                >
                    <View style={{height: '3%'}}></View>
                    <Text h4>{data.mname}简介</Text>
                    <View style={{height: '3%'}}></View>
                    <ScrollView>
                        <Text style={{fontSize: 20}}>{data.mbase}</Text>
                    </ScrollView>
                    <View style={{height: '2%'}}></View>
                    <View >
                        <Button title="返回" onPress={() => this.setState({ introOverlayVisible : false })} />
                    </View>
                </Overlay>
                {/* 评价 */}
                <Overlay 
                    isVisible={this.state.rateOverlayVisible} 
                    onBackdropPress={() => this.setState({ rateOverlayVisible : false })}
                    overlayStyle={styles.evaluationOverlay}
                    // fullScreen={true}
                >
                    <View style={{ flexDirection:'row', justifyContent: 'center'}}>
                        <Text style={styles.ratingTextContiner}>{"服务态度"}</Text>
                        <AirbnbRating
                            count={5}
                            showRating={false}
                            defaultRating={5}
                            size={20}
                            onFinishRating={rating => this.setState({serviceRate: rating})}
                        />
                        {/* <Text style={styles.ratingText}>{this.state.serviceRate}</Text> */}
                    </View>
                    <View style={{ flexDirection:'row', justifyContent: 'center' }}>
                        <Text style={styles.ratingTextContiner}>{"馆内环境"}</Text>
                        <AirbnbRating
                            count={5}
                            showRating={false}
                            defaultRating={5}
                            size={20}
                            onFinishRating={rating => this.setState({environmentRate: rating})}
                        />
                        {/* <Text style={styles.ratingText}>{this.state.environmentRate}</Text> */}
                    </View>
                    <View style={{ flexDirection:'row', justifyContent: 'center' }}>
                        <Text style={styles.ratingTextContiner}>{"展览质量"}</Text>
                        <AirbnbRating
                            count={5}
                            showRating={false}
                            defaultRating={5}
                            size={20}
                            onFinishRating={rating => this.setState({exhibitionRate: rating})}
                        />
                        {/* <Text style={styles.ratingText}>{this.state.collectionsRate}</Text> */}
                    </View>
                    <View style={styles.evaluationInputContiner}>
                        <Text style={styles.ratingTextContiner}>{"评价："}</Text>
                        <TextInput
                            style={styles.evaluationInput}
                            onChangeText={text => this.setState({ comment: text })}
                            multiline={true}
                            numberOfLines={8}
                            maxLength={140}
                            // defaultValue={"请输入评价"}
                            value={this.state.comment}
                        />
                    </View>
                    <View style={{height: '10%'}}></View>
                    <View style={styles.rateSubmintButtenContiner}>
                        <Button title="提交" onPress={this.rateCommit} />
                    </View>
                </Overlay>
            </View>

        );
    }
}
class MuseumListObject extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isVisible: -1,
        };
    }
    componentWillMount(){
        this.fetchData()
    } 
    async fetchData(){
        let url='http://10.0.2.2:14816/api/collections/midex/'
        url = url + this.props.route.params.id.toString()
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                data : data
            })
        })
        .catch(error =>
            alert(error)
            );
    } 
    renderItem = ({item,index}) => {
        let isVisible
        if(index === this.state.isVisible){
            isVisible = true
        }else{
            isVisible = false
        }
        return(
            <View>
                <ListItem
                    title={item.oname}
                    titleStyle={{
                        fontSize: 24,
                        // marginLeft: "10%",
                    }}
                    // subtitle={item.subtitle}
                    leftAvatar={{  source: { uri: item.ophoto } }}
                    bottomDivider
                    onPress={() => this.setState({isVisible:index}) }//页面跳转并传递点击的项目的标识
                />

                <Overlay 
                    isVisible={isVisible} 
                    onBackdropPress={() => this.setState({ rateOverlayVisible : false })}
                    overlayStyle={styles.evaluationOverlay}
                    fullScreen={true}
                >
                    <View style={{height: '3%'}}></View>
                    <Text h4>{item.oname}</Text>
                    <View style={{height: '3%'}}></View>
                    <ScrollView>
                        <Image style={{height:"20%",width:"100%",resizeMode:'contain' }} source={{uri: item.ophoto}}/>
                        <View style={{height: '1%'}}></View>
                        <Text style={{fontSize: 20}}>{item.ointro}</Text>
                    </ScrollView>
                    <View style={{height: '2%'}}></View>
                    <View >
                        <Button title="返回" onPress={() => this.setState({ isVisible : -1 })} />
                    </View>
                </Overlay>
            </View>
        )}
    keyExtractor = (item, index) => index.toString()//flatlist
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    //解决刷新问题，查的，不知道为嘛
                    handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                />
                {/* <Text>{this.props.route.params.id}</Text> */}
            </View>
        );
    }
}
class MuseumListExhibition extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isVisible: -1,
        };
    }
    componentWillMount(){
        this.fetchData()
    } 
    async fetchData(){
        let url='http://10.0.2.2:14816/api/Exhibitions/midex/'
        url = url + this.props.route.params.id.toString()
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                data : data
            })
        })
        .catch(error =>
            alert(error)
            );
    } 
    renderItem = ({item,index}) => {
        let isVisible
        if(index === this.state.isVisible){
            isVisible = true
        }else{
            isVisible = false
        }
        return(
            <View>
                <ListItem
                    title={item.ename}
                    titleStyle={styles.title}
                    // subtitle={item.subtitle}
                    // leftAvatar={{ style: styles.avater, source: { uri: item.picture_address } }}
                    bottomDivider
                    onPress={() => this.setState({isVisible:index}) }//页面跳转并传递点击的项目的标识
                />

                <Overlay 
                    isVisible={isVisible} 
                    onBackdropPress={() => this.setState({ rateOverlayVisible : false })}
                    overlayStyle={styles.evaluationOverlay}
                    fullScreen={true}
                >
                    <View style={{height: '3%'}}></View>
                    <Text h4>{item.ename}简介</Text>
                    <View style={{height: '3%'}}></View>
                    <ScrollView>
                        <Text style={{fontSize: 20}}>{item.eintro}</Text>
                    </ScrollView>
                    <View style={{height: '2%'}}></View>
                    <View >
                        <Button title="返回" onPress={() => this.setState({ isVisible : -1 })} />
                    </View>
                </Overlay>
            </View>
    )}
    keyExtractor = (item, index) => index.toString()//flatlist
    render() {
        return (
            <View style={{ flex: 1}}>
                 <View style={{justifyContent: 'center', height: '20%',backgroundColor:'white'}}>
                    <Text style={styles.detialTitle}>展览</Text>
                </View>
                <View style={{height: '0.2%'}}></View>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    //解决刷新问题，查的，不知道为嘛
                    handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                />
                {/* <Text>{this.props.route.params.id}</Text> */}
            </View>
        );
    }
}
class MuseumListActivity extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isVisible: -1,
        };
    }
    componentWillMount(){
        this.fetchData()
    } 
    async fetchData(){
        let url='http://10.0.2.2:14816/api/Educations/midex/'
        url = url + this.props.route.params.id.toString()
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                data : data
            })
        })
        .catch(error =>
            alert(error)
            );
    } 
    renderItem = ({item,index}) => {
        return(
            <ListItem
                title={item.name}
                titleStyle={styles.title}
                // subtitle={item.subtitle}
                // leftAvatar={{ style: styles.avater, source: { uri: item.picture_address } }}
                bottomDivider
                onPress={() => Linking.openURL(item.url) }//页面跳转并传递点击的项目的标识
            />
        //     this.state.isVisible === index
        //     ?<TouchableOpacity onPress={() =>{this.setState({isVisible: -1})}}>
        //         <View style={styles.showItemContainer}>
        //             <Text style={styles.showItemTitle}>{item.name}</Text>
        //             <Text style={styles.showItemTitle}>{index}</Text>
        //             {/* <View style={{width: "100%", borderTopWidth: 2, borderColor: 'black', marginVertical: 10}} />
        //             <Text style={styles.showItemContent}>{item.atime}</Text> */}
        //         </View>
        //     </TouchableOpacity>
        //     :<TouchableOpacity onPress={() =>{this.setState({isVisible: index})}}>
        //     <View style={styles.showItemContainer}>
        //         <Text style={styles.showItemTitle}>{item.aname}</Text>
        //     </View>
        // </TouchableOpacity>
    )}
    keyExtractor = (item, index) => index.toString()//flatlist
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{justifyContent: 'center', height: '20%',backgroundColor:'white'}}>
                    <Text style={styles.detialTitle}>活动</Text>
                </View>
                <View style={{height: '0.2%'}}></View>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    //解决刷新问题，查的，不知道为嘛
                    handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                />
                {/* <Text>{this.props.route.params.id}</Text> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avater: {
        width: 130,
        height: 80,
        // marginTop: 10,
    },
    title: {
        fontSize: 24,
        marginLeft: "10%",
    },
    searchBarContiner: {
        borderWidth: 0.5,
        borderColor: "#C2C2C2",
        borderRadius: 35,
        marginHorizontal: 20,
        marginBottom: 15,
        marginTop: 15,
        backgroundColor: "white"
    },
    searchBarInputContiner: {
        height: 30,
    },
//detial
    detialTitleContiner: {
        // height: 120,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 5,
        // marginBottom: 10,
        // marginTop: 10,
        paddingBottom: 30,
        paddingTop: 40,
    },
    detialTitle: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
    },
    detialOtherContiner: {
        // height: 120,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 5,
        marginVertical: 6,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        paddingVertical: 10,
    },
    detialOtherTitle: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
    },
    detialOtherContent: {
        width: "90%",
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    readMoreContainer: {
        height: 120,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: 5,
        // marginBottom: 10,
        // marginVertical: 20,
        paddingHorizontal: "5%",
    },
    readMoreButtenContainer: {
        height: 100,
        width: '30%',
        paddingHorizontal: 10,
    },
    detialButten: {
        height: 100,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 5,
        // marginVertical: 6,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    readMoreButten: {
        height: '100%',
        width: '100%',
        // marginHorizontal: 5,
        // marginBottom: 10,
        // marginTop: 10,
        // padding: 15,
        // backgroundColor: "#F8F8F8",
    },
    readMoreButtenTittle: {
        fontSize: 24,
        color: '#FFFFFF'
    },
    evaluationButtenContainer: {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 5,
        // marginBottom: 10,
        // marginTop: 10,
        // paddingTop: 5,
        // paddingHorizontal: 25,
        // backgroundColor: "#F8F8F8",
    },
    evaluationButten: {
        height: 50,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 5,
        // marginVertical: 6,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        // paddingVertical: 10,
        // paddingHorizontal: 10,
    },
    evaluationOverlay: {
        // height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 20,
        // borderColor: "#888888",
        borderRadius: 6,
        marginHorizontal: 5,
        marginBottom: 10,
        marginTop: 10,
        // padding: 15,
        backgroundColor: "#F8F8F8",
    },
    ratingTextContiner: {
        fontSize: 20,
        margin: 5,
        marginRight: 50,
        color: "gray",
    },
    evaluationInputContiner: {
        width: "88%",
        marginHorizontal: 30,
        marginBottom: 15,
        marginTop: 5,
    },
    evaluationInput: {
        // height: 40, 
        borderColor: "#C2C2C2", 
        borderWidth: 0.5,
        backgroundColor: "white", 
    },
    rateSubmintButtenContiner: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        marginHorizontal: 30,
        marginBottom: 10,
        marginTop: 5,
    },
//moredetial
    showItemContainer: {
        // height: 120,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%',
        marginVertical: 6,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        paddingVertical: 10,
    },
    showItemTitle: {
        width: "90%",
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    showItemContent: {
        width: "90%",
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});

// Export components
export { MuseumListHome, MuseumListDetail, MuseumListObject, MuseumListExhibition, MuseumListActivity };