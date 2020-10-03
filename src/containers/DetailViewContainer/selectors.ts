export const selectHiResImage = (state: any, imageId: number) =>
  state.detailViewReducer.hiResPictures.find(
    (hiResPic: any) => hiResPic.id === imageId,
  );
