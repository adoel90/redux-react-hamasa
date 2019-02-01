const logMiddleware = ({getState, dispatch}) => (next) => (action) => {
    console.log(`What happened : ${ action.type}`);

    next(action);
}

export default logMiddleware;