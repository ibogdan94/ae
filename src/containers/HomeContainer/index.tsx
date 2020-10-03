import * as React from 'react';
import {Platform, StatusBar} from 'react-native';
import {connect} from 'react-redux';

import HomeView from '../../screens/Home/index';
import {fetchPictures} from './actions';

export interface Props {
  navigation: any;
  fetchPictures: Function;
  pictures: Array<Object>;
  isLoading: boolean;
  hasMore: boolean;
  page: number;
}

export interface State {}

class HomeContainer extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: Props) {
    console.log('HomeScreen');
    super(props);
    StatusBar.setBarStyle('light-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#000');
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  render() {
    return (
      <HomeView
        {...this.props}
        onRefresh={this.onRefresh}
        onLoadNext={this.onLoadNext}
      />
    );
  }

  onRefresh = (): void => {
    this.props.fetchPictures(1);
  };

  onLoadNext = (): void => {
    if (this.props.hasMore) {
      this.props.fetchPictures(this.props.page + 1);
    }
  };
}

function bindAction(dispatch: any) {
  return {
    fetchPictures: (page: number) => dispatch(fetchPictures(page)),
  };
}

const mapStateToProps = (state: any) => ({
  pictures: state.homeReducer.pictures,
  page: state.homeReducer.page,
  isLoading: state.homeReducer.isLoading,
  hasMore: state.homeReducer.hasMore,
});

export default connect(mapStateToProps, bindAction)(HomeContainer);
