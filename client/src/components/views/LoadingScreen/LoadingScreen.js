import logo from "../../../assets/loading-logo.gif";

function Loading() {
  return (
      <div style={{ width:"100%", height:"100%", display:"flex", justifyContent:"center" }}>
      <img src={logo} alt="loading-logo" />
    </div>
  );
}

export default Loading;
