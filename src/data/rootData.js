const root = [
  {
    id: "3",
    name: "child 1",
    parents: ["1", "2"],
    // parents: [],
  },
  // {
  //   id: "33",
  //   name: "child 2",
  //   parents: ["1", "2"],
  //   // parents: [],
  // },
  {
    id: "4",
    name: "grandparent 1",
    parents: [],
  },
  {
    id: "5",
    name: "grandparent 2",
    parents: [],
  },
  {
    id: "1",
    name: "parent 11",
    parents: ["4", "5"],
    // parents: [],
  },
  {
    id: "8",
    name: "grandparent 3",
    parents: [],
  },
  {
    id: "9",
    name: "grandparent 4",
    parents: [],
  },
  {
    id: "2",
    name: "parent 2",
    parents: ["8", "9"],
    // parents: [],
  },
  {
    id: "22",
    name: "parent 2 sibling",
    parents: ["8", "9"],
    // parents: [],
  },


  {
    id: "333",
    name: "child 3",
    parents: ["1", "2"],
    // parents: [],
  },
  {
    id: "3333",
    name: "child 4",
    parents: ["1", "2"],
    // parents: [],
  },
  {
    id: "2222",
    name: "child 4",
    parents: [],
  },
  {
    id: "2223",
    name: "child 4",
    parents: [],
  },
  {
    id: "2224",
    name: "child 4",
    parents: ["2222", "2223"],
  },
  {
    id: "13333",
    name: "child 6",
    parents: ["1", "2"],
    // parents: [],
  },
  {
    id: "13334",
    name: "child 6",
    // parents: ["1", "2"],
    parents: [],
  },
  {
    id: "1333311",
    name: "child 123",
    parents: ["13333", "13334"],
    // parents: [],
  },
  {
    id: "1332211",
    name: "child 321",
    parents: ["1333311"],
    // parents: [],
  },
  {
    id: "33333",
    name: "child 5",
    parents: ["3333", "2222"],
    // parents: [],
  },

];

export {
  root,
};
