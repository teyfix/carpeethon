import fetchImage from './fetchImage';
import randomList from './randomList';
import tags from './tags';

// because unsplash.com provides all the images from the
// same endpoint and browser caches the images that has
// the same url, we encounter with image repetition, we
// intend to solve this problem by downloading each image
// and convert to blob url
const randomTag = randomList(tags, 100, 5000);
const randomImage = async () => fetchImage('https://source.unsplash.com/random?' + await randomTag());

export default randomImage;
