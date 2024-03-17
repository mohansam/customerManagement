// ServiceList.js
const ServiceList = ({ productId }) => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      // Fetch services using productId
      const servicesList = await getServicesByProductId(productId);
      setServices(servicesList);
    };
    fetchServices();
  }, [productId]);

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>{/* Display service details */}</div>
      ))}
    </div>
  );
};
