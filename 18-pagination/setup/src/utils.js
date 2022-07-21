const paginate = (followers) => {
  //   console.log(followers);

  const itemsPerPage = 8;
  //   Math.ceil ROUNDS UP
  const pages = Math.ceil(followers.length / itemsPerPage);
  //   console.log(pages);

  // ARRAY OF ARRAYS: split up items in separate arrays
  //   create NEW ARRAY with # items = pages
  const newFollowers = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    console.log(start);
    //   pull out items from original array and put them inside new array
    // below, first iteration is (0, 9), 9 not included
    return followers.slice(start, start + itemsPerPage);
  });

  //   console.log(newFollowers);
  return newFollowers;
};

export default paginate;
