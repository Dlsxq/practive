import React, { useEffect, useState } from 'react';
import { globalHistory } from "../store/routeHistory"
import { isGlobalUserLogin } from '../utils';

export default function Login(props: any) {
  const [formState, setFormState] = useState<Record<string, string>>({ userName: "", password: "" });

  useEffect(() => {
    if (isGlobalUserLogin()) {
      globalHistory.goBack()
    }
  }, [])

  const handeFormFinish = (evl: any) => {
    evl.preventDefault()
    if (formState.userName === "") {
      return
    }
    sessionStorage.setItem("user", JSON.stringify(formState))
    globalHistory.goBack()
  }
  const onChange = (val: string, key: string) => {
    setFormState((olv) => ({ ...olv, [key]: val }))
  }

  return (
    <form onSubmit={handeFormFinish}>
      <fieldset>
        <legend>用户名</legend>
        <label htmlFor="userName">
          <input
            id="userName"
            value={formState.userName}
            onChange={(e) => onChange(e.target.value, "userName")
            }
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>密码</legend>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            value={formState.password}
            onChange={(e) =>
              onChange(e.target.value, "password")
            }
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>提叫</legend>
        <button type="submit">
          提叫
        </button>
      </fieldset>
    </form>
  );
}
