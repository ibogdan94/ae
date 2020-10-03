import * as React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from '../styles';
import FastImage from 'react-native-fast-image';

type Props = {
  imageUrl: string;
  imageId: number;
  openPicture: Function;
  imageStyle: Object;
};

class ListItem extends React.PureComponent<Props> {
  render() {
    const {imageUrl, imageId, openPicture, imageStyle} = this.props;
    return (
      <TouchableOpacity
        onPress={() => openPicture(imageId)}
        style={styles.item}>
        <FastImage
          style={imageStyle}
          resizeMode="cover"
          source={{uri: imageUrl}}
        />
      </TouchableOpacity>
    );
  }
}

export default ListItem;
