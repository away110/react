var initialState = {
    userInfo:{token:''},
    keyPath:[],
}

export default function reducer(state = initialState,action:any){
    //深拷贝
    var newstate = JSON.parse( JSON.stringify( state ) );

    //判断action的类型
    if( action.type == 'SAVE_USERINFO' ){
        newstate.userInfo = action.payload;
    }else if( action.type == 'REMOVE_USERINFO' ){
        newstate.userInfo = {token:''};
    }else if( action.type == 'SAVE_KEYPATH' ){
        newstate.keyPath = action.payload;
    }else{
        return state;
    }

    //返回一个全新的state
    return newstate;
}