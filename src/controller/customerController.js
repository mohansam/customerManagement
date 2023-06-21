const createNewCustomer = async (context) =>
    context.json({ statusMessage: 'hello from customer  customer route' }, 200);

module.exports = { createNewCustomer };
