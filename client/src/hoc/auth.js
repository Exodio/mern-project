import React, { useEffect } from "react";

import { auth } from "../components/_actions/user_actions";

import { useSelector, useDispatch } from "react-redux";

function authHoc(ComposedClass, reload = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        if (await !response.payload.isAuth) {
          if (reload) {
            props.history.push("/login");
          }
        } else {
          if (reload === false) {
            props.history.push("/");
          }
        }
      });
    }, [dispatch, props.history]);

    return <ComposedClass {...props} user={user} />;
  }

  return AuthenticationCheck;
}

export default authHoc;
