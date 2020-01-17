const filterImages = (array) => array.filter((post) => post.data.is_self === false
                                                        && post.data.is_video === false);

export default filterImages;
