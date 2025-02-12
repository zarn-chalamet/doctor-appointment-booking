const DashboardCard = ({ icon, count, label }) => {
    return (
      <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
        <img src={icon} alt={label} className="w-10 h-10" />
        <div className="ml-4">
          <p className="text-xl font-bold">{count}</p>
          <p className="text-gray-600">{label}</p>
        </div>
      </div>
    );
};

export default DashboardCard;