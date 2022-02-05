import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import './App.css';
import './assets/css/fonts.css';
function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
