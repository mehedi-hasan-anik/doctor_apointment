const defaultState: any = {
  text: "initial",
  foo: {
    bar: "zoo",
    nested: {
      veryDeep: true,
    },
  },
};

export default function (state = defaultState, action: any = {}) {
  switch (action.type) {
    case "UPLOAD":
      return {
        ...state,
        upload_data: action,
      };
    case "DATE":
      return {
        ...state,
        date_data: action,
      };

    default:
      return state;
  }
}
