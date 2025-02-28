
// import './KPIItem.module.css';


const KPIItem = ({ icon, count, label, color, imageBgColor }) => {
  return (
    <div className={`frame ${label.toLowerCase().replace(" ", "-")}`}>
      <div className="icon-container" style={{ backgroundColor: imageBgColor }}>
        <img src={icon} alt={label} />
      </div>
      <div className="frame-text">
        <span className="number" style={{ color }}>
          {count}
        </span>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default KPIItem;
