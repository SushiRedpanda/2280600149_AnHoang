using HoangAn_2280600149.Models;

namespace HoangAn_2280600149.Responsitories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProductsByCategoryAsync(int? categoryId);
        Task<Product> GetProductByIdAsync(int id);
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(int id);
        Task<bool> ProductExistsAsync(int id);
        Task<Product> GetProductWithCategoryByIdAsync(int id);
    }
}
