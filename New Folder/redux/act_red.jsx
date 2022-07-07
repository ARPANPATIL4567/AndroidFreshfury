//action fun o set state data
export const ADD_DATA = (Name, Enail, Mobile, pass1, id) => {
  return {
    type: "ADD_DATA",
    paylod: {
      Name,
      Enail,
      Mobile,
      pass1,
      id,
    },
  };
};
export const ADD_Food_DATA = (Data) => {
  return {
    type: "ADD_Food_DATA",
    paylod: {
      Data,
    },
  };
};
export const ADD_mycart_DATA = (mycart) => {
  return {
    type: "ADD_mycart_DATA",
    paylod: {
      mycart,
    },
  };
};
export const Settotalprice = (Totalprice) => {
  return {
    type: "Settotalprice",
    paylod: {
      Totalprice,
    },
  };
};
//ddefault state

//color  :  #ff6c41
// disablebtn : #f4c9b8

const mydata = {
  hostphp: "http://82.180.163.49/",
  hostnode: "http://82.180.163.49:8080/",
  Name: null,
  Enail: null,
  Mobile: null,
  pass1: null,
  id: null,
  Foods: null,
  mycart: null,
  mycartAll: null,
  Totalprice: false,
};

//reducer (change updaate state)
export const reducer = (state = mydata, action) => {
  if (action.type === "ADD_DATA") {
    return {
      ...state,
      Name: action.paylod.Name,
      Enail: action.paylod.Enail,
      Mobile: action.paylod.Mobile,
      pass1: action.paylod.pass1,
      id: action.paylod.id,
    };
  } else if (action.type === "ADD_Food_DATA") {
    return {
      ...state,
      Foods: action.paylod.Data,
    };
  } else if (action.type === "ADD_mycart_DATA") {
    return {
      ...state,
      mycart: action.paylod.mycart,
    };
  } else if (action.type === "ADD_mycartAll_DATA") {
    return {
      ...state,
      mycartAll: action.paylod.mycartAll,
    };
  } else if (action.type === "Settotalprice") {
    return {
      ...state,
      Totalprice: action.paylod.Totalprice,
    };
  }
  return state;
};
