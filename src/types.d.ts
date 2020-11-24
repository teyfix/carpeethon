interface Item {
  id: number | string;
}


interface Photo extends Item {
  id: number;
  title: string;
  imageUrl: string;
}
