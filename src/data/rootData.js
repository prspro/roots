//family object
const root = {
  name: "",
  id: 1,
  hidden: true,
  children: [
    {
      name: "Mistress Mistress",
      id: 9000,
      no_parent: true,
    },
    {
      name: "John",
      id: 16,
      no_parent: true,
    },
    {
      name: "",
      id: 2,
      no_parent: true,
      hidden: true,
      children: [
        { name: "Hidden Son", id: 9001 },

        {
          name: "Jeezy",
          id: 12,
        },
        {
          name: "Bob",
          id: 13,
          no_parent: true,
        },
        {
          name: "Chopper",
          id: 3,
        },
        {
          name: "",
          id: 4,
          hidden: true,
          no_parent: true,
          children: [
            {
              name: "Dino",
              id: 5,
            },
            {
              name: "",
              id: 14,
              hidden: true,
              no_parent: true,
              children: [
                {
                  name: "Percy",
                  id: 15,
                },
              ],
            },
            {
              name: "EazyE",
              id: 6,
            },
          ],
        },
        {
          name: "Khalid",
          id: 11,
        },
        {
          name: "GFunk",
          id: 7,
          children: [
            {
              name: "Hobo",
              id: 8,
            },
            {
              name: "Illiac",
              id: 9,
            },
          ],
        },
      ],
    },
    {
      name: "Megan",
      id: 10,
      no_parent: true,
      children: [],
    },
  ],
};

//This maps the siblings together mapping uses the ID using the blue line
const siblings = [
  {
    source: {
      id: 3,
      name: "C",
    },
    target: {
      id: 11,
      name: "K",
    },
  },
  {
    source: {
      id: 12,
      name: "L",
    },
    target: {
      id: 13,
      name: "J",
    },
  },
  {
    source: {
      id: 5,
      name: "D",
    },
    target: {
      id: 6,
      name: "E",
    },
  },
  {
    source: {
      id: 16,
      name: "Q",
    },
    target: {
      id: 10,
      name: "M",
    },
  },
  {
    source: { id: 16, name: "Q" },
    target: { id: 9000, name: "P" },
  },
];

const testData = [
  //
  {
    personID: "generation1root",
    parentID: "",
    name: "generation 1",
    no_parent: true,
    hidden: true,
  },
  { personID: "generation11", parentID: "generation1root", name: "person 1" },
  { personID: "generation12", parentID: "generation1root", name: "person 2" },
  {
    personID: "generation2root",
    parentID: "generation1root",
    name: "generation 2",
    no_parent: true,
    hidden: true,
  },
  { personID: "generation13", parentID: "generation1root", name: "person 3" },
  { personID: "generation14", parentID: "generation1root", name: "person 4" },
  //
  { personID: "generation21", parentID: "generation2root", name: "person 5" },
  {
    personID: "generation3root",
    parentID: "generation2root",
    name: "generation 3",
    no_parent: true,
    hidden: true,
  },
  { personID: "generation22", parentID: "generation2root", name: "person 6" },
  //
  { personID: "generation31", parentID: "generation3root", name: "person 7" },
  // { personID: "person3", parentID: "root", name: "parent 3" },
  // { personID: "child1", parentID: "person1", name: "parent 3" },
  // { personID: "child1", parentID: "person2", name: "parent 3" },
  // { personID: "child1", parentID: "root", name: "parent 3" },
  //   { parent: "_____", child: "____" },
  //   { parent: "_____", child: "____" },
  //   { parent: "_____", child: "____" },
  //   { parent: "_____", child: "____" },
  //   { parent: "_____", child: "____" },
];

const testSiblings = [
  {
    source: {
      id: 3,
      name: "C",
    },
    target: {
      id: 11,
      name: "K",
    },
  },
];

const rootM = {
  name: "",
  id: 1,
  hidden: true,
  no_parent: true,
  children: [
    //
    {
      name: "",
      id: 11,
      hidden: true,
      no_parent: true,
      children: [
        {
          name: "father 1",
          id: 111,
          no_parent: true,
        },
        {
          name: "",
          id: 113,
          hidden: true,
          no_parent: true,
          children: [
            {
              name: "child 1",
              id: 1131,
              // no_parent: true,
            },
          ],
        },
        {
          name: "mother 1",
          id: 112,
          no_parent: true,
        },
      ],
    },
    //
    {
      name: "",
      id: 12,
      hidden: true,
      no_parent: true,
      children: [
        {
          name: "father 2",
          id: 121,
          no_parent: true,
        },
        {
          name: "",
          id: 123,
          hidden: true,
          no_parent: true,
          children: [
            {
              name: "child 2",
              id: 1231,
              // no_parent: true,
            },
          ],
        },
        {
          name: "mother 2",
          id: 122,
          no_parent: true,
        },
      ],
    },

    // {
    //   name: "",
    //   id: 12,
    //   no_parent: true,
    //   children: []
    // },
    // {
    //   name: "",
    //   id: 2,
    //   no_parent: true,
    //   hidden: true,
    //   children: [
    //     {
    //       name: "child 1",
    //       id: 21,
    //     },
    //     {
    //       name: "child 2",
    //       id: 22,
    //       // no_parent: true,
    //     },
    //     {
    //       name: "",
    //       id: 3,
    //       hidden: true,
    //       no_parent: true,
    //       children: [
    //         {
    //           name: "Dino",
    //           id: 31,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   name: "father 2",
    //   id: 13,
    //   no_parent: true,
    //   children: [],
    // },
    // {
    //   name: "father 2",
    //   id: 14,
    //   no_parent: true,
    //   children: [],
    // },
  ],
};

const siblingsM = [
  {
    source: {
      id: 111,
      name: "C",
    },
    target: {
      id: 112,
      name: "K",
    },
  },
  {
    source: {
      id: 121,
      name: "C",
    },
    target: {
      id: 122,
      name: "K",
    },
  },
];

const forceRoot = [
  {
    id: 6,
    name: "Fred",
    partners: [5],
    children: [7, 9],
  },
  {
    id: 1,
    name: "Alice",
    partners: [2],
    children: [4],
  },
  {
    id: 2,
    name: "Bob",
    partners: [1, 3],
    children: [4, 10],
  },
  {
    id: 3,
    name: "Carol",
    partners: [2],
    children: [10],
  },
  {
    id: 4,
    name: "David",
    partners: [7],
    children: [8, 88],
  },
  {
    id: 5,
    name: "Emily",
    partners: [6],
    children: [7, 9, 1488],
  },

  {
    id: 7,
    name: "Grace",
    partners: [4],
    children: [8, 88],
  },
  {
    id: 8,
    name: "Harry",
    partners: null,
    children: [888],
  },
  {
    id: 88,
    name: "Harry 2",
    partners: null,
    children: [888],
  },
  {
    id: 888,
    name: "Harry 3",
    partners: null,
    children: [1488],
  },
  {
    id: 1488,
    name: "Harry 4",
    partners: null,
    children: null,
  },
  {
    id: 9,
    name: "Imogen",
    partners: null,
    children: null,
  },
  {
    id: 10,
    name: "James",
    partners: null,
    children: null,
  },
];

const forceRootParent = [
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
    name: "child 6",
    parents: ["13333", "13334"],
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
  siblings,
  testData,
  rootM,
  siblingsM,
  forceRoot,
  forceRootParent,
};
