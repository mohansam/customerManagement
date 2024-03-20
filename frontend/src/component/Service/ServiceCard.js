const ServiceCard = ({ service }) => {
  return (
    <>
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
    </>
  );
};

export default ServiceCard;
