import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { CommonStyle } from '../../themes';
import { styles } from './styles';
import _ from 'lodash';
import { getUnsplashUsers as getUnsplashUsersAPI } from './../../service/api';
import { Color } from '../../themes';

class SearchUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isFetching: false
    }
    this.nextPagination = 1;
  }

  componentDidMount() {
    this.onGetUsers();
  }

  onGetUsers = async () => {
    this.setState({ isFetching: true });
    const res = await getUnsplashUsersAPI(this.nextPagination, 'start');
    this.setState({ isFetching: false });
    if (_.get(res, 'total_pages', 0) > this.nextPagination) {
      this.nextPagination += 1;
    } else {
      this.nextPagination = -1; // no more
    }
    if (_.get(res, 'results.length', 0)) {
      const updatedUsers = [...this.state.users, ..._.get(res, 'results', [])];
      this.setState({ users: updatedUsers });
    }
  }

  onSearch = (query) => {
    if (query.length <= 1) {
      this.nextPagination = 1;
    }
  }

  onLoadMore = () => {
    const { isFetching, users } = this.state;
    if (this.nextPagination != -1 && !isFetching && users.length !== 0) {
      this.onGetUsers();
    }
  }

  onShowDetail = (item, index) => {
  }

  renderItem = ({ item, index }) => {
    const uri = _.get(item, 'profile_image.medium', null);
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => this.onShowDetail(item, index)}>
        <View style={styles.itemSubContainer}>
          {uri && <Image
            source={{ uri }}
            style={styles.userImage}
          />}
          {!uri && <Image source={require('../../assets/img_placeholder.jpg')} style={styles.userImage}/>}
          <View style={styles.itemUserInfoContainer}>
            <Text style={styles.whiteBoldText}>
              {_.get(item, 'name', '')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { users } = this.state;
    return (
      <SafeAreaView style={CommonStyle.container}>
        <SearchBar
          fontColor={Color.searchColor}
          iconColor={Color.searchColor}
          shadowColor={Color.shadowColor}
          cancelIconColor={Color.searchColor}
          backgroundColor={Color.primary}
          placeholder="Type 2 chars at least to start to search"
          onChangeText={this.onSearch}
          onPressCancel={() => this.onSearch('')}
          onPress={() => alert("onPress")}
        />
        <View style={styles.container}>
          <FlatList
            data={users}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `index-${index}`}
            ItemSeparatorComponent={this.renderSeparator}
            style={styles.listContainer}
            onEndReached={this.onLoadMore}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchUserScreen;
