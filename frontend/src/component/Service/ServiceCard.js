const ServiceCard = ({ service, handleMarkAsCompleted }) => {
  return (
    <div className="card-item">
      <p>
        ServiceDate:
        {new Date(service.serviceDate).toLocaleDateString()}
      </p>
      <p>ServiceType: {service.serviceType}</p>
      <p>IsServiceCompleted: {service.isServiceCompleted.toString()}</p>
      <p>PartsReplaced: {service.partsReplaced}</p>
      <p>AmountCharged: {service.amountCharged}</p>
      <p>CustomerRemarks: {service.customerRemarks}</p>
      <p>serviceEngineer: {service.serviceEngineer}</p>
      <button
        onClick={(event) => handleMarkAsCompleted(event, service.serviceId)}
      >
        Mark as Completed
      </button>
    </div>
  );
};

export default ServiceCard;
