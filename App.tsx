import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Main from "./Main";

export default function App() {

  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>

  )

};