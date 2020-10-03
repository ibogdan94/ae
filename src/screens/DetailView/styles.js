import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    width: width * 0.9,
    height: width * 0.9,
  },
  backButton: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  spinner: {
    position: 'absolute',
  },
  infoView: {
    position: 'absolute',
    bottom: 30,
    width: 250,
    left: 30,
    flexDirection: 'column',
  },
  author: {
    color: '#fff',
    fontSize: 25,
  },
  camera: {
    color: '#fff',
    fontSize: 16,
  },
  detailView: {
    position: 'absolute',
    bottom: 10,
    width: 120,
    right: 10,
    flexDirection: 'row',
  },
  detailViewImage: {
    width: 50,
    height: 50,
  },
  activityContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
