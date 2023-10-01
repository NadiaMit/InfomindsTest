namespace Backend.Features.Customers;

public class CustomersListQuery : IRequest<List<CustomersListQueryResponse>>
{
    public string? Name { get; set; }
    public string? Email { get; set; }
}

public class CustomersListQueryResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Address { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Iban { get; set; } = "";
    public CustomerListQueryResponseCategory? Category { get; set; }
}

public class CustomerListQueryResponseCategory
{
    public string Code { get; set; } = "";
    public string Description { get; set; } = "";
}

internal class CustomersListQueryHandler : IRequestHandler<CustomersListQuery, List<CustomersListQueryResponse>>
{
    private readonly BackendContext context;

    public CustomersListQueryHandler(BackendContext context)
    {
        this.context = context;
    }

    public async Task<List<CustomersListQueryResponse>> Handle(CustomersListQuery request, CancellationToken cancellationToken)
    {
        var query = context.Customers.AsQueryable();
        if (!string.IsNullOrEmpty(request.Name))
            query = query.Where(q => q.Name.ToLower().Contains(request.Name.ToLower()));
        if (!string.IsNullOrEmpty(request.Email))
            query = query.Where(q => q.Email.ToLower().Contains(request.Email.ToLower()));

        var customerQueryResult = await query.OrderBy(q => q.Email).ThenBy(q => q.Name).ToListAsync(cancellationToken);


        var customerList = new List<CustomersListQueryResponse>();

        foreach (var customer in customerQueryResult)
        {
            var customerCategory = await context.CustomerCategories
                    .Where(q => q.Id == customer.CustomerCategoryId)
                    .Select(q => new CustomerListQueryResponseCategory { Code = q.Code, Description = q.Description })
                    .SingleOrDefaultAsync(cancellationToken);

            customerList.Add(new CustomersListQueryResponse
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address,
                Email = customer.Email,
                Phone = customer.Phone,
                Iban = customer.Iban,
                Category = customerCategory
            });
        }

        return customerList;
    }
}