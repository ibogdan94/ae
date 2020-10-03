import * as React from 'react';
import DetailView from '../../screens/DetailView';
import {connect} from 'react-redux';
import {fetchPictureDetails} from './actions';
import {selectHiResImage} from './selectors';
import Share from 'react-native-share';
import Swiper from 'react-native-swiper';

export interface Props {
  navigation: any;
  fetchPictureDetails: Function;
  isLoading: boolean;
  hiResImage: Function;
}
export interface State {
  imageUrl: string;
}

class DetailViewContainer extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#000',
      height: 50,
    },
    headerTitleStyle: {
      color: '#fff',
    },
  };

  componentDidMount() {
    const {navigation, fetchPictureDetails} = this.props;
    const {pictureDetails} = navigation.state.params;
    if (!this.props.hiResImage(pictureDetails.id)) {
      fetchPictureDetails(pictureDetails.id);
    }
  }

  share = (imageId: number): void => {
    const imageDetails = this.props.hiResImage(imageId);
    if (imageDetails) {
      Share.open({url: imageDetails.full_picture});
    }
  };

  applyFilter = (type: any): void => {
    // TODO: implement apply image filter function
  };

  handleImageIndexChange = (index: number): void => {
    console.log(index);
  };

  render() {
    const {pictureDetails} = this.props.navigation.state.params;
    const {isLoading, hiResImage} = this.props;

    const imageDetails = hiResImage(pictureDetails.id);

    console.log('imageDetails', imageDetails);

    return (
      <DetailView
        pictureDetails={imageDetails}
        shareCallback={this.share}
        isLoading={isLoading}
        applyFilterCallback={this.applyFilter}
      />
    );
  }
}

function bindAction(dispatch: any) {
  return {
    fetchPictureDetails: (imageId: number) =>
      dispatch(fetchPictureDetails(imageId)),
  };
}

const mapStateToProps = (state: any) => ({
  hiResImage: (imageId: number) => selectHiResImage(state, imageId),
  isLoading: state.detailViewReducer.isLoading,
});

export default connect(mapStateToProps, bindAction)(DetailViewContainer);
