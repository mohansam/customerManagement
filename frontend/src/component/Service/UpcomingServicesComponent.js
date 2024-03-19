import { getUpcomingServices } from "../../services/ServiceService";
import ServicesComponent from "./ServicesComponent";

const UpcomingServicesComponent = () => {
  const serviceType = "upcoming";
  const serviceFetcher = getUpcomingServices;

  return (
    <ServicesComponent
      serviceType={serviceType}
      serviceFetcher={serviceFetcher}
    />
  );
};

export default UpcomingServicesComponent;
