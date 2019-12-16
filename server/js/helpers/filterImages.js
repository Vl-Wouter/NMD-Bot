const filterImages = (array) => {
  return array.filter(post => {
    return post.data.is_self === false && post.data.is_video === false;
  })
}

export default filterImages;