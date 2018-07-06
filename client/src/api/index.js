import { isReg,isAuth,clientsList} from '../actions';
import store from '../store';
const {dispatch} = store;
export default {
   isReg (regData) {
        fetch("http://localhost:3000/api/reg", {
                method: 'POST',
                body: JSON.stringify(regData),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            .then(res => res.json())
            .then((data) => {
             dispatch(isReg(data.isReg))
            })
            .catch(er => console.error(er));
    },
    isAuth (authData) {
        fetch("http://localhost:3000/api/auth", {
                method: 'POST',
                body: JSON.stringify(authData),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
        .then(res => res.json())
        .then(data => {
       
            dispatch(isAuth(data.isAuth));
          return data.clientsList;
        })
        .then(data=> {
            if ( data )  dispatch(clientsList(data))
        })
        .catch(err => {
            console.error(err)
        }); 
    }
}