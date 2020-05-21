import React, {Component, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Button,
  _FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import {SearchBar, ListItem, Card, Overlay} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';
import {MuseumListDetail} from './MuseumList';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryPie,
} from 'victory-native';

class MuseumStatisticsHome extends Component {
  render() {
    return (
      <Container>
        <ScrollView>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('MuseumStatisticsDetail_times')
            }>
            <Card
              image={require('../Picture/Card1.jpg')}
              title="展览次数排名"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('MuseumStatisticsDetail_numbers')
            }>
            <Card
              image={require('../Picture/Card2.jpg')}
              title="藏品数量排名"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('MuseumStatisticsDetail_good')
            }>
            <Card image={require('../Picture/Card3.jpg')} title="好评排名" />
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  }
}

class MuseumStatisticsDetail_times extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_times: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://10.0.2.2:14816/api/maintables/One/5')
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          list_times: responseData,
        });
      });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View>
            {this.state.list_times.map((item, i) => (
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate('MuseumListDetail', {
                    id: item.midex,
                    name: item.mname,
                  })
                }
                key={i}
                title={'第' + (i + 1) + '名   ' + item.mname}
                titleStyle={{fontSize: 24}}
                bottomDivider
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

class MuseumStatisticsDetail_numbers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_numbers: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://10.0.2.2:14816/api/maintables/One/4')
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          list_numbers: responseData,
        });
      });
  }
  render() {
    return (
      <View>
        <ScrollView>
          <View>
            {this.state.list_numbers.map((item, i) => (
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate('MuseumListDetail', {
                    id: item.midex,
                    name: item.mname,
                  })
                }
                key={i}
                title={'第' + (i + 1) + '名   ' + item.mname}
                titleStyle={{fontSize: 24}}
                bottomDivider
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

class MuseumStatisticsDetail_good extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(
                'MuseumStatisticsDetail_good_zonghe',
              )
            }>
            <Card title="综合排名" image={require('../Picture/Rank1.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('MuseumStatisticsDetail_good_fuwu')
            }>
            <Card title="服务排名" image={require('../Picture/Rank2.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(
                'MuseumStatisticsDetail_good_huanjing',
              )
            }>
            <Card title="环境排名" image={require('../Picture/Rank3.jpg')} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

class MuseumStatisticsDetail_good_zonghe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_good_zonghe: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://10.0.2.2:14816/api/maintables/One/1')
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          list_good_zonghe: responseData,
        });
      });
  }
  render() {
    return (
      <View>
        <ScrollView>
          <View>
            {this.state.list_good_zonghe.map((item, i) => (
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate('Chart3', {
                    id: item.midex,
                    name: item.mname,
                  })
                }
                key={i}
                title={'第' + (i + 1) + '名   ' + item.mname}
                titleStyle={{fontSize: 24}}
                bottomDivider
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

class MuseumStatisticsDetail_good_fuwu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_good_fuwu: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://10.0.2.2:14816/api/maintables/One/2')
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          list_good_fuwu: responseData,
        });
      });
  }
  render() {
    return (
      <View>
        <ScrollView>
          <View>
            {this.state.list_good_fuwu.map((item, i) => (
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate('Chart1', {
                    id: item.midex,
                    name: item.mname,
                  })
                }
                key={i}
                title={'第' + (i + 1) + '名   ' + item.mname}
                titleStyle={{fontSize: 24}}
                bottomDivider
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

class MuseumStatisticsDetail_good_huanjing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_good_huanjing: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://10.0.2.2:14816/api/maintables/One/3')
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          list_good_huanjing: responseData,
        });
      });
  }
  render() {
    return (
      <View>
        <ScrollView>
          <View>
            {this.state.list_good_huanjing.map((item, i) => (
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate('Chart2', {
                    id: item.midex,
                    name: item.mname,
                  })
                }
                key={i}
                title={'第' + (i + 1) + '名   ' + item.mname}
                titleStyle={{fontSize: 24}}
                bottomDivider
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

class Chart1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let id = this.props.route.params.id;
    let name = this.props.route.params.name;
    let url1 = 'http://10.0.2.2:14816/api/Comments/analysis1/' + id.toString();
    fetch(url1)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: responseData,
        });
      });
  }

  render() {
    let mid = this.props.route.params.id;
    let mname = this.props.route.params.name;
    return (
      <View style={{alignItems: 'center', margin: 15}}>
        <Text style={{fontSize: 40, margin: 10}}>{mname}</Text>

        <VictoryPie
          data={this.state.data}
          offset={20}
          colorScale={'qualitative'}
        />

        <View style={{borderTopWidth: 20, borderTopColor: 'rgb(242,242,242)'}}>
          <Button
            title={'查看博物馆详细信息'}
            onPress={() =>
              this.props.navigation.navigate('MuseumListDetail', {
                id: mid,
                name: mname,
              })
            }
          />
        </View>
      </View>
    );
  }
}
class Chart2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let id = this.props.route.params.id;
    let name = this.props.route.params.name;
    let url1 = 'http://10.0.2.2:14816/api/Comments/analysis2/' + id.toString();
    fetch(url1)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: responseData,
        });
      });
  }

  render() {
    let mid = this.props.route.params.id;
    let mname = this.props.route.params.name;
    return (
      <View style={{alignItems: 'center', margin: 15}}>
        <Text style={{fontSize: 40, margin: 10}}>{mname}</Text>

        <VictoryPie
          data={this.state.data}
          offset={20}
          colorScale={'qualitative'}
        />

        <View style={{borderTopWidth: 20, borderTopColor: 'rgb(242,242,242)'}}>
          <Button
            title={'查看博物馆详细信息'}
            onPress={() =>
              this.props.navigation.navigate('MuseumListDetail', {
                id: mid,
                name: mname,
              })
            }
          />
        </View>
      </View>
    );
  }
}
class Chart3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let id = this.props.route.params.id;
    let name = this.props.route.params.name;
    let url1 = 'http://10.0.2.2:14816/api/Comments/analysis3/' + id.toString();
    fetch(url1)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: responseData,
        });
      });
  }

  render() {
    let mid = this.props.route.params.id;
    let mname = this.props.route.params.name;
    return (
      <View style={{alignItems: 'center', margin: 15}}>
        <Text style={{fontSize: 40, margin: 10}}>{mname}</Text>

        <VictoryPie
          data={this.state.data}
          offset={20}
          colorScale={'qualitative'}
        />

        <View style={{borderTopWidth: 20, borderTopColor: 'rgb(242,242,242)'}}>
          <Button
            title={'查看博物馆详细信息'}
            onPress={() =>
              this.props.navigation.navigate('MuseumListDetail', {
                id: mid,
                name: mname,
              })
            }
          />
        </View>
      </View>
    );
  }
}
// Export components
export {
  MuseumStatisticsHome,
  MuseumStatisticsDetail_times,
  MuseumStatisticsDetail_numbers,
  MuseumStatisticsDetail_good,
  MuseumStatisticsDetail_good_zonghe,
  MuseumStatisticsDetail_good_fuwu,
  MuseumStatisticsDetail_good_huanjing,
  Chart1,
  Chart2,
  Chart3,
};

const Container = styled.View`
  flex: 1;
  background: white;
`;
