const initialState = {
  currentUser: {
    _id: '5dab55b68308661f8602cbbf',
    name: 'andy',
    email: 'drwb333@gmail.com',
    phone: '+19897210902'
  }
};

export default function users (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
};
