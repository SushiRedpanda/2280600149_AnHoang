namespace HoangAn_2280600149.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public Cart? Cart { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public string ProductName { get; set; } = "";
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; } = "";
    }
}
