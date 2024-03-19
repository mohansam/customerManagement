import { getPendingServices } from "../../services/ServiceService";
import ServicesComponent from "./ServicesComponent";

const PendingServicesComponent = () => {
  const serviceType = "pending";
  const serviceFetcher = getPendingServices;

  return (
    <ServicesComponent
      serviceType={serviceType}
      serviceFetcher={serviceFetcher}
    />
  );
};

export default PendingServicesComponent;
