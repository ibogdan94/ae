import * as React from 'react';
import {View, Image, ActivityIndicator, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import styles from './styles';
import DetailsFooter from './components/DetailsFooter';
import {ImageDetailsI} from '../../types/image';
import {FC, useState} from 'react';

type Props = {
  isLoading: boolean;
  shareCallback: Function;
  applyFilterCallback: Function;
  pictureDetails: ImageDetailsI;
};

const {width, height} = Dimensions.get('window');

// TODO: it would be great to see here loader, pinch to zoom here and pan

const DetailView: FC<Props> = ({
  shareCallback,
  applyFilterCallback,
  pictureDetails,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);

  const loader = (): JSX.Element | null => {
    if (loading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="small" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View>
          <ImageZoom
            cropWidth={width}
            cropHeight={height}
            imageWidth={350}
            imageHeight={350}>
            <Image
              source={{uri: pictureDetails?.full_picture}}
              style={[styles.imageStyle, {width: 350, height: 350}]}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
          </ImageZoom>
          {loader()}
        </View>
      </View>
      <DetailsFooter
        pictureDetails={pictureDetails}
        shareCallback={shareCallback}
        applyFilterCallback={applyFilterCallback}
      />
    </View>
  );
};

export default DetailView;
