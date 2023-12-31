import { Provider } from 'react-redux';
import { useMemo, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import store from '../slices/index.js';
import FormSubmit from './FormSubmit.jsx';
import List from './List.jsx';
import { actions } from '../slices/dataSlice.js';
import ApiContext from './Context.jsx';

import Header from './Header.jsx';
import Second from './Second.jsx';
import Programm from './Programm.jsx';
import DressCode from './DressCode.jsx';
import Flowers from './Flowers.jsx';
import RedBtn from './RedBtn.jsx';
import Footer from './Footer.jsx';
import { FileX } from 'react-bootstrap-icons';

import rings from '../img/rings.png';

const App = () => {
  const isMobile = window.screen.width <= 768;

  const socket = io();
  const socketConnect = useCallback(
    (param, arg) => socket.emit(param, arg),
    [socket],
  );

  const socketApi = useMemo(
    () => ({
      addLike: (like) => socketConnect('addLike', like),
      removeLike: (like) => socketConnect('removeLike', like),
      addData: (data) => socketConnect('addData', data),
      removeData: (data) => socketConnect('removeData', data),
    }),
    [socketConnect],
  );

  socket.on('addLike', (data) => store.dispatch(actions.addLike(data)));
  socket.on('removeLike', (data) => store.dispatch(actions.removeLike(data)));
  socket.on('addData', (data) => store.dispatch(actions.addData(data)));
  socket.on('removeData', (data) => store.dispatch(actions.removeData(data)));

  return (
    <Provider store={store}>
      <ApiContext.Provider value={socketApi}>
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <main>
            <Second />
            <Programm />
            <DressCode />
            <Flowers />
            <Routes>
              <Route path="/" element={<FormSubmit isMobile={isMobile} />} />
              <Route path="/list" element={<List isMobile={isMobile} />} />
            </Routes>

            <RedBtn
              className="redBtn toTables"
              href="/portfolio/wedding/tables.html"
              img={rings}
              text="Перейти к&nbsp;рассадке гостей и&nbsp;выбрать место"
            />
          </main>
          <Footer />
        </BrowserRouter>
      </ApiContext.Provider>
    </Provider>
  );
};

export default App;
