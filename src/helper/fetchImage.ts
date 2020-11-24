// download an image and convert it to blob url
const fetchImage = (input: RequestInfo, init?: RequestInit) => fetch(input, init).then(_ => _.blob()).then(_ => URL.createObjectURL(_));

export default fetchImage;
