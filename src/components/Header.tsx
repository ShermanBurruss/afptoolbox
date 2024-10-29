import logo from '../assets/AFPToolBox-Logo.png';

export default function Header() {
  return (
    <div className = "navbar">
      <div className = "navdiv">
        <img className= "nav-logo" src={logo} alt="AFPToolBox Logo" />
        </div>
        <div className="navdivcenter">
          <h1 className="main-title">AFPToolBox</h1>
          <h3>Tools to keep your company in hand.</h3>
        </div>
        <div className="navdiv">
          <h1> Navigation </h1>
        </div>
    </div>
  );
}

